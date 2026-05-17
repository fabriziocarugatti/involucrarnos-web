# CLAUDE.md — Involucrarnos

> Archivo maestro de contexto para Claude. Reemplaza al antiguo `CONTEXT.md`.
> Última actualización: 2026-05-16

---

## 🔥 Reglas críticas (no negociables)

1. **Idioma del producto:** español rioplatense argentino siempre. La IA "Involucrado" tiene SEED_MESSAGE forzado en español — no tocar sin razón.
2. **Color:** dorado `#C8A96A` sobre `azul-deep #161a4c`. NO naranja (se probó y se revirtió).
3. **Dominio:** `.com.ar`, NUNCA `.ar` solo.
4. **El chat IA se llama "Involucrado"**, badge "BETA" siempre visible.
5. **Sin emojis decorativos en UI** — tono editorial serio.
6. **Sin paywall, sin login obligatorio.** Solo `/admin` y `/studio` requieren auth.
7. **Page `/proyectos` eliminada** — solo 3 cards en home, redirige a `/`.
8. **Solo la card de Involucrado (status: activo) es clickeable.** Las otras no responden a hover/click.
9. **Foto del equipo siempre a color** (sin grayscale, sin overlay).
10. **Footer logo siempre opaco** (sin opacity-70).
11. **Credenciales:** NUNCA buscarlas/extraerlas. Si falta una key, pedírsela al usuario y esperar.
12. **Supabase:** usar SIEMPRE el CLI (`supabase`), nunca el MCP toolkit.

---

## 📌 IDs y servicios

| Servicio | ID / valor |
|----------|-----------|
| GA4 | `G-C0457NXWB3` |
| Microsoft Clarity | `wrlor825l0` |
| Google Search Console | Verificado por DNS (Cloudflare TXT) |
| Vercel project | `prj_rTK2Skp7q4Us2WYjDnHVHLDf6sVt` |
| Vercel team | `team_g6RPKMUTvwoNUACpRAUkrEGl` |
| Repo | `fabriziocarugatti/involucrarnos` |
| Sender de emails | `noreply@involucrarnos.com.ar` (Brevo) |
| Lista newsletter Brevo | ID `2` |
| Email interno | `involucrarnosoficial@gmail.com` |
| Cuenta deploy Vercel | `fabrizio.carugatti@gmail.com` |

---

## ⚠️ Gotchas conocidos

1. **El cwd inicial de Bash es `/Users/fabrizio`**, no el del proyecto. Para git usar `cd /Users/fabrizio/Documents/dev/web_involucrarnos &&` o `git -C <path>`.
2. **Sanity content block:** el tipo se llama `contentBlock`, NO `block`. Bug histórico.
3. **Manifest.ts:** `MetadataRoute.Manifest` NO acepta `lang` ni `categories`. Solo campos estándar.
4. **OpenRouter modelos:** los slugs cambian. Verificar en openrouter.ai/models. Headers obligatorios: `HTTP-Referer: https://involucrarnos.com.ar`, `X-Title: Involucrarnos`.
5. **Brevo:** sin `BREVO_API_KEY` los emails se ignoran silenciosamente (guard `if (process.env.BREVO_API_KEY)`).
6. **Vercel preview tarda 2-3 min** después del push.
7. **GSC tarda 1-2 semanas** en indexar un sitio nuevo aunque el sitemap esté enviado.

---

## 1. Identidad

**Hub educativo abierto sobre políticas públicas, gestión estatal y desarrollo del NOA argentino.**

- **Fundador:** Exequiel Soria Arruñada (Magíster en Políticas Públicas)
- **Sede conceptual:** Tucumán · NOA
- **Dominio:** `involucrarnos.com.ar` (live)

### Marco editorial (7 ejes)
1. Capacidad estatal real
2. Ciclo de política pública (Diagnóstico → Diseño → Implementación → Monitoreo → Evaluación)
3. Gobernar con datos y evidencias
4. Saber ganar, perder y parar (3 capacidades del liderazgo público)
5. Guerra cognitiva vs cultural
6. Reformar el Estado, no destruirlo
7. NOA y desarrollo territorial

