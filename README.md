# Wildbret Marktplatz

Ein Marktplatz für Wildbret — gebaut mit Next.js, Supabase und Stripe.

## Features

- Inserate erstellen, bearbeiten und durchsuchen
- Nachrichten zwischen Käufern und Verkäufern
- Bewertungssystem für Verkäufer
- Favoriten speichern
- Bezahlung via Stripe
- Push-Benachrichtigungen

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Datenbank:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **Styling:** Tailwind CSS

## Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## Umgebungsvariablen

Kopiere `.env.local.example` nach `.env.local` und fülle die Werte aus:

```bash
cp .env.local.example .env.local
```
