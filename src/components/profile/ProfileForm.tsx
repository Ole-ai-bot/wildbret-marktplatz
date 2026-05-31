"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Camera, Loader2, Save } from "lucide-react";
import type { Profile } from "@/types";

export function ProfileForm({ profile }: { profile: Profile }) {
  const [form, setForm] = useState({
    full_name: profile.full_name ?? "",
    phone: profile.phone ?? "",
    region: profile.region ?? "",
    bio: profile.bio ?? "",
    is_jaeger: profile.is_jaeger ?? false,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(profile.avatar_url ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const onDrop = useCallback((files: File[]) => {
    if (!files[0]) return;
    setAvatarFile(files[0]);
    setAvatarPreview(URL.createObjectURL(files[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop, accept: { "image/*": [] }, maxFiles: 1,
  });

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    let avatar_url = profile.avatar_url;

    if (avatarFile) {
      const ext = avatarFile.name.split(".").pop();
      const path = `avatars/${user.id}.${ext}`;
      await supabase.storage.from("listing-images").upload(path, avatarFile, {
        upsert: true, cacheControl: "3600",
      });
      const { data } = supabase.storage.from("listing-images").getPublicUrl(path);
      avatar_url = data.publicUrl;
    }

    await supabase.from("profiles").update({ ...form, avatar_url }).eq("id", user.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <form onSubmit={handleSave} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 flex flex-col gap-5">
      <h2 className="font-semibold">Profildaten</h2>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div {...getRootProps()} className="relative cursor-pointer group">
          <input {...getInputProps()} />
          <div className="w-20 h-20 rounded-full overflow-hidden bg-forest-100 flex items-center justify-center">
            {avatarPreview ? (
              <Image src={avatarPreview} alt="" width={80} height={80} className="object-cover w-full h-full" />
            ) : (
              <span className="text-forest-700 text-3xl font-bold">{form.full_name[0]}</span>
            )}
          </div>
          <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <Camera size={20} className="text-white" />
          </div>
        </div>
        <div className="text-sm text-stone-500">
          <p className="font-medium text-stone-700">Profilbild</p>
          <p>Klicken oder Bild ablegen</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Name *">
          <input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            className={inputCls} />
        </Field>
        <Field label="Telefon">
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+49 ..." className={inputCls} />
        </Field>
        <Field label="Region">
          <input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}
            placeholder="z.B. Bayern" className={inputCls} />
        </Field>
      </div>

      <Field label="Über mich">
        <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
          rows={3} placeholder="Kurze Vorstellung, Revier, Jagderfahrung..."
          className={`${inputCls} resize-none`} />
      </Field>

      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input type="checkbox" checked={form.is_jaeger}
          onChange={(e) => setForm({ ...form, is_jaeger: e.target.checked })} className="rounded" />
        Ich bin Jäger (kann Inserate erstellen)
      </label>

      <button type="submit" disabled={saving}
        className="bg-forest-700 hover:bg-forest-600 text-white font-medium py-2.5 rounded-xl flex items-center gap-2 justify-center transition disabled:opacity-60">
        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
        {saved ? "Gespeichert ✓" : saving ? "Speichern..." : "Änderungen speichern"}
      </button>
    </form>
  );
}

const inputCls = "w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-stone-600">{label}</label>
      {children}
    </div>
  );
}
