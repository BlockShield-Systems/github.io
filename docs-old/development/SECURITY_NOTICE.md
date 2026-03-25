# 🔒 SECURITY NOTICE - WICHTIG / IMPORTANT

## ⚠️ Öffentliches Repository / Public Repository

Dieses Repository ist **ÖFFENTLICH**. Bitte beachten Sie folgende Sicherheitshinweise:

### ❌ NIEMALS hochladen / NEVER upload:
- Echte NSFW-Bilder direkt ins Repository
- Direkte Links zu sensiblen Inhalten
- Persönliche oder urheberrechtlich geschützte Bilder ohne Berechtigung
- API-Keys oder Zugangsdaten

### ✅ Empfohlene Vorgehensweise / Recommended Approach:

#### Option 1: Externe Bildhosting (EMPFOHLEN)
1. Nutzen Sie einen privaten Cloud-Service (z.B. Cloudflare R2, AWS S3)
2. Implementieren Sie serverseitige Authentifizierung
3. Verwenden Sie signierte URLs mit Ablaufzeit
4. Halten Sie die Bild-URLs außerhalb des öffentlichen Codes

#### Option 2: Separates privates Repository
1. Erstellen Sie ein **privates** Repository für sensible Bilder
2. Verwenden Sie GitHub Actions für automatisches Deployment
3. Halten Sie nur die Struktur im öffentlichen Repo

#### Option 3: Dynamisches Laden
```javascript
// Beispiel für sicheres Laden von Bildern
async function loadGalleryImages() {
    // Laden Sie Bildpfade von einem geschützten Endpoint
    const response = await fetch('https://your-api.com/gallery-images', {
        headers: {
            'Authorization': 'Bearer YOUR_TOKEN'
        }
    });
    const images = await response.json();
    return images;
}
```

### 📁 Aktuelle Struktur (SICHER)
```
✅ ai-gallery.html          - Nur Struktur, keine echten Bilder
✅ gallery.js               - Nur Funktionalität, keine Bildpfade
✅ gallery-images-config.js - Nur leere Arrays mit Beispielen
```

### 🛡️ Für NSFW-Inhalte:
1. **Niemals** direkt im öffentlichen Repository speichern
2. Verwenden Sie externe, geschützte Speicherlösungen
3. Implementieren Sie strenge Altersverifikation
4. Beachten Sie lokale Gesetze und Vorschriften

### 📝 Konfiguration für Produktion:
Erstellen Sie eine `.env` Datei (NICHT committen!):
```env
IMAGE_API_ENDPOINT=https://your-secure-api.com
API_KEY=your-secret-key
```

Fügen Sie `.env` zu `.gitignore` hinzu:
```gitignore
.env
.env.local
/private-images/
/nsfw-content/
```

---

## English Version

This repository is **PUBLIC**. Please follow these security guidelines:

### ❌ NEVER upload:
- Actual NSFW images directly to the repository
- Direct links to sensitive content
- Personal or copyrighted images without permission
- API keys or credentials

### ✅ Recommended Approach:
Use external, secured image hosting with authentication for sensitive content.

---

**Last Updated:** 2024
**Security Level:** PUBLIC REPOSITORY