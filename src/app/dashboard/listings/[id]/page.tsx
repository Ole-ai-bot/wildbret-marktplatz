import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { EditListingForm } from "@/components/listings/EditListingForm";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .eq("seller_id", user.id)
    .single();

  if (!listing) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Inserat bearbeiten</h1>
      <EditListingForm listing={listing} />
    </div>
  );
}
