# Repository Restructuring Plan

## Current Issues
- 18 HTML files in root directory (cluttered)
- 11 Python scripts scattered in root
- 7 documentation files in root
- Log files in root
- No clear organization

## Proposed Structure

```
github.io/
├── 📄 Core B2B Pages (Keep in Root for URLs)
│   ├── index.html                    # B2B Homepage
│   ├── services.html                 # Service Packages
│   ├── about-expertise.html          # About & Expertise
│   ├── case-studies.html             # Success Stories
│   ├── faq.html                      # FAQ
│   ├── intake-form.html              # Project Intake Form
│   ├── free-starter-pack.html        # Lead Magnet
│   ├── thank-you.html                # Thank You Page
│   └── 404.html                      # Error Page
│
├── 📄 Legal Pages (Keep in Root for URLs)
│   ├── impressum.html                # Legal Notice (DE/CH)
│   ├── datenschutz.html              # Privacy Policy (GDPR)
│   ├── nutzungsbedingungen.html      # Terms of Service
│   ├── lizenz.html                   # License Information
│   └── sicherheit.html               # Security Policy
│
├── 📁 scripts/                       # All Python Scripts
│   ├── gallery-processing/           # AI Gallery Scripts
│   │   ├── analyze_aidrive_images.py
│   │   ├── analyze_categories.py
│   │   ├── categorize_ai_images.py
│   │   ├── final_category_audit.py
│   │   ├── fix_missing_mature_flags.py
│   │   ├── fix_nsfw_blur.py
│   │   ├── fix_specific_mismatches.py
│   │   ├── manual_category_fixes.py
│   │   ├── process_all_images.py
│   │   └── screenshot_based_fixes.py
│   └── server/                       # Server Scripts
│       └── start_server.py
│
├── 📁 docs/                          # Documentation
│   ├── gallery/                      # Gallery Documentation
│   │   ├── AI_GALLERY_README.md
│   │   ├── AI_GALLERY_IMPLEMENTATION.md
│   │   ├── GALLERY_UPDATE_SUMMARY.md
│   │   ├── HOW_TO_PROCESS_700_IMAGES.md
│   │   └── WICHTIG_KATEGORIEN_NICHT_AENDERN.md
│   ├── development/                  # Development Docs
│   │   └── SECURITY_NOTICE.md
│   └── README.md (Keep in root)
│
├── 📁 config/                        # Configuration Files
│   ├── package.json
│   ├── package-lock.json
│   ├── manifest.json
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── _headers
│   ├── security-headers.js
│   ├── supervisord.conf
│   └── sw.js                         # Service Worker
│
├── 📁 server/                        # Server Files
│   └── process-contact.php
│
├── 📁 archive/                       # Archived/Legacy Files
│   ├── legacy-pages/                 # Old Portfolio Pages
│   │   ├── ai-gallery.html
│   │   ├── ai-gallery-backup.html
│   │   └── contact-form.html
│   ├── data/                         # Old Data
│   │   ├── aidrive_catalog.json
│   │   └── aidrive_summary.txt
│   └── logs/                         # Log Files
│       ├── supervisord.log
│       ├── webserver.log
│       └── webserver_error.log
│
├── 📁 assets/                        # Static Assets (Keep Structure)
│   ├── css/
│   │   ├── main.css                  # Main B2B Styles
│   │   ├── responsive.css            # Responsive Design
│   │   ├── accessibility-fixes.css   # WCAG AA Compliance
│   │   ├── language-switcher.css     # Multi-language
│   │   ├── contact-form.css          # Forms
│   │   ├── gallery.css               # Gallery (Legacy)
│   │   ├── demo.css                  # Demos
│   │   └── project-detail.css        # Projects
│   ├── js/
│   │   ├── main.js                   # Main JavaScript
│   │   ├── navigation.js             # Navigation
│   │   ├── animation.js              # Animations
│   │   ├── animations.js             # More Animations
│   │   ├── contact-form.js           # Form Handling
│   │   ├── gallery.js                # Gallery (Legacy)
│   │   ├── gallery-images-config.js  # Gallery Config
│   │   └── aidrive_gallery_config.js # AIDrive Config
│   ├── images/
│   │   └── ai-creations/
│   └── data/
│       └── ai-gallery-data.json
│
├── 📁 projects/                      # Project Pages (Keep)
│   ├── automation-tools.html
│   ├── code-formatter.html
│   ├── dev.auto_tools_preview.html
│   ├── interactive_projects.html
│   ├── learning-platform.html
│   ├── system-architecture.html
│   └── trading-simulator.html
│
├── 📁 demos/                         # Demo Pages (Keep)
│   ├── interactive-demo/
│   │   ├── index.html
│   │   └── demo.js
│   └── tool-preview/
│       ├── index.html
│       └── preview.js
│
├── 📁 dist/                          # Build Output (Keep)
│   ├── assets/
│   └── index.html
│
├── 📄 Root Files
│   ├── LICENSE
│   ├── CNAME
│   ├── .nojekyll
│   ├── .gitignore
│   └── contact-simple.html          # Utility
```

## Benefits

### ✅ Clear Organization
- **Scripts organized by purpose** (gallery vs server)
- **Documentation categorized** (gallery vs development)
- **Config files in one place**
- **Legacy files archived** (not deleted, for reference)
- **Logs separated** from active codebase

### ✅ Maintains URLs
- All B2B pages stay in root
- All legal pages stay in root
- Projects folder unchanged
- Demos folder unchanged
- No broken links!

### ✅ Developer-Friendly
- Easy to find what you need
- Clear file relationships
- Separate concerns (scripts vs docs vs config)
- Archive for legacy code (not cluttering main)

### ✅ Professional
- Industry-standard structure
- Scalable organization
- Easy onboarding for new developers
- Clear separation of concerns

## Implementation Steps

1. ✅ Create new directory structure
2. ✅ Move Python scripts to `scripts/`
3. ✅ Move documentation to `docs/`
4. ✅ Move config files to `config/`
5. ✅ Move legacy pages to `archive/`
6. ✅ Move logs to `archive/logs/`
7. ✅ Update README.md with comprehensive documentation
8. ✅ Test all HTML pages still work
9. ✅ Commit and push changes

## Files Affected

### Moving (40+ files):
- 11 Python scripts → `scripts/`
- 6 documentation files → `docs/`
- 8 config files → `config/`
- 3 legacy HTML → `archive/legacy-pages/`
- 3 logs → `archive/logs/`
- 2 data files → `archive/data/`
- 1 PHP file → `server/`

### Staying in Root (15 files):
- 12 Active HTML pages (B2B + Legal)
- README.md
- LICENSE
- CNAME
- .nojekyll
- .gitignore
- contact-simple.html

### Unchanged:
- assets/ (entire folder)
- projects/ (entire folder)
- demos/ (entire folder)
- dist/ (entire folder)