**Tono:** riguroso, accesible, basado en evidencia. Sin academicismo, cinismo, voluntarismo, triunfalismo, ni partidismo.

---

## 2. Stack técnico

| Área | Tecnología | Versión |
|------|------------|---------|
| Framework | Next.js | 14.2.3 (App Router) |
| Lenguaje | TypeScript | latest |
| UI | React | 18 |
| Styling | Tailwind CSS | latest |
| Animaciones | framer-motion | 12.38.0 |
| Iconos | lucide-react | 1.14.0 |
| CMS | Sanity | 3.99.0 |
| DB | Supabase | 2.105.4 |
| Validación | Zod | 4.4.3 |
| IA SDK | Vercel AI SDK | 6.0.177 |
| Runtime | Node | 24.x |

### Servicios externos

| Servicio | Uso | Env var |
|----------|-----|---------|
| Vercel | Hosting + deploy | (auto) |
| Sanity | CMS artículos | `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_WRITE_TOKEN`, `SANITY_REVALIDATE_SECRET` |
| Supabase | DB inscripciones/suscriptores | `SUPABASE_URL`, `SUPABASE_ANON_KEY` |
| Brevo | Email transaccional + newsletter | `BREVO_API_KEY` |
| OpenRouter | IA Involucrado | `OPENROUTER_API_KEY` |
| GA4 | Analytics | hardcoded |
| Clarity | Heatmaps | hardcoded |

---

## 3. Estructura del repositorio

```
web_involucrarnos/
├── CLAUDE.md                    # ← este archivo
├── PENDIENTES.md                # checklist
├── package.json
├── tailwind.config.ts           # tokens de diseño
├── next.config.mjs              # security headers
├── sanity.config.ts             # Sanity Studio
└── src/
    ├── app/
    │   ├── layout.tsx           # metadata, fonts, GA4, Clarity
    │   ├── page.tsx             # home
    │   ├── globals.css
    │   ├── sitemap.ts           # /sitemap.xml dinámico
    │   ├── robots.ts
    │   ├── manifest.ts
    │   ├── icon.tsx             # favicon 32x32
    │   ├── apple-icon.tsx       # 180x180
    │   ├── not-found.tsx        # 404 personalizada
    │   ├── feed.xml/route.ts    # RSS
    │   ├── articulos/[slug]/
    │   │   ├── page.tsx
    │   │   └── opengraph-image.tsx
    │   ├── estudios/[slug]/
    │   │   ├── page.tsx
    │   │   └── opengraph-image.tsx
    │   ├── proyectos/page.tsx   # redirect a /
    │   ├── admin/
    │   │   ├── page.tsx         # dashboard
    │   │   └── login/page.tsx
    │   ├── studio/[[...tool]]/  # Sanity Studio embebido
    │   └── api/
    │       ├── chat/            # Edge: Involucrado
    │       ├── newsletter/      # POST suscripción
    │       ├── inscripcion/     # POST curso
    │       ├── search/          # IA + keyword fallback
    │       ├── summary/         # resumen IA
    │       ├── revalidate/      # webhook Sanity
    │       └── admin/
    │           ├── route.ts     # GET/PATCH/DELETE
    │           └── login/route.ts
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Hero.tsx
    │   ├── EstudiosSection.tsx
    │   ├── ContenidosSection.tsx
    │   ├── CursosSection.tsx
    │   ├── NosotrosSection.tsx
    │   ├── SumateSection.tsx
    │   ├── ProyectosPreview.tsx
    │   ├── Footer.tsx
    │   ├── ChatAssistant.tsx
    │   ├── InscripcionForm.tsx
    │   ├── ArticleSummary.tsx
    │   ├── StudySummary.tsx
    │   ├── ShareButtons.tsx
    │   ├── SmartSearch.tsx
    │   └── charts/              # Chart, BarChart, LineChart, DonutChart, ArgentinaMap, NOAMap, StatCard
    ├── data/
    │   ├── site.ts              # ★ config global
    │   ├── articulos.ts         # fallback de Sanity
    │   ├── estudios.ts          # ★ estudios con charts
    │   └── proyectos.ts         # 6 proyectos
    ├── lib/
    │   ├── ai-context.ts        # ★ system prompt + SEED_MESSAGE
    │   ├── supabase.ts
    │   ├── motion.ts
    │   └── utils.ts
    ├── sanity/
    │   ├── client.ts
    │   ├── env.ts
    │   ├── queries.ts
    │   └── schemas/
    └── middleware.ts            # protección /admin
```

