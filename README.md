# Involucrarnos — Sitio web

Sitio estático listo para deploy en Vercel. Sin frameworks, sin dependencias — solo HTML y CSS.

---

## Estructura de archivos

```
involucrarnos/
├── index.html               ← Home: todas las secciones del sitio
├── vercel.json              ← Configuración de Vercel (no tocar)
└── articulos/
    ├── _TEMPLATE.html       ← Plantilla para nuevos artículos
    └── gobernar-mejor-es-honrar-la-democracia.html
```

---

## Cómo agregar un artículo nuevo

### Paso 1 — Crear el archivo

Duplicar `articulos/_TEMPLATE.html` y renombrarlo:

```
articulos/nombre-del-articulo.html
```

Convención de nombres:
- Todo en minúsculas
- Palabras separadas por guiones `-`
- Sin tildes ni ñ
- Ejemplo: `bonos-verdes-tucuman.html`

### Paso 2 — Completar el contenido

Abrir el archivo nuevo y buscar las marcas `✏️ CAMBIAR:`. Son exactamente:

| Campo | Dónde | Qué poner |
|-------|-------|-----------|
| `<title>` | `<head>` | Título del artículo |
| `<meta name="description">` | `<head>` | Bajada (1–2 oraciones) |
| `article-tag` | Header | Categoría (ej: Democracia) |
| `article-date` | Header | Mes y año (ej: Mayo 2026) |
| `<h1>` | Header | Título completo |
| `article-bajada` | Header | Bajada del artículo |
| `article-body` | Cuerpo | Texto del artículo |
| `author-name` | Sidebar | Nombre del autor |
| `author-role` | Sidebar | Cargo / rol |

Estructura del cuerpo (`article-body`):

```html
<p>Párrafo normal.</p>

<h2>Título de sección</h2>

<p>Párrafo de la sección.</p>

<blockquote>
  <p>Frase clave o cita importante.</p>
</blockquote>

<p><strong>Texto en negrita</strong> dentro de un párrafo.</p>
```

### Paso 3 — Agregar la card en index.html

Abrir `index.html`, buscar la sección de cards y duplicar uno de los bloques `<div class="card card-placeholder">`. Cambiar:
- El `href` al archivo nuevo
- La clase: sacar `card-placeholder` y convertirlo en `<a class="card">`
- Título, descripción, tag y fecha

### Paso 4 — Subir a Vercel

Hacer commit y push al repositorio. Vercel detecta el cambio y publica automáticamente en minutos.

---

## Pendientes antes de lanzar

- [ ] Reemplazar el `href="#"` del botón WhatsApp con el link real del grupo
- [ ] Integrar formulario de email con Brevo (embed form en la sección Sumate)
- [ ] Cargar los logos como archivos locales (hoy van desde Imgur)

---

## Deploy en Vercel — primera vez

1. Subir esta carpeta a un repositorio en GitHub
2. Ir a [vercel.com](https://vercel.com) → "Add New Project" → importar el repo
3. Vercel detecta que es HTML estático — hacer clic en "Deploy" sin cambiar nada
4. Para conectar `involucrarnos.com.ar`: ir a Settings → Domains → agregar el dominio

Tiempo estimado: 5 minutos.

---

## Paleta de colores

| Variable | Hex | Uso |
|----------|-----|-----|
| `--azul` | `#2a2f76` | Principal, fondos hero |
| `--azul-dark` | `#1e2260` | Nav, footer |
| `--dorado` | `#C8A96A` | Acento, CTAs |
| `--crema` | `#f7f4ef` | Fondo secciones alternas |
| `--texto` | `#1a1a2e` | Texto principal |

## Tipografías

- **Nunito** — títulos y headings (700, 800, 900)
- **Inter** — cuerpo, UI, labels
- **Lora** — cuerpo de artículos (serif)
