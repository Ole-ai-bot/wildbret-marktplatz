"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Notification } from "@/types";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

export function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => setNotifications((data as Notification[]) ?? []));

    const channel = supabase
      .channel("notifications:" + userId)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${userId}` },
        (payload) => setNotifications((prev) => [payload.new as Notification, ...prev])
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  async function markAllRead() {
    const supabase = createClient();
    await supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("user_id", userId)
      .is("read_at", null);
    setNotifications((prev) => prev.map((n) => ({ ...n, read_at: n.read_at ?? new Date().toISOString() })));
  }

  return (
    <div className="relative">
      <button
        onClick={() => { setOpen(!open); if (!open && unreadCount > 0) markAllRead(); }}
        className="relative p-1.5 hover:bg-forest-700 rounded-lg transition"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-80 bg-white text-stone-900 rounded-2xl shadow-xl border border-stone-100 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-stone-100 font-semibold text-sm">
            Benachrichtigungen
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-stone-400 text-sm text-center py-8">Keine Benachrichtigungen</p>
            ) : (
              notifications.map((n) => (
                <Link
                  key={n.id}
                  href={n.link ?? "/dashboard"}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 hover:bg-stone-50 transition border-b border-stone-50 ${!n.read_at ? "bg-forest-50" : ""}`}
                >
                  <p className="text-sm font-medium">{n.title}</p>
                  {n.body && <p className="text-xs text-stone-500 mt-0.5">{n.body}</p>}
                  <p className="text-xs text-stone-400 mt-1">
                    {formatDistanceToNow(new Date(n.created_at), { addSuffix: true, locale: de })}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