---

## 4. Sistema de diseño

### Paleta (Tailwind tokens en `tailwind.config.ts`)

```ts
azul:    { DEFAULT: '#2a2f76', dark: '#1e2260', deep: '#161a4c' }
dorado:  { DEFAULT: '#C8A96A', soft: '#d4ba87', deep: '#a88845' }
crema:   { DEFAULT: '#f7f4ef', warm: '#efeae0' }
texto:   '#1a1a2e'
gris:    '#6b7280'
borde:   '#e5e7eb'
```

### Tipografía

| Token | Familia | Uso |
|-------|---------|-----|
| `font-title` | Nunito (700/800/900) | Títulos |
| `font-body` | Inter (400/500/600) | UI, párrafos |
| `font-article` | Lora (400/600, italic) | Artículos largos |

### Patrones recurrentes

```tsx
// Cards
className="bg-white border border-black/8 rounded-2xl p-6 md:p-7
           shadow-[0_2px_18px_rgba(42,47,118,0.05)]"

// Eyebrows
className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-texto/45"

// Pills dorados
className="text-[0.65rem] font-bold tracking-[0.18em] uppercase
           text-dorado bg-dorado/15 rounded-full px-3 py-1"
```

- **Animaciones:** `animate-fade-up`, `animate-ping-slow`. Variants framer-motion en `src/lib/motion.ts`.
- **Reduced motion:** todo respeta `prefers-reduced-motion`.
- **Grain texture:** clase `grain` sobre fondos azules.

---

## 5. Modelo de datos

### `Proyecto` (`src/data/proyectos.ts`)

6 proyectos: `involucrado-ia` (activo, único clickeable), `generador-diagnosticos`, `observatorio-estado-noa`, `diccionario-pp`, `mentoria-gestion-publica`, `mapa-actores-noa`.

Solo se muestran 3 en home. Click en card activa dispara `CustomEvent('open-involucrado')` que escucha `ChatAssistant`.

### `Article` (`src/data/articulos.ts`)

Artículos viven **tanto en código como en Sanity**. La página hace fetch a Sanity primero, fallback al array local.

### `Study` (`src/data/estudios.ts`)

Estudios con `stats`, `charts` (bar/line/donut/map NOA/map Argentina), `findings`, `methodology`, `sources`.

### Tablas Supabase

**`suscriptores`** — `email` (PK, unique), `nombre`, `created_at`

**`inscripciones`** — `id` uuid PK, `nombre`, `email`, `curso`, `curso_slug`, `fecha_nacimiento`, `celular`, `ciudad`, `provincia`, `status` (`pendiente|confirmado|cancelado|asistio`), `notas`, `created_at`

---

## 6. APIs

### `/api/chat` (Edge runtime)
- POST `{ messages }` → streaming texto plano
- Rate limit: 15/h por IP
- Modelos: Gemini Flash + fallbacks free
- Headers a OpenRouter: `HTTP-Referer`, `X-Title`

### `/api/newsletter`
- POST `{ email, name? }`
- Upsert Supabase + Add a Brevo lista 2 + Email bienvenida + Notif interna

### `/api/inscripcion`
- POST `{ nombre, email, curso, ... }`
- Insert Supabase status `pendiente` + Email confirmación + Notif equipo

### `/api/search`
- POST `{ query }` → IA + fallback keyword

### `/api/summary`
- POST `{ type, slug }` → 3 bullets + conclusión

### `/api/admin` (cookie `inv_admin=ok`)
- GET listados, PATCH editar inscripción, DELETE eliminar

### `/api/revalidate`
- Webhook Sanity con `SANITY_REVALIDATE_SECRET`

