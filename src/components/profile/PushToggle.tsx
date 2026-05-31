"use client";

import { usePushNotifications } from "@/hooks/usePushNotifications";
import { Bell, BellOff, Loader2 } from "lucide-react";

export function PushToggle() {
  const { supported, subscribed, loading, subscribe, unsubscribe } = usePushNotifications();

  if (!supported) return null;

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
      <h2 className="font-semibold mb-1">Push-Benachrichtigungen</h2>
      <p className="text-sm text-stone-500 mb-4">
        Erhalte sofortige Benachrichtigungen bei neuen Nachrichten und Bestellungen.
      </p>
      <button
        onClick={subscribed ? unsubscribe : subscribe}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition disabled:opacity-60 ${
          subscribed
            ? "bg-red-50 text-red-600 hover:bg-red-100"
            : "bg-forest-700 text-white hover:bg-forest-600"
        }`}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : subscribed ? (
          <BellOff size={16} />
        ) : (
          <Bell size={16} />
        )}
        {subscribed ? "Benachrichtigungen deaktivieren" : "Benachrichtigungen aktivieren"}
      </button>
    </div>
  );
}
