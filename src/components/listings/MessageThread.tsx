"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Send } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  sender?: { full_name: string; avatar_url?: string };
}

export function MessageThread({
  inquiryId,
  initialMessage,
  messages: initialMessages,
  currentUserId,
}: {
  inquiryId: string;
  initialMessage: string;
  messages: Message[];
  currentUserId: string;
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Realtime subscription
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`messages:${inquiryId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `inquiry_id=eq.${inquiryId}` },
        async (payload) => {
          const { data } = await supabase
            .from("messages")
            .select("*, sender:profiles!messages_sender_id_fkey(full_name, avatar_url)")
            .eq("id", payload.new.id)
            .single();
          if (data) setMessages((prev) => [...prev, data as Message]);
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [inquiryId]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setSending(true);
    const supabase = createClient();
    await supabase.from("messages").insert({
      inquiry_id: inquiryId,
      sender_id: currentUserId,
      content: content.trim(),
    });
    setContent("");
    setSending(false);
  }

  return (
    <div className="flex flex-col">
      {/* Initial inquiry */}
      <div className="bg-stone-50 rounded-xl p-4 mb-4 text-sm text-stone-600 border border-stone-200">
        <p className="text-xs text-stone-400 mb-1">Erste Anfrage</p>
        <p>{initialMessage}</p>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 min-h-[200px] max-h-[60vh] overflow-y-auto mb-4 pr-1">
        {messages.map((m) => {
          const isMe = m.sender_id === currentUserId;
          return (
            <div key={m.id} className={cn("flex gap-2", isMe && "flex-row-reverse")}>
              <div className="w-8 h-8 rounded-full bg-forest-200 flex-shrink-0 flex items-center justify-center text-forest-700 text-sm font-bold">
                {m.sender?.full_name?.[0] ?? "?"}
              </div>
              <div className={cn("max-w-[75%]", isMe && "items-end flex flex-col")}>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm",
                    isMe
                      ? "bg-forest-700 text-white rounded-tr-sm"
                      : "bg-white border border-stone-200 text-stone-800 rounded-tl-sm"
                  )}
                >
                  {m.content}
                </div>
                <p className="text-xs text-stone-400 mt-0.5 px-1">
                  {format(new Date(m.created_at), "HH:mm", { locale: de })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nachricht schreiben..."
          className="flex-1 border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
        />
        <button
          type="submit"
          disabled={sending || !content.trim()}
          className="bg-forest-700 hover:bg-forest-600 text-white p-2.5 rounded-xl transition disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
