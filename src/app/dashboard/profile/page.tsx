import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { StripeConnect } from "@/components/profile/StripeConnect";
import { PushToggle } from "@/components/profile/PushToggle";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Mein Profil</h1>
      <div className="flex flex-col gap-6">
        <ProfileForm profile={profile} />
        {profile?.is_jaeger && <StripeConnect />}
        <PushToggle />
      </div>
    </div>
  );
}
