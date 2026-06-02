import { redirect } from "next/navigation";
import { ErfolgInhalt } from "@/components/shop/ErfolgInhalt";

export default async function BestellungErfolgPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) redirect("/");

  return <ErfolgInhalt />;
}
