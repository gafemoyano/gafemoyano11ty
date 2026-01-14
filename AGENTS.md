# AGENTS.md - Repository Reference Guide

**Repository**: gafemoyano11ty
**Type**: Multi-language Personal Blog (Eleventy + Netlify CMS)
**Languages**: English, Spanish
**Last Updated**: January 2026

---

## Quick Overview

This is a bilingual personal blog and portfolio built with [Eleventy (11ty)](https://www.11ty.dev/), styled with [Tailwind CSS v4](https://tailwindcss.com/), and featuring content management via [Decap CMS](https://decapcms.org/) (formerly Netlify CMS). The site is deployed on [Netlify](https://www.netlify.com/).

### Tech Stack
- **Static Site Generator**: Eleventy v3.1.2
- **Template Engine**: Nunjucks (.njk)
- **Styling**: Tailwind CSS v4 (via CLI, CSS-in-JS approach)
- **Content Management**: Decap CMS (Netlify CMS fork)
- **Deployment**: Netlify
- **JavaScript Framework**: Alpine.js v2.7.0 (lightweight interactivity)
- **Analytics**: Google Analytics + Plausible
- **Code Syntax Highlighting**: PrismJS

---

## Directory Structure

```
gafemoyano11ty/
├── src/                          # Source directory (Eleventy input)
│   ├── en/                       # English content
│   │   ├── index.njk            # English homepage
│   │   ├── about.njk            # About page
│   │   ├── articles.njk         # Articles listing
│   │   ├── projects/            # Portfolio projects (Markdown)
│   │   ├── posts/               # Blog posts (Markdown)
│   │   └── en.json              # Language-specific data (locale, language, dir)
│   ├── es/                       # Spanish content (mirrors en/ structure)
│   │   ├── index.njk
│   │   ├── about.njk
│   │   ├── articulos.njk
│   │   ├── proyectos/
│   │   ├── posts/
│   │   └── es.json
│   ├── _data/                    # Global data accessible to all templates
│   │   ├── i18n/                # Translation strings (en/es)
│   │   │   └── index.js
│   │   └── site.js              # Site metadata (title, URL, languages)
│   ├── _includes/                # Reusable templates & layouts
│   │   ├── layouts/
│   │   │   ├── base.njk         # Master layout (head, navbar, footer)
│   │   │   └── post.njk         # Blog post layout
│   │   ├── navbar.njk           # Navigation with language switcher
│   │   ├── footer.njk           # Site footer
│   │   └── form.njk             # Reusable form components
│   ├── admin/                    # Decap CMS configuration
│   │   ├── config.yml           # CMS collections & fields
│   │   └── index.html           # CMS entry point
│   └── assets/                   # Static assets
│       ├── img/                  # Images (copied to build output)
│       ├── fonts/                # Custom fonts (if any)
│       ├── javascript/
│       │   └── application.js   # Client-side scripts
│       └── styles/
│           └── tailwind.css     # Tailwind CSS entry point
├── _site/                        # Build output (excluded from git)
├── .eleventy.js                  # Eleventy configuration
├── package.json                  # Dependencies & scripts
├── netlify.toml                  # Netlify deployment config
└── robots.txt                    # SEO file

```

---

## Key Configuration Files

### 1. `.eleventy.js` - Build Configuration
**Purpose**: Core build logic, plugins, collections, filters, transforms

**Key Settings**:
- **Plugins**: `eleventy-plugin-syntaxhighlight`, `eleventy-plugin-i18n`
- **Input/Output**: `src/` → `_site/`
- **Collections**:
  - `englishPosts`: `./src/en/posts/*.md`
  - `spanishPosts`: `./src/es/posts/*.md`
  - `englishProjects`: `./src/en/projects/*.md`
  - `spanishProjects`: `./src/es/projects/*.md`
- **Custom Filters**:
  - `readableDate`: Formats dates as "dd LLL yyyy" (e.g., "08 Dec 2020")
  - `htmlDateString`: Formats dates as "yyyy-LL-dd"
  - `head`: Returns first n elements of a collection
- **Custom Shortcodes**:
  - `version`: Returns current timestamp (for cache busting)
- **Passthrough Copies**:
  - `robots.txt`, `netlify.toml`
  - `src/assets/img`, `src/assets/fonts`, `src/assets/javascript`
  - `src/admin/config.yml` → `admin/config.yml`
  - Chartist.js files from `node_modules`
- **Markdown Config**:
  - Uses `markdown-it` with:
    - `markdown-it-anchor` (permalinks)
    - `markdown-it-footnote`
    - HTML enabled, line breaks, linkify
- **HTML Minification**: Enabled in production via `html-minifier`

### 2. `package.json` - Dependencies & Scripts
**Key Scripts**:
```bash
npm start       # Clean build, run Eleventy + Tailwind
npm dev         # Development mode (Eleventy watch + Tailwind watch + BrowserSync)
npm run build   # Production build (minified HTML/CSS)
```

**Key Dependencies**:
- `@11ty/eleventy` v3.1.2
- `@11ty/eleventy-plugin-syntaxhighlight` v5.0.2
- `eleventy-plugin-i18n` v0.1.3
- `tailwindcss` v4.0.0
- `alpinejs` v2.7.0 (via CDN)
- `luxon` (date formatting)
- `markdown-it`, `markdown-it-anchor`, `markdown-it-footnote`

### 3. `netlify.toml` - Deployment Configuration
```toml
[build]
  publish = "_site"
  command = "DEBUG=* npm run build"

[[redirects]]
  from = "/"
  to = "/en"
  status = 301
```
**Note**: Root redirects to English homepage (`/en`).

### 4. `src/_data/site.js` - Global Site Metadata
```javascript
{
  title: "Felipe Moyano",
  description: "...",
  url: production ? "https://gafemoyano.com" : "http://localhost:8080",
  baseUrl: "/",
  author: "Felipe Moyano",
  authorTwitter: "@gafemoyano",
  languages: [
    { label: "english", code: "en" },
    { label: "español", code: "es" }
  ]
}
```

### 5. `src/_data/i18n/index.js` - Translation Dictionary
**Purpose**: Store UI strings that need translation (navigation, buttons, etc.)

**Usage in templates**: `{{ "nav.home" | i18n }}`

**Structure**:
```javascript
{
  nav: {
    home: { en: "Home", es: "Inicio" },
    articles: { en: "Articles", es: "Artículos" },
    projects: { en: "Projects", es: "Proyectos" },
    about: { en: "About", es: "Acerca de" }
  },
  signup: {
    title: { en: "...", es: "..." },
    description: { en: "...", es: "..." }
  }
}
```

### 6. `src/admin/config.yml` - Decap CMS Configuration
**Backend**:
- `name: git-gateway` (Netlify Identity + Git Gateway)
- `branch: main`
- `publish_mode: editorial_workflow` (Draft → Review → Publish)
- `local_backend: true` (local development via `npx netlify-cms-proxy-server`)
- `media_folder: "src/assets/img"`
- `public_folder: "/assets/img"`

**Collections**:
- **English Posts**: `src/en/posts/` (title, date, featured_image, description, body)
- **Spanish Posts**: `src/es/posts/` (same fields)

**Note**: Projects exist in the codebase but are **not** managed via CMS yet.

---

## Bilingual Architecture (I18n)

### Strategy: Directory-Based Localization

The site uses a **directory-based i18n strategy** with URL prefixes:

```
/en/    → English content
/es/    → Spanish content
```

### Key Components:

#### 1. Language Directories
- `/src/en/` - All English content
- `/src/es/` - All Spanish content
- Each has a `.json` file (`en.json`, `es.json`) that injects:
  - `locale`: "en" or "es"
  - `language`: "english" or "español"
  - `dir`: "ltr" (text direction)

#### 2. Translation Methods

**A. Global UI Strings** (via `eleventy-plugin-i18n`):
- Stored in `src/_data/i18n/index.js`
- Accessed in templates: `{{ "nav.home" | i18n }}`
- Used for: navigation, buttons, labels, etc.

**B. Content-Specific Translations**:
- Separate Markdown files for each language (`en/posts/*.md`, `es/posts/*.md`)
- Same frontmatter structure, different content

#### 3. Language Switching (Navbar)

**Location**: `src/_includes/navbar.njk`

**Logic**:
```njk
{# Calculate relative path without language prefix #}
{% set pageUrl = page.url.split('/').slice(2).join('/') %}

{# Generate alternate links #}
<a href="/{{ locale.code }}/{{ pageUrl }}" hreflang="{{ locale.code }}">
  {{ locale.label | capitalize }}
</a>
```

**Features**:
- Hover dropdown (Alpine.js-powered)
- Maintains current page when switching languages
- Mobile menu includes language options

#### 4. SEO Integration

**Base Layout** (`src/_includes/layouts/base.njk`):
```njk
<html lang="{{ locale }}" dir="{{ dir }}">

{# Hreflang tags for search engines #}
{% for locale in locales -%}
  <link rel="alternate"
        href="{{site.url}}/{{locale.code}}/{{pageUrl}}"
        hreflang="{{ locale.code }}">
{% endfor -%}
```

#### 5. Collections

Language-specific collections in `.eleventy.js`:
- `englishPosts` → English blog posts
- `spanishPosts` → Spanish blog posts
- `englishProjects` → English portfolio items
- `spanishProjects` → Spanish portfolio items

### Adding a New Language

1. Create directory: `src/[lang]/`
2. Add `[lang].json` with locale/language/dir
3. Add content files (mirroring structure)
4. Update `src/_data/i18n/index.js` with translations
5. Update `src/_data/site.js` with new language in `languages` array

---

## Content Types

### Blog Posts

**Location**: `src/[lang]/posts/*.md`

**Frontmatter Structure**:
```yaml
---
title: "Post Title"
date: 2020-12-08
featured_image: /assets/img/articles/image.jpg
featured_image_alt: "Alt text for image"
image_caption: "Caption for image"
description: "Post description for SEO"
tags:
  - tag1
  - tag2
layout: layouts/post.njk
---
```

**URL Pattern**: `/[lang]/posts/[slug]/` (from filename)

**Collections**: `englishPosts`, `spanishPosts`

### Pages

**Location**: `src/[lang]/[page].njk`

**Examples**: `index.njk`, `about.njk`, `articles.njk`

**Frontmatter**:
```yaml
---
locale: "en"
dir: "ltr"
title: "Page Title"
description: "Page description"
---
```

**URL Pattern**: `/[lang]/[page]/` (or `/[lang]/` for `index.njk`)

### Projects

**Location**: `src/[lang]/projects/*.md`

**Structure**: Similar to blog posts but separate collection

**Collections**: `englishProjects`, `spanishProjects`

**Note**: Not yet managed via CMS

---

## Template Patterns

### Layout Hierarchy

```
layouts/base.njk (master)
  ├── Includes navbar.njk
  ├── Includes footer.njk
  └── layouts/post.njk (extends base.njk)
```

### Base Layout (`layouts/base.njk`)

**Key Features**:
- Sets `<html lang="{{ locale }}" dir="{{ dir }}">`
- Includes CSS: `tailwind.css` (versioned with cache busting)
- Includes Alpine.js via CDN
- Includes Google Fonts: Inter, Kanit
- Generates hreflang tags
- Includes analytics (Google Analytics + Plausible) in production
- Provides `{% block content %}` for child templates

### Post Layout (`layouts/post.njk`)

Extends `base.njk` and includes:
- Post title, date, author
- Featured image with caption
- Table of contents (if implemented)
- Syntax highlighting for code blocks
- Social sharing (if implemented)

### Component Patterns

**Navbar** (`navbar.njk`):
- Alpine.js for mobile menu toggle
- Language switcher dropdown (hover)
- Responsive: desktop (horizontal) + mobile (vertical)
- Current page highlighting (via CSS classes)

**Footer** (`footer.njk`):
- Site links
- Copyright info
- Social links (if any)

---

## Styling with Tailwind CSS v4

### Setup

**Entry Point**: `src/assets/styles/tailwind.css`
```css
@import "tailwindcss";
```

**Build Process**:
```bash
# Development (watch mode)
npx @tailwindcss/cli -i src/assets/styles/tailwind.css -o _site/assets/styles/tailwind.css -w

# Production (minified)
npx @tailwindcss/cli -i src/assets/styles/tailwind.css -o _site/assets/styles/tailwind.css --minify
```

### Design System

**Colors**: Lime green as primary (`lime-600`, `lime-700`, `lime-800`)
**Fonts**:
- Body: Inter
- Display/Headings: Kanit
**Typography**: `font-body` (Inter), `font-display` (Kanit)
**Background**: `bg-gray-50`
**Text**: `text-gray-800`

### Common Patterns

**Buttons**:
```njk
<a href="/path"
   class="px-3 py-2 text-sm font-medium border-b-4 border-transparent hover:border-lime-600">
  Link text
</a>
```

**Section Containers**:
```njk
<section class="w-full max-w-3xl mx-auto mt-12">
  <div class="px-4 mt-6 content">
    <!-- Content -->
  </div>
</section>
```

---

## JavaScript & Interactivity

### Alpine.js Usage

**Navbar Toggle** (`navbar.njk`):
```njk
<nav x-data="{ open: false }">
  <button @click="open = !open">Menu</button>
  <div :class="{'block': open, 'hidden': !open}">
    <!-- Mobile menu -->
  </div>
</nav>
```

**Language Switcher Dropdown**:
```njk
<div x-data="{ open: false }"
     @mouseenter="open = true"
     @mouseleave="open = false">
  <button>Locale Button</button>
  <div x-show="open">
    <!-- Dropdown options -->
  </div>
</div>
```

### Custom JavaScript

**Location**: `src/assets/javascript/application.js`

**Usage**: Add any custom client-side logic here

---

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

**What happens**:
1. Eleventy starts in watch mode (`--serve`) on port 8080
2. Tailwind CLI watches for CSS changes
3. BrowserSync proxies `_site/` with live reload on port 8080
4. Access site at `http://localhost:8080`

### CMS Local Development

```bash
# Start Eleventy dev server (as above)
npm run dev

# In another terminal, start CMS proxy server
npx netlify-cms-proxy-server
```

**Access CMS**: `http://localhost:8080/admin/`

### Building for Production

```bash
npm run build
```

**What happens**:
1. Eleventy builds with `ELEVENTY_ENV=production`
2. HTML is minified via `html-minifier`
3. Tailwind CSS is minified
4. Output goes to `_site/`

### Deployment

**Platform**: Netlify

**Configuration**:
- **Build Command**: `DEBUG=* npm run build`
- **Publish Directory**: `_site/`
- **Redirects**: `/` → `/en` (301)

**Netlify Identity**: Must be enabled in Netlify dashboard for CMS authentication.

---

## Content Management (CMS)

### CMS Collections

**English Posts**:
- Folder: `src/en/posts/`
- Template: `layouts/post.njk`
- Fields: title, date, featured_image, featured_image_alt, image_caption, description, body

**Spanish Posts**:
- Folder: `src/es/posts/`
- Template: `layouts/post.njk`
- Fields: same as English

### Editorial Workflow

Enabled by default (`publish_mode: editorial_workflow`):

1. **Draft**: New content starts here (not in build)
2. **In Review**: Ready for review
3. **Ready**: Approved for publish
4. **Published**: Live on site

Behind the scenes: Uses GitHub Pull Requests.

### Adding New Collections

To manage projects via CMS, add to `src/admin/config.yml`:

```yaml
- label: "English Projects"
  name: "english-projects"
  folder: "src/en/projects"
  create: true
  fields:
    - { label: "Title", name: "title", widget: "string" }
    - { label: "Description", name: "description", widget: "string" }
    # ... more fields
```

---

## Common Tasks

### Adding a New Blog Post

**Option 1: Manual (Markdown)**
1. Create `src/[lang]/posts/[slug].md`
2. Add frontmatter (title, date, featured_image, etc.)
3. Write content in Markdown
4. Test: `npm run dev`

**Option 2: Via CMS**
1. Navigate to `/admin/`
2. Click "New Post" (English or Spanish)
3. Fill fields
4. Set status (Draft → Published)
5. Commit will be created automatically

### Adding a New Page

1. Create `src/[lang]/[page].njk`
2. Add frontmatter (locale, dir, title, description)
3. Extend `layouts/base.njk`
4. Add content in `{% block content %}`
5. Update navbar if needed (`src/_includes/navbar.njk`)

### Updating Translations

**UI Strings**:
- Edit `src/_data/i18n/index.js`
- No restart needed (Eleventy watch mode)

**Content**:
- Edit corresponding `.md` file in `src/[lang]/...`
- Changes appear on save (watch mode)

### Styling Changes

1. Edit `src/assets/styles/tailwind.css` or import new CSS files
2. Tailwind CLI watches and rebuilds automatically
3. Refresh browser (BrowserSync reloads)

### Adding New Filters/Shortcodes

Edit `.eleventy.js`:

**Filter**:
```javascript
eleventyConfig.addFilter("myFilter", (value) => {
  // Transform value
  return transformed
})
```

**Usage**: `{{ value | myFilter }}`

**Shortcode**:
```javascript
eleventyConfig.addShortcode("myShortcode", (arg1, arg2) => {
  return `<div>${arg1} ${arg2}</div>`
})
```

**Usage**: `{% myShortcode arg1 arg2 %}`

---

## Analytics & SEO

### Analytics

**Google Analytics** (Production only):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-8THYF9RS37"></script>
```

**Plausible** (Production only):
```html
<script defer data-domain="gafemoyano.com"
        src="https://plausible.io/js/plausible.js"></script>
```

### SEO Features

- **Canonical URLs**: `<link rel="canonical" href="{{site.url}}/en/{{pageUrl}}">`
- **Hreflang Tags**: For alternate language versions
- **Open Graph**: `og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale`
- **Meta Description**: From frontmatter `description`
- **Keywords**: From frontmatter `tags` (defaults to: web development, rails, ruby on rails, blog, web design)

---

## Deployment Architecture

### Netlify Configuration

**Build & Deploy**:
- **Build Command**: `DEBUG=* npm run build`
- **Publish Directory**: `_site/`
- **Branch**: `main`

**Routing**:
- Root (`/`) redirects to `/en` (301)
- No other redirects defined

**Identity & Git Gateway**:
- Netlify Identity handles authentication
- Git Gateway enables CMS to commit to repo
- Users don't need GitHub accounts (uses Netlify Identity)

### Environment Variables

- `ELEVENTY_ENV`: Set to "production" in Netlify build environment

---

## Code Patterns & Conventions

### Template Naming

- **Layouts**: `layouts/*.njk`
- **Partials**: Direct include (no subfolder for simple partials)
- **Pages**: `[name].njk` in language directories
- **Content**: `*.md` with YAML frontmatter

### File Organization

- **Assets**: Grouped by type (img, fonts, javascript, styles)
- **Content**: Grouped by language first, then type
- **Data**: Global in `_data/`, locale-specific in language dirs

### CSS Architecture

- **Tailwind v4**: Import-based (no config file needed)
- **Modular**: Separate files for typography, components (imported into main)
- **Cache Busting**: `?v={% version %}` query param on CSS link

### Code Style

- **JavaScript**: Standard (no specific linter mentioned)
- **Nunjucks**: 2-space indentation (observed in templates)
- **Markdown**: Standard with frontmatter

---

## Troubleshooting

### Common Issues

**Eleventy not watching files**:
- Check: `eleventyConfig.setUseGitIgnore(false)` is set in `.eleventy.js`

**CSS not updating**:
- Check: Tailwind CLI is running in watch mode
- Check: BrowserSync is active
- Force refresh: Ctrl+Shift+R (hard refresh)

**Language switcher not working**:
- Check: `pageUrl` calculation in navbar
- Check: Language directories exist (`en/`, `es/`)
- Check: `locales` data in `site.js` is correct

**CMS not loading**:
- Check: Netlify Identity is enabled in Netlify dashboard
- Check: `config.yml` is copied to `admin/config.yml`
- Local dev: Run `npx netlify-cms-proxy-server`

### Debug Mode

Enable debug logging:
```bash
DEBUG=* npm run build
```

---

## Future Enhancements (Potential)

### CMS
- Add projects collection to CMS
- Add media library for better image management
- Add custom preview templates

### Features
- RSS feeds for each language
- Sitemap generation
- Search functionality
- Social sharing buttons
- Reading time estimation
- Related posts

### Performance
- Image optimization (responsive images, WebP)
- Critical CSS inlining
- Service worker for offline support

---

## External Resources

- **Eleventy Docs**: https://www.11ty.dev/docs/
- **Tailwind CSS v4 Docs**: https://tailwindcss.com/docs
- **Decap CMS Docs**: https://decapcms.org/docs/
- **Alpine.js Docs**: https://alpinejs.dev/
- **Netlify Identity**: https://docs.netlify.com/identity/

---

## Contact & Repository Info

- **Author**: Felipe Moyano
- **Twitter**: @gafemoyano
- **Live Site**: https://gafemoyano.com
- **GitHub**: (repository URL - check remote)

---

*This document serves as a comprehensive reference for understanding and working with the gafemoyano11ty codebase. Last updated: January 9, 2026*
