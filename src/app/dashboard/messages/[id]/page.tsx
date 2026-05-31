import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { MessageThread } from "@/components/listings/MessageThread";

export default async function MessageThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: inquiry } = await supabase
    .from("inquiries")
    .select(`
      id, message, created_at, buyer_id,
      listing:listings(id, title, seller_id),
      buyer:profiles!inquiries_buyer_id_fkey(id, full_name),
      messages(id, content, sender_id, created_at, read_at,
        sender:profiles!messages_sender_id_fkey(full_name, avatar_url))
    `)
    .eq("id", id)
    .single();

  if (!inquiry) notFound();

  // Mark unread messages as read
  await supabase
    .from("messages")
    .update({ read_at: new Date().toISOString() })
    .eq("inquiry_id", id)
    .neq("sender_id", user.id)
    .is("read_at", null);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-lg font-bold mb-1">
        {(inquiry.listing as any)?.title ?? "Nachricht"}
      </h1>
      <p className="text-sm text-stone-400 mb-6">
        Anfrage von {(inquiry.buyer as any)?.full_name}
      </p>
      <MessageThread
        inquiryId={id}
        initialMessage={inquiry.message}
        messages={(inquiry.messages ?? []) as any[]}
        currentUserId={user.id}
      />
    </div>
  );
}
