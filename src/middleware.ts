import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────
//  WARTUNGS- / TEASER-MODUS
//
//  Solange SITE_LIVE != "true" zeigt die Seite die Teaser-Landingpage.
//
//  VOLLE WEBSITE ONLINE NEHMEN (in Vercel):
//    1. Settings → Environment Variables → SITE_LIVE = true (Production)
//    2. Deployments → "Redeploy"
//  ZURÜCK ZUM TEASER:
//    SITE_LIVE löschen oder auf false → Redeploy
// ─────────────────────────────────────────────────────────────

const TEASER_HTML = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex,nofollow" />
<title>Revierküche — Vom Revier auf den Tisch | Heidelberg</title>
<meta name="description" content="Revierküche Heidelberg — Wildmanufaktur, Feinkostladen, Weinbar und Kochschule. Eröffnung in Kürze." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  :root{--ink:#0c0a09;--paper:#fafaf9;--muted:#a8a29e;--dim:#78716c;--faint:#57534e;--forest:#4a6632;--forest-light:#7d9c5e;--line:#292524}
  html{scroll-behavior:smooth}
  body{background:var(--ink);color:var(--paper);font-family:Inter,system-ui,sans-serif;font-weight:300;line-height:1.6;-webkit-font-smoothing:antialiased}
  .serif{font-family:'Playfair Display',Georgia,serif}
  .eyebrow{font-size:12px;letter-spacing:.25em;text-transform:uppercase;color:var(--faint)}
  .wrap{max-width:1100px;margin:0 auto;padding:0 24px}
  .rule{width:48px;height:1px;background:var(--forest)}

  /* HERO */
  .hero{position:relative;min-height:100vh;display:flex;align-items:flex-end;overflow:hidden}
  .hero-bg{position:absolute;inset:0;background:url('/images/raum-1.jpg') center/cover;opacity:.32}
  .hero-grad{position:absolute;inset:0;background:linear-gradient(to top,var(--ink) 8%,rgba(12,10,9,.5) 50%,rgba(12,10,9,.3))}
  .hero-inner{position:relative;width:100%;padding-bottom:80px;padding-top:140px}
  .hero h1{font-size:clamp(56px,13vw,128px);font-weight:700;line-height:.95;margin:24px 0 20px}
  .tagline{font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(18px,3vw,26px);color:var(--muted)}
  .lead{max-width:30rem;color:var(--dim);margin-top:28px;font-size:16px}
  .badge{display:inline-block;margin-top:36px;border:1px solid var(--line);color:var(--muted);font-size:12px;letter-spacing:.18em;text-transform:uppercase;padding:10px 18px}

  /* PILLARS */
  section.pillars{border-top:1px solid var(--line)}
  .pillar-grid{display:grid;grid-template-columns:repeat(4,1fr)}
  .pillar{padding:48px 28px;border-right:1px solid var(--line);min-height:230px;display:flex;flex-direction:column;justify-content:space-between}
  .pillar:last-child{border-right:none}
  .pillar .n{font-family:'Playfair Display',serif;font-size:14px;color:var(--forest-light)}
  .pillar h3{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;margin-bottom:10px}
  .pillar p{font-size:13.5px;color:var(--dim)}
  @media(max-width:820px){.pillar-grid{grid-template-columns:1fr 1fr}.pillar:nth-child(2){border-right:none}.pillar{border-bottom:1px solid var(--line)}}
  @media(max-width:520px){.pillar-grid{grid-template-columns:1fr}.pillar{border-right:none}}

  /* PHILOSOPHIE */
  .philo{padding:110px 0;background:#fafaf9;color:#1c1917}
  .philo .eyebrow{color:#a8a29e}
  .philo h2{font-family:'Playfair Display',serif;font-size:clamp(30px,5vw,46px);font-weight:700;line-height:1.1;margin:18px 0 24px}
  .philo .rule{background:var(--forest);margin-bottom:26px}
  .philo p{max-width:42rem;color:#57534e;font-size:16px}
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#e7e5e4;margin-top:64px;border:1px solid #e7e5e4}
  .stat{background:#fafaf9;padding:32px 24px}
  .stat .big{font-family:'Playfair Display',serif;font-size:34px;font-weight:700;color:var(--forest)}
  .stat .cap{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#a8a29e;margin-top:4px}
  @media(max-width:680px){.stats{grid-template-columns:1fr 1fr}}

  /* GALLERY */
  .gallery{padding:0}
  .gal-head{padding:90px 0 40px}
  .gal-head h2{font-family:'Playfair Display',serif;font-size:clamp(30px,5vw,46px);font-weight:700;margin-top:16px}
  .gal-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line)}
  .gal-item{position:relative;aspect-ratio:3/4;overflow:hidden;background:#1c1917}
  .gal-item img{width:100%;height:100%;object-fit:cover;transition:transform .7s}
  .gal-item:hover img{transform:scale(1.06)}
  .gal-cap{position:absolute;left:0;right:0;bottom:0;padding:18px 16px;background:linear-gradient(to top,rgba(12,10,9,.85),transparent);font-size:12px;letter-spacing:.14em;text-transform:uppercase}
  @media(max-width:820px){.gal-grid{grid-template-columns:1fr 1fr}}

  /* NETWORK */
  .net{padding:100px 0;border-top:1px solid var(--line)}
  .net h2{font-family:'Playfair Display',serif;font-size:clamp(28px,4.5vw,42px);font-weight:700;margin-top:16px;margin-bottom:32px}
  .chips{display:flex;flex-wrap:wrap;gap:10px;max-width:56rem}
  .chip{border:1px solid var(--line);color:var(--muted);font-size:13px;padding:9px 16px}

  /* CHAMPAGNE */
  .champ{display:grid;grid-template-columns:1.1fr 1fr;border-top:1px solid var(--line)}
  .champ-text{padding:90px 48px}
  .champ-text .eyebrow{color:#a67a20}
  .champ-text h2{font-family:'Playfair Display',serif;font-size:34px;font-weight:700;margin:16px 0}
  .champ-text h2 span{color:#dbb54f}
  .champ-text p{color:var(--dim);max-width:26rem;font-size:15px}
  .champ-img{background:url('/images/champagner-glas.jpg') center/cover;min-height:340px}
  @media(max-width:760px){.champ{grid-template-columns:1fr}.champ-text{padding:64px 24px}}

  /* FOOTER */
  footer{border-top:1px solid var(--line);padding:70px 0 50px;text-align:center}
  footer .serif{font-size:28px;font-weight:700;margin-bottom:14px}
  footer .loc{color:var(--dim);font-size:14px}
  footer .social{margin-top:26px}
  footer .social a{color:var(--muted);text-decoration:none;font-size:12px;letter-spacing:.18em;text-transform:uppercase;border:1px solid var(--line);padding:10px 20px;transition:.2s;display:inline-block}
  footer .social a:hover{color:#fff;border-color:var(--faint)}
  footer .copy{margin-top:44px;color:var(--faint);font-size:12px}
</style>
</head>
<body>

  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-grad"></div>
    <div class="wrap hero-inner">
      <p class="eyebrow">Heidelberg-Rohrbach &middot; Eröffnung in Kürze</p>
      <h1 class="serif">Revierküche</h1>
      <p class="tagline">Wildmanufaktur &middot; Feinkostladen &middot; Weinbar &middot; Kochschule</p>
      <p class="lead">Vom Revier auf den Tisch. Handwerklich veredeltes Wildbret und erlesene regionale Feinkost — transparent, nachhaltig und direkt von der Quelle.</p>
      <span class="badge">Wir öffnen bald unsere Türen</span>
    </div>
  </section>

  <section class="pillars">
    <div class="pillar-grid">
      <div class="pillar">
        <div class="n">01</div>
        <div><h3 class="serif">Manufaktur</h3><p>Wildbret von heimischen Jägern, handwerklich veredelt — Rillette, Wurst, Jus und mehr.</p></div>
      </div>
      <div class="pillar">
        <div class="n">02</div>
        <div><h3 class="serif">Feinkostladen</h3><p>Trüffel, Ziegenkäse, Forellen, Öle und Sauerteigbrot von handverlesenen Erzeugern.</p></div>
      </div>
      <div class="pillar">
        <div class="n">03</div>
        <div><h3 class="serif">Weinbar</h3><p>Verkostung, Revierabende und kuratierte Weine — der gesellige Kern der Revierküche.</p></div>
      </div>
      <div class="pillar">
        <div class="n">04</div>
        <div><h3 class="serif">Kochschule</h3><p>Wild von der Zerlegung bis zum Gericht — Kurse und Events im Manufaktur-Ambiente.</p></div>
      </div>
    </div>
  </section>

  <section class="philo">
    <div class="wrap">
      <p class="eyebrow">Unsere Haltung</p>
      <h2>Regional. Handwerklich.<br/>Transparent.</h2>
      <div class="rule"></div>
      <p>Die Revierküche versteht sich als kuratorischer Feinkost-Knotenpunkt der Region Heidelberg und Odenwald. Jedes Produkt steht für eine klare Haltung: persönlich bekannt, handwerklich erzeugt, keine anonymen Lieferketten.</p>
      <div class="stats">
        <div class="stat"><div class="big serif">100&nbsp;km</div><div class="cap">Einzugsgebiet Wild</div></div>
        <div class="stat"><div class="big serif">15+</div><div class="cap">Regionale Erzeuger</div></div>
        <div class="stat"><div class="big serif">0</div><div class="cap">Anonyme Lieferketten</div></div>
        <div class="stat"><div class="big serif">100%</div><div class="cap">Nose to Tail</div></div>
      </div>
    </div>
  </section>

  <section class="gallery">
    <div class="wrap gal-head">
      <p class="eyebrow">Ein Vorgeschmack</p>
      <h2 class="serif">Aus der Manufaktur</h2>
    </div>
    <div class="gal-grid">
      <div class="gal-item"><img src="/images/produkte/wildrillette.png" alt="Wildrillette" loading="lazy"/><div class="gal-cap">Wildrillette</div></div>
      <div class="gal-item"><img src="/images/hirsch.jpg" alt="Hirsch" loading="lazy"/><div class="gal-cap">Hirsch</div></div>
      <div class="gal-item"><img src="/images/produkte/quittengelee.png" alt="Quittengelee" loading="lazy"/><div class="gal-cap">Quittengelee</div></div>
      <div class="gal-item"><img src="/images/forelle.jpg" alt="Forelle" loading="lazy"/><div class="gal-cap">Forelle</div></div>
    </div>
  </section>

  <section class="net">
    <div class="wrap">
      <p class="eyebrow">Handverlesen</p>
      <h2 class="serif">Unsere Erzeuger</h2>
      <div class="chips">
        <span class="chip">Nußlocher Ziegenkäsehof</span>
        <span class="chip">Forellenhof Lenz</span>
        <span class="chip">Odenwälder Trüffel</span>
        <span class="chip">Rheinfischer Kuhn</span>
        <span class="chip">Südseite Bakery</span>
        <span class="chip">Privatrösterei Bonafede</span>
        <span class="chip">THEO Essigmanufaktur</span>
        <span class="chip">Wasgau Ölmühle</span>
        <span class="chip">Inge &amp; der Honigbär</span>
        <span class="chip">Obstbau Pfisterer</span>
        <span class="chip">Butterbrudis</span>
        <span class="chip">&amp; viele mehr</span>
      </div>
    </div>
  </section>

  <section class="champ">
    <div class="champ-text">
      <p class="eyebrow">Exklusiv im Sortiment</p>
      <h2 class="serif">Champagne <span>LUTUN</span></h2>
      <p>Fünf handverlesene Cuvées aus Courtagnon, Champagne — ein besonderer Begleiter zur Wildküche. Bald auch in der Revierküche.</p>
    </div>
    <div class="champ-img"></div>
  </section>

  <footer>
    <div class="wrap">
      <p class="serif">Revierküche</p>
      <p class="loc">Rathausstraße 75 &middot; 69126 Heidelberg-Rohrbach</p>
      <div class="social">
        <a href="https://instagram.com/revierk%C3%BCche" target="_blank" rel="noopener">Instagram &middot; @revierküche</a>
      </div>
      <p class="copy">© 2026 Revierküche &middot; Website in Vorbereitung</p>
    </div>
  </footer>

</body>
</html>`;

export function middleware(req: NextRequest) {
  // Live-Betrieb: alles normal durchlassen
  if (process.env.SITE_LIVE === "true") {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;

  // Statische Dateien (Bilder, Icons, manifest …) durchlassen — am Punkt erkennbar
  if (pathname.includes(".")) {
    return NextResponse.next();
  }

  // API im Teaser-Modus stilllegen
  if (pathname.startsWith("/api")) {
    return new NextResponse(
      JSON.stringify({ error: "Service vorübergehend nicht verfügbar" }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // Teaser-Landingpage ausliefern (HTTP 200, da bewusst sichtbarer Inhalt)
  return new NextResponse(TEASER_HTML, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