### Rutas SEO
- `/feed.xml` (RSS últimos 20 artículos, cache 1h)
- `/sitemap.xml` (home + estudios + artículos publicados)
- `/robots.txt` (allow `/`, disallow `/admin /api/ /studio/`)
- `/manifest.webmanifest` (PWA)

---

## 7. Sistema de IA — Involucrado

- **Nombre:** Involucrado (NO "El Especialista")
- **Badge:** "BETA" siempre visible
- **Modelo actual:** Gemini Flash + fallbacks free
- **System prompt:** `src/lib/ai-context.ts` con marco de 7 ejes + estudios + artículos como contexto
- **SEED_MESSAGE:** assistant message en español inyectado antes del usuario, para cebar idioma

### Reglas absolutas del prompt
- Español rioplatense siempre
- Máximo 3 oraciones por respuesta
- Texto plano, sin bullets, sin markdown
- Solo política pública, gestión, datos de Involucrarnos
- Partidos: solo metodológico, jamás partidista
- Sin dato: "No tengo ese dato, pero puedo darte el marco."

### Comunicación inter-componentes
```ts
window.dispatchEvent(new CustomEvent('open-involucrado', {
  detail: { message: 'opcional' }
}))
```

---

## 8. Emails — Brevo

- **API:** `api.brevo.com/v3/smtp/email`
- **Sender:** `Involucrarnos <noreply@involucrarnos.com.ar>` (sender debe estar verificado en Brevo)
- **Estilo de templates:** background `#f5f3ee`, card 560px, header azul-deep + eyebrow dorado, body crema con borde, border-left dorado en destacados.

Emails que se envían: bienvenida newsletter, notif interna newsletter, confirmación inscripción, notif interna inscripción.

---

## 9. CMS — Sanity

- **Studio embebido:** `/studio`
- **Schemas:** `articulo` (campos: title, slug, tipo, bajada, category, date, author ref, featured, published, content array de `contentBlock`, coverImage, enrollUrl), `autor` (name, role, photo, bio)
- **Queries:** `getAllArticulos()`, `getArticuloBySlug(slug)` con fallback a `src/data/articulos.ts`
- **Webhook revalidación:** `/api/revalidate` (auth con `SANITY_REVALIDATE_SECRET`)

---

## 10. Panel Admin (`/admin`)

- Auth: cookie `inv_admin=ok`, middleware redirige a `/admin/login`
- **Stats:** total inscriptos, suscriptores, mini bar chart 7 días
- **Búsqueda** por nombre/email
- **Filtros:** estado (pendiente/confirmado/cancelado/asistió), provincia
- **Inscripciones agrupadas por curso**, edición de status + notas internas
- **Export CSV** (filtrado si hay filtros activos) tanto de inscripciones como suscriptores
- **Eliminar fila** con confirmación

Colores status: `pendiente` amber, `confirmado` emerald, `cancelado` red, `asistio` sky.

---

## 11. SEO

### Implementado ✅
- Sitemap dinámico
- Robots
- OG images dinámicas por artículo/estudio (next/og, edge runtime, 1200x630, formas geométricas)
- JSON-LD: `Article`+`BreadcrumbList` en artículos, `ScholarlyArticle`+`BreadcrumbList` en estudios
- RSS feed en `/feed.xml` linkado en `<head>`
- Twitter Card `summary_large_image`
- Favicon SVG + generado 32x32 + apple 180x180 (geométrico)
- PWA manifest
- Security headers en `next.config.mjs`: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- 404 personalizada con gradiente azul→dorado
- GA4 + Microsoft Clarity en `layout.tsx`
- Google Search Console verificado, sitemap enviado, home indexada

### Pendiente
- Eventos de conversión GA4 (`articulo_leido`, `involucrado_opened`, `newsletter_subscribed`, `curso_inscripto`)
- Meta Pixel (si se hacen ads)

---

## 12. Workflow de deploy

```bash
cd /Users/fabrizio/Documents/dev/web_involucrarnos
# editar archivos
git add .
git commit -m "feat: ..."
git push origin main
# Vercel deploya en 2-3 min
```

- Branch principal: `main` → auto-deploy a producción
- Worktree legacy en `.claude/worktrees/compassionate-swirles-47a694/` (evitar usar)

---

