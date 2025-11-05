# Analytics & Tracking Setup Guide

## 🎯 Quick Setup (30 Minuten)

### 1. Google Analytics 4 (GA4) Setup

**Schritt 1: Account erstellen**
1. Gehe zu [analytics.google.com](https://analytics.google.com)
2. Klicke "Start measuring"
3. Account Name: "AI-TechArt"
4. Property Name: "AI-TechArt Website"
5. Zeitzone: Europe/Zurich
6. Währung: CHF

**Schritt 2: Tracking-Code erhalten**
1. Nach Setup → "Data Streams" → "Web"
2. URL: https://ai-techart.com
3. Kopiere die **Measurement ID** (Format: G-XXXXXXXXXX)

**Schritt 3: Code einfügen**

Füge diesen Code im `<head>` **VOR** dem `</head>`-Tag in ALLEN HTML-Dateien ein:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**WICHTIG:** Ersetze `G-XXXXXXXXXX` mit deiner echten Measurement ID!

**Dateien zum Updaten:**
- index.html
- services.html
- about-expertise.html
- case-studies.html
- faq.html
- intake-form.html
- free-starter-pack.html

---

### 2. Microsoft Clarity (EMPFOHLEN - Kostenlose Heatmaps!)

**Vorteile:**
- ✅ 100% kostenlos, unbegrenzt
- ✅ Heatmaps (zeigt, wo User klicken)
- ✅ Session Recordings (siehst User-Verhalten)
- ✅ Keine Cookie-Consent erforderlich (DSGVO-konform)

**Schritt 1: Account erstellen**
1. Gehe zu [clarity.microsoft.com](https://clarity.microsoft.com)
2. Sign up mit Microsoft-Account
3. "Add new project"
4. Name: "AI-TechArt"
5. Website: https://ai-techart.com

**Schritt 2: Tracking-Code**

Nach Setup erhältst du einen Code wie diesen:

```html
<!-- Microsoft Clarity -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "XXXXXXXXXX");
</script>
```

**Füge diesen Code** im `<head>` **VOR** dem `</head>`-Tag ein (in allen HTML-Dateien).

---

### 3. Conversion-Tracking einrichten (GA4)

Nach GA4-Installation:

**Wichtige Events tracken:**

1. **Intake Form Submission**
```html
<!-- In intake-form.html, im Form onsubmit: -->
<form onsubmit="gtag('event', 'intake_form_submit', {
  'event_category': 'engagement',
  'event_label': 'Intake Form',
  'value': 1
});">
```

2. **Free Pack Download**
```html
<!-- In free-starter-pack.html, im Form onsubmit: -->
<form onsubmit="gtag('event', 'free_pack_download', {
  'event_category': 'lead',
  'event_label': 'Free Starter Pack',
  'value': 1
});">
```

3. **CTA Clicks tracken**
```html
<!-- Beispiel für CTA-Button: -->
<a href="intake-form.html"
   onclick="gtag('event', 'cta_click', {
     'event_category': 'engagement',
     'event_label': 'Hero CTA - Angebot anfragen'
   });"
   class="btn-primary-cta">
  Kostenloses Angebot anfragen
</a>
```

---

### 4. Conversion-Goals definieren (in GA4)

Nach 1-2 Wochen Daten:

1. In GA4 → "Configure" → "Events"
2. Markiere wichtige Events als "Conversions":
   - `intake_form_submit` ✓
   - `free_pack_download` ✓
   - `cta_click` (Hero) ✓

---

## 📊 KPIs zum Tracken

### Woche 1-4 (Baseline)
Sammle Daten ohne Änderungen:
- Sessions gesamt
- Bounce Rate
- Avg. Session Duration
- Top Pages
- Traffic-Quellen

### Ab Woche 5 (Optimierung)
Teste & verbessere basierend auf Daten:
- Welche CTAs werden am meisten geklickt?
- Wo verlassen User die Seite? (Exit Pages)
- Welche Traffic-Quellen konvertieren am besten?

---

## ⚠️ DSGVO / Datenschutz (Schweiz)

**Wichtig für Schweizer Website:**

1. **Cookie Banner** (falls GA4 Cookies nutzt):
   - Empfohlen: [Klaro!](https://klaro.kiprotect.com/) (kostenlos, open-source)
   - Alternative: [Cookiebot](https://www.cookiebot.com/) (kostenpflichtig)

2. **Datenschutzerklärung updaten:**
   - Erwähne Google Analytics 4
   - Erwähne Microsoft Clarity (falls genutzt)
   - Link zur Datenschutzerklärung im Footer

3. **IP-Anonymisierung:**
   GA4 anonymisiert IPs automatisch (EU-konform).

---

## ✅ Checkliste

Nach Setup:

- [ ] GA4 Tracking-Code in allen 7 HTML-Dateien
- [ ] Microsoft Clarity Code in allen 7 HTML-Dateien (optional)
- [ ] Conversion-Events getestet (Test-Submission)
- [ ] GA4 Dashboard: Daten kommen rein (nach 24h prüfen)
- [ ] Cookie-Banner implementiert (falls erforderlich)
- [ ] Datenschutzerklärung aktualisiert

---

## 🎯 Erwartete Resultate (nach 30 Tagen)

Mit gutem Setup kannst du sehen:

- **Traffic-Quellen:** Woher kommen Besucher? (Google, LinkedIn, Direkt, etc.)
- **Top-Seiten:** Welche Seiten performen am besten?
- **Conversion-Rate:** Wieviele Besucher → Leads (Intake Form)?
- **Heatmaps (Clarity):** Wo klicken User? Was wird ignoriert?
- **User-Flow:** Welchen Weg nehmen User durch die Seite?

→ Basierend darauf: Optimierungen vornehmen!

---

## 🚀 Optional: Exit-Intent Popup

**Wenn du mehr Leads willst**, teste Exit-Intent Popup:

```html
<!-- Am Ende von </body> einfügen -->
<script src="https://cdn.jsdelivr.net/npm/ouibounce@0.0.15/build/ouibounce.min.js"></script>
<script>
  ouibounce(document.getElementById('exit-popup'), {
    aggressive: true,
    timer: 0,
    cookieExpire: 7,
    callback: function() {
      document.getElementById('exit-popup').style.display = 'block';
    }
  });
</script>

<!-- Popup HTML (versteckt, zeigt bei Exit-Intent) -->
<div id="exit-popup" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999;">
  <div style="position:relative; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:3rem; border-radius:12px; max-width:500px;">
    <button onclick="document.getElementById('exit-popup').style.display='none'" style="position:absolute; top:10px; right:10px;">&times;</button>
    <h2>Warten Sie! 🎁</h2>
    <p>Erhalten Sie 20 Premium AI-Bilder GRATIS + 10% Rabatt auf Ihr erstes Projekt</p>
    <input type="email" placeholder="E-Mail eingeben" style="width:100%; padding:1rem; margin:1rem 0;">
    <button onclick="gtag('event', 'exit_intent_signup'); alert('Danke! Link folgt per E-Mail.');" style="width:100%; padding:1rem; background:#667eea; color:white; border:none; border-radius:8px;">Jetzt sichern</button>
  </div>
</div>
```

**Achtung:** Kann nervig wirken → teste A/B!

---

Viel Erfolg! 🚀
