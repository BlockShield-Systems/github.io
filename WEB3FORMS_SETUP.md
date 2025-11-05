# Web3Forms Setup Guide - Formulare aktivieren

## Überblick

Beide Formulare (Intake Form und Free Starter Pack) sind mit **Web3Forms** integriert - einem kostenlosen Service, der Formularanfragen direkt an Ihre E-Mail sendet.

**Aktueller Status:** ⚠️ Formulare sind bereit, benötigen aber Ihren Access Key

---

## Setup in 5 Minuten

### Schritt 1: Web3Forms Account erstellen

1. Gehen Sie zu: **[https://web3forms.com](https://web3forms.com)**
2. Klicken Sie auf "Get Started for Free"
3. Geben Sie Ihre E-Mail ein: **contact@ai-techart.com**
4. Bestätigen Sie Ihre E-Mail-Adresse

### Schritt 2: Access Key erhalten

Nach der Registrierung erhalten Sie:
- Eine E-Mail mit Ihrem **Access Key** (Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
- Zugang zum Dashboard unter [https://web3forms.com/dashboard](https://web3forms.com/dashboard)

### Schritt 3: Access Key in Formulare einfügen

Ersetzen Sie in **BEIDEN** Dateien `YOUR_ACCESS_KEY_HERE` mit Ihrem echten Key:

#### 📄 intake-form.html (Zeile 70)
```html
<input type="hidden" name="access_key" value="HIER_IHREN_KEY_EINFÜGEN">
```

#### 📄 free-starter-pack.html (Zeile 114)
```html
<input type="hidden" name="access_key" value="HIER_IHREN_KEY_EINFÜGEN">
```

**Suchen & Ersetzen:**
- Suchen: `YOUR_ACCESS_KEY_HERE`
- Ersetzen mit: Ihrem echten Access Key

### Schritt 4: Testen

1. Öffnen Sie https://ai-techart.com/intake-form.html
2. Füllen Sie das Formular aus (Testdaten)
3. Klicken Sie "Anfrage absenden"
4. Prüfen Sie Ihr E-Mail-Postfach (contact@ai-techart.com)

Wenn Sie eine E-Mail erhalten → **Erfolgreich!** ✅

---

## Was passiert beim Submit?

### Intake Form (intake-form.html)
- Alle Formularfelder werden strukturiert an contact@ai-techart.com gesendet
- E-Mail-Betreff: "Neue Projekt-Anfrage von AI-TechArt Website"
- Redirect nach Submit: https://ai-techart.com/thank-you.html (siehe Schritt 5)

### Free Starter Pack (free-starter-pack.html)
- Lead-Daten werden an contact@ai-techart.com gesendet
- E-Mail-Betreff: "Neue Anfrage: Gratis Starter Pack - AI-TechArt"
- Redirect nach Submit: https://ai-techart.com/thank-you.html

---

## Schritt 5: Thank You Seite erstellen (Optional)

Derzeit leiten beide Formulare nach dem Submit zu `thank-you.html` weiter, die noch nicht existiert.

**Option A:** Schnelle Lösung (5 Min)

Erstellen Sie eine einfache thank-you.html:

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vielen Dank! | AI-TechArt</title>
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/accessibility-fixes.css">
</head>
<body>
    <div style="text-align: center; padding: 5rem 2rem;">
        <h1 style="font-size: 3rem; color: #667eea;">✅ Vielen Dank!</h1>
        <p style="font-size: 1.25rem; color: #4a5568; max-width: 600px; margin: 2rem auto;">
            Ihre Anfrage wurde erfolgreich übermittelt. <br>
            Wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
        <a href="/" style="display: inline-block; margin-top: 2rem; padding: 1rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px;">
            Zurück zur Startseite
        </a>
    </div>
</body>
</html>
```

**Option B:** Ohne Thank You Seite

Entfernen Sie die Redirect-Zeile aus beiden Formularen:
```html
<!-- Diese Zeile löschen oder auskommentieren: -->
<!-- <input type="hidden" name="redirect" value="https://ai-techart.com/thank-you.html"> -->
```

Dann zeigt Web3Forms eine Standard-Erfolgsmeldung.

---

## Features von Web3Forms

### ✅ Was ist enthalten (kostenlos):

- **100 Submissions/Monat** (kostenlos)
- Formular-Daten als strukturierte E-Mail
- Spam-Schutz (Honeypot + reCAPTCHA optional)
- E-Mail-Benachrichtigungen in Echtzeit
- Dashboard mit allen Submissions
- CSV-Export

### 💰 Upgrade-Optionen (falls nötig):

- **Pro Plan** ($9/Monat): 1000 Submissions/Monat
- **Business Plan** ($29/Monat): 10'000 Submissions/Monat + Webhooks

**Für den Start reicht der kostenlose Plan vollkommen!**

---

## Troubleshooting

### Problem: "Access key is required"
**Lösung:** Sie haben den Access Key noch nicht ersetzt. Ersetzen Sie `YOUR_ACCESS_KEY_HERE` mit Ihrem echten Key.

### Problem: Keine E-Mail erhalten
**Lösung:**
1. Prüfen Sie Ihren Spam-Ordner
2. Verifizieren Sie, dass contact@ai-techart.com im Web3Forms Dashboard eingetragen ist
3. Testen Sie mit einem anderen Formular im Dashboard

### Problem: "Redirect failed"
**Lösung:** Erstellen Sie eine thank-you.html oder entfernen Sie die Redirect-Zeile (siehe Schritt 5, Option B)

---

## Alternative: Formspree

Falls Web3Forms nicht funktioniert, können Sie alternativ **Formspree** nutzen:

1. Gehen Sie zu [https://formspree.io](https://formspree.io)
2. Registrieren Sie sich mit contact@ai-techart.com
3. Erstellen Sie ein neues Form
4. Ersetzen Sie die Form action URL:

```html
<!-- Vorher (Web3Forms): -->
<form action="https://api.web3forms.com/submit" method="POST">

<!-- Nachher (Formspree): -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

5. Entfernen Sie die access_key Zeile

---

## Nächste Schritte

Nach erfolgreicher Aktivierung:

1. ✅ Testen Sie beide Formulare (Intake + Free Pack)
2. ✅ Prüfen Sie E-Mail-Eingang auf korrekte Formatierung
3. ✅ Erstellen Sie eine thank-you.html Seite
4. ✅ Optional: Aktivieren Sie reCAPTCHA für Spam-Schutz im Web3Forms Dashboard
5. ✅ Optional: Verbinden Sie mit Ihrem CRM (z.B. HubSpot, Pipedrive) via Zapier

---

**Bei Fragen:** Web3Forms Support unter [https://web3forms.com/support](https://web3forms.com/support)

**Setup-Zeit:** ~10 Minuten (inkl. Testing)

**Kosten:** CHF 0.00 (100% kostenlos für erste 100 Submissions/Monat)
