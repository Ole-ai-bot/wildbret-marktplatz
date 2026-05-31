import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { MessageCircle } from "lucide-react";

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // Alle Inquiries, an denen der User beteiligt ist
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select(`
      id, message, created_at,
      listing:listings(id, title, images),
      buyer:profiles!inquiries_buyer_id_fkey(id, full_name),
      messages(id, content, sender_id, created_at, read_at)
    `)
    .or(`buyer_id.eq.${user.id}`)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Nachrichten</h1>

      {!inquiries?.length ? (
        <div className="text-center py-16 text-stone-400">
          <MessageCircle size={40} className="mx-auto mb-3 opacity-30" />
          <p>Noch keine Nachrichten.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {inquiries.map((inq: any) => {
            const messages = inq.messages ?? [];
            const last = messages[messages.length - 1];
            const unread = messages.filter((m: any) => !m.read_at && m.sender_id !== user.id).length;
            return (
              <Link
                key={inq.id}
                href={`/dashboard/messages/${inq.id}`}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 flex gap-4 hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center text-forest-600 flex-shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium truncate">{inq.listing?.title ?? "—"}</p>
                    {last && (
                      <p className="text-xs text-stone-400 flex-shrink-0">
                        {format(new Date(last.created_at), "dd.MM.", { locale: de })}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 truncate mt-0.5">
                    {last?.content ?? inq.message}
                  </p>
                </div>
                {unread > 0 && (
                  <span className="bg-forest-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {unread}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