## 13. Decisiones consolidadas (no revisar)

1. Color: **dorado** sobre azul-deep
2. Chat IA se llama **Involucrado**, badge BETA
3. Página `/proyectos` eliminada (redirect a `/`)
4. Solo card de Involucrado clickeable
5. Click en card abre el chat (no solo el botón)
6. Foto equipo a color
7. Footer logo opaco
8. Sin paywall, sin login
9. Sin emojis decorativos
10. Idioma: español rioplatense
11. Dominio: `.com.ar`
12. OG images con formas geométricas (no fonts externas)
13. Favicon también geométrico
14. CursosSection: fondo blanco con card oscuro
15. Hero: texto en tercio superior
16. HubSection y ProyectosSection legacy → no usar

---

## 14. Pendientes priorizados

### 🟡 Alta prioridad
- **Eventos de conversión GA4** — agregar en ChatAssistant, SumateSection, InscripcionForm, artículos (tiempo > 60s)

### 🟢 Mejoras
- **Admin:** vista unificada suscriptores + inscriptos
- **Sanity:** cargar más artículos reales, configurar autores, fechas de cursos
- **Meta Pixel** si se hacen ads en Meta
- **Lazy loading** de charts en estudios
- **Lighthouse audit** + optimizaciones CWV
- **Tests E2E con Playwright** (Hero, formularios, chat)

### ✅ Completado reciente
- Dominio `involucrarnos.com.ar` live
- GA4 + Clarity instalados
- Google Search Console verificado, home indexada
- Admin con búsqueda + filtros + CSV filtrado
- Involucrado upgradeado a Gemini Flash

---

## 15. Troubleshooting

### Build falla en Vercel
1. TypeScript error en `manifest.ts` — no usar `lang`/`categories`
2. Env vars faltantes — chequear en Vercel Settings
3. Sanity env vars rotas — falla `getAllArticulos()` en `generateStaticParams`
4. Logs vía MCP: `mcp__vercel__get_deployment_build_logs`

### Chat IA falla
1. `OPENROUTER_API_KEY` faltante/inválida
2. Slugs de modelos cambiaron — verificar en openrouter.ai
3. Rate limit local (15/h)
4. Rate limit global de OpenRouter
5. Headers faltantes (`HTTP-Referer`, `X-Title`)

### Emails no llegan
1. `BREVO_API_KEY` faltante (silent fail)
2. Sender no verificado en Brevo
3. SPF/DKIM/DMARC del dominio
4. Brevo rate limit

### Imágenes Sanity no cargan
1. Project ID/Dataset rotos
2. Falta `images.remotePatterns` en `next.config.mjs` con `cdn.sanity.io`

---

## 16. Comandos referencia

```bash
# Dev
npm run dev          # puerto 3000
npm run build
npm start
npm run lint
npm run migrate:sanity   # solo una vez, ya ejecutado

# Git workflow
git status
git log --oneline -20
git add . && git commit -m "feat: ..." && git push origin main

# Supabase CLI (nunca MCP)
supabase db push
supabase functions deploy <name>
supabase link --project-ref <ref>
```

---

## 17. Convenciones de código

### TypeScript
- Tipos explícitos en APIs públicas, inferencia en locales
- `interface` para shapes, `type` para uniones
- Sin `any` → usar `unknown` + narrowing
- String literal unions sobre enums
- Inmutabilidad — spread, no mutación

### React / Next.js
- Funciones nombradas, PascalCase
- `interface ComponentNameProps`
- Sin `React.FC`
- Server Components por default, `'use client'` solo si hace falta
- URL state vía searchParams, no `useState`

### Naming
- Variables/funciones: `camelCase`
- Booleans: `is`/`has`/`should`/`can`
- Components/types: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Custom hooks: `useXxx`

### Errores
- `try/catch` con narrowing de `unknown`
- Sin `console.log` en producción (`console.error` ok)
- Mensajes user-friendly en UI, detalles técnicos en logs

### Tamaños
- Funciones: <50 líneas
- Archivos: <800 líneas (objetivo 200-400)

---

**Fin del archivo. Cualquier sesión nueva de Claude lee esto y arranca con todo el contexto.**
