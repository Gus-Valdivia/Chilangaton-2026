<!doctype html>
<html lang="es-MX">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Directorio de tianguis de la CDMX</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Nunito+Sans:wght@400;600;700&display=swap">
  <!-- Si usas Leaflet, enlaza aquí su CSS ANTES del bloque <style> -->
  <style>
/* ==========================================================================
   Tianguis CDMX · estilos
   1 Tokens · 2 Base · 3 Botones y formularios · 4 Filtros desplegables y etiquetas
   5 Encabezado · 6 Sidebar y tarjetas · 7 Mapa y marcadores · 8 Layout
   9 Integración con Leaflet (opcional)
   Metodología: BEM (bloque__elemento--modificador). Sin !important.
   ========================================================================== */

/* 1. TOKENS ---------------------------------------------------------------- */
:root {
  /* Marca (propuesta inicial: cambia solo estas líneas) */
  --brand-azalea: #A83278;
  --brand-vivid: #8F00FF;
  --brand-deep: #4B0082;
  --brand-pink-vivid: #D6007A;   /* valor propuesto: 5.1:1 sobre blanco */
  --brand-pink-medium: #F06FAE;  /* solo rellenos; con texto oscuro encima (6:1) */

  /* Neutros */
  --color-white: #FFFFFF;
  --color-bg: #F8F6FB;
  --color-bg-alt: #F0EAF7;
  --color-text: #241A2D;
  --color-text-muted: #62586B;
  --color-border: #E4DCEB;         /* decorativo: separa tarjetas */
  --color-border-strong: #7A6F85;  /* controles: 4.7:1 sobre blanco (WCAG 1.4.11) */

  /* Estado */
  --color-success: #287A52;
  --color-warning: #946200;
  --color-error: #B42336;
  --color-error-bg: #FBEBED;

  /* Roles derivados de la marca */
  --color-heading: var(--brand-deep);
  --color-accent: var(--brand-azalea);
  --color-accent-soft: color-mix(in srgb, var(--brand-azalea) 10%, #fff);
  --color-highlight: var(--brand-pink-vivid);
  --color-highlight-soft: color-mix(in srgb, var(--brand-pink-medium) 16%, #fff);
  --color-primary: var(--brand-vivid);
  --color-primary-hover: color-mix(in srgb, var(--brand-vivid) 85%, #000);
  --color-primary-active: color-mix(in srgb, var(--brand-vivid) 70%, #000);
  --color-primary-soft: color-mix(in srgb, var(--brand-vivid) 10%, #fff);
  --color-focus: var(--brand-vivid);

  /* Tipografía */
  --font-sans: "Nunito Sans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-serif: Lora, Georgia, "Times New Roman", serif;
  --text-sm: 0.9375rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.375rem;
  --text-2xl: 1.75rem;
  --leading-tight: 1.25;
  --leading-base: 1.6;
  --weight-regular: 400;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* Espaciado (base 4 px) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;

  /* Forma y elevación */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-pill: 999px;
  --shadow-sm: 0 1px 2px rgb(36 26 45 / 0.08);
  --shadow-md: 0 3px 10px rgb(36 26 45 / 0.16);
  --shadow-lg: 0 8px 24px rgb(36 26 45 / 0.18);

  /* Dimensiones */
  --sidebar-w: 24rem;
  --header-h: 4.5rem;          /* incluye la franja inferior de 4 px */
  --touch-min: 2.75rem;        /* 44 px */
  --map-h-mobile: 55svh;

  /* Capas (Leaflet usa 400-1000 internamente) */
  --z-map-ui: 800;
  --z-dropdown: 900;
  --z-header: 1100;
  --z-modal: 1200;
  --z-skip: 1300;

  /* Movimiento y estados */
  --transition-fast: 120ms ease;
  --transition-base: 200ms ease;
  --hover-scale: 1.1;
  --focus-width: 3px;
  --focus-offset: 2px;

  /* Puntos de quiebre: referencia, var() no funciona dentro de @media.
     md = 48rem (tableta) · lg = 64rem (escritorio) */
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-fast: 0s;
    --transition-base: 0s;
    --hover-scale: 1;
  }
}

/* 2. BASE ------------------------------------------------------------------ */
*, *::before, *::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; scroll-padding-top: var(--header-h); }

body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--leading-base);
  color: var(--color-text);
  background: var(--color-bg);
  overflow-wrap: break-word;
}

h1, h2, h3, h4 {
  margin: 0;
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  color: var(--color-heading);
}
h1 { font-size: var(--text-2xl); }
h2 { font-size: var(--text-xl); }
h3 { font-size: var(--text-lg); }
h4 { font-size: var(--text-base); }

p, dl, dd, ul { margin: 0; }
ul { padding: 0; list-style: none; }
img, svg { max-width: 100%; }

a { color: var(--color-primary); text-underline-offset: 0.2em; }
a:hover { color: var(--color-primary-hover); }

:focus-visible {
  outline: var(--focus-width) solid var(--color-focus);
  outline-offset: var(--focus-offset);
}

.skip-link {
  position: absolute;
  top: -4rem;
  left: var(--space-2);
  z-index: var(--z-skip);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--color-heading);
  color: var(--color-white);
  font-weight: var(--weight-bold);
}
.skip-link:focus { top: var(--space-2); color: var(--color-white); }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* 3. BOTONES Y FORMULARIOS ------------------------------------------------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: var(--touch-min);
  padding: var(--space-2) var(--space-4);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  font: inherit;
  font-weight: var(--weight-bold);
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}
.btn--primary { background: var(--color-primary); color: var(--color-white); }          /* 5.8:1 */
.btn--primary:hover { background: var(--color-primary-hover); color: var(--color-white); }
.btn--primary:active { background: var(--color-primary-active); }
.btn--secondary { background: var(--color-white); border-color: var(--color-primary); color: var(--color-primary); }
.btn--secondary:hover { background: var(--color-primary-soft); border-color: var(--color-primary-hover); color: var(--color-primary-hover); }
.btn--secondary:active { background: color-mix(in srgb, var(--brand-vivid) 20%, #fff); }
.btn--block { display: flex; width: 100%; }
.btn:disabled, .btn[aria-disabled="true"] { opacity: 0.55; cursor: not-allowed; }

.field { display: grid; gap: var(--space-2); }
.field__label { font-weight: var(--weight-semibold); }
.field__hint { font-size: var(--text-sm); color: var(--color-text-muted); }

.input, .select {
  width: 100%;
  min-height: var(--touch-min);
  padding: var(--space-2) var(--space-3);
  border: 2px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-white);
  color: var(--color-text);
  font: inherit;
}
.input:hover, .select:hover { border-color: var(--color-heading); }
.input[aria-invalid="true"], .select[aria-invalid="true"] { border-color: var(--color-error); }

/* 4. FILTROS Y ETIQUETAS --------------------------------------------------- */
/* Barra de filtros: listas desplegables con <details>. Las opciones son
   casillas nativas (multi-selección); el estado se ve con ✓ y relleno, no solo color. */
.filterbar {
  position: relative;
  z-index: var(--z-dropdown);
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
}
.filterbar__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-3);
  padding: var(--space-2) var(--space-4);
}
.filterbar__label { font-weight: var(--weight-bold); color: var(--color-heading); }
.filterbar__reset { margin-inline-start: auto; }

.dropdown__toggle {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-height: var(--touch-min);
  padding: 0 var(--space-4);
  border: 2px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-white);
  color: var(--color-text);
  font-weight: var(--weight-semibold);
  list-style: none;
  cursor: pointer;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}
.dropdown__toggle::-webkit-details-marker { display: none; }
.dropdown__toggle::after {
  content: "";
  width: 0.5rem;
  height: 0.5rem;
  margin: -0.25rem 0 0 var(--space-1);
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg);
  transition: transform var(--transition-fast);
}
.dropdown[open] > .dropdown__toggle::after { margin-top: 0.25rem; transform: rotate(225deg); }
.dropdown__toggle:hover,
.dropdown[open] > .dropdown__toggle { border-color: var(--color-primary); background: var(--color-primary-soft); }
.dropdown:has(:checked) > .dropdown__toggle { border-color: var(--color-primary); color: var(--color-heading); }
.dropdown:has(:checked) > .dropdown__toggle::before { content: "\2713"; font-weight: var(--weight-bold); }

/* Móvil: el panel ocupa el ancho de la barra para no salirse de la pantalla */
.dropdown__panel {
  position: absolute;
  top: 100%;
  left: var(--space-3);
  right: var(--space-3);
  z-index: var(--z-dropdown);
  max-height: min(60dvh, 24rem);
  padding: var(--space-2);
  overflow-y: auto;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-md);
  background: var(--color-white);
  box-shadow: var(--shadow-lg);
}
.dropdown__group { min-width: 0; margin: 0; padding: 0; border: 0; }
.dropdown__list { display: grid; gap: var(--space-1); }
.option {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: var(--touch-min);
  padding: 0 var(--space-3);
  border-radius: var(--radius-sm);
  cursor: pointer;
}
.option:hover { background: var(--color-primary-soft); }
.option:has(.option__input:checked) { background: var(--color-primary-soft); font-weight: var(--weight-bold); }
.option__input { flex: none; width: 1.25rem; height: 1.25rem; margin: 0; accent-color: var(--color-primary); }

@media (min-width: 48rem) {
  .dropdown { position: relative; }
  .dropdown__panel {
    top: calc(100% + var(--space-1));
    left: 0;
    right: auto;
    width: max-content;
    min-width: 100%;
    max-width: 22rem;
  }
  .dropdown__panel--wide { width: 30rem; max-width: calc(100vw - 2rem); }
  .dropdown__list--cols { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

.tag {
  display: inline-flex;
  align-items: center;
  min-height: 1.75rem;
  padding: 0 var(--space-3);
  border-radius: var(--radius-pill);
  background: var(--color-primary-soft);
  color: var(--color-heading);
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
}
.tag--accent { background: var(--brand-pink-medium); color: var(--color-text); }
.tag--selected { background: var(--color-highlight); color: var(--color-white); }

.message {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-4);
  border: 2px solid var(--color-border);
  border-left: 6px solid var(--color-primary);
  border-radius: var(--radius-md);
  background: var(--color-white);
}
.message__title { font-weight: var(--weight-bold); color: var(--color-heading); }
.message__text { font-size: var(--text-sm); color: var(--color-text-muted); }
.message--error { border-color: var(--color-error); background: var(--color-error-bg); }
.message__title--error { color: var(--color-error); }

/* 5. ENCABEZADO Y NAVEGACIÓN ----------------------------------------------- */
.site-header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  background: var(--color-heading);
  border-bottom: 4px solid var(--color-highlight);
}
.site-header :focus-visible { outline-color: var(--color-white); }
.site-header__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1) var(--space-5);
  min-height: calc(var(--header-h) - 4px);
  padding: var(--space-2) var(--space-4);
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-white);
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-weight: var(--weight-bold);
  text-decoration: none;
}
.brand:hover { color: var(--color-white); }
.brand__mark {
  width: 1.75rem;
  height: 1.75rem;
  border: 3px solid var(--color-white);
  border-radius: 50%;
  background: var(--color-accent);
}
.nav { order: 3; flex-basis: 100%; }
.nav__list { display: flex; flex-wrap: wrap; gap: var(--space-1); }
.nav__link {
  display: inline-flex;
  align-items: center;
  min-height: var(--touch-min);
  padding: 0 var(--space-3);
  border-bottom: 3px solid transparent;
  color: var(--color-white);
  font-weight: var(--weight-semibold);
  text-decoration: none;
}
.nav__link:hover { background: color-mix(in srgb, var(--color-white) 16%, transparent); color: var(--color-white); }
.nav__link[aria-current="page"] { border-bottom-color: var(--brand-pink-medium); font-weight: var(--weight-bold); }

/* 6. SIDEBAR, TARJETAS DE TIANGUIS Y NEGOCIOS ------------------------------ */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-4);
  border-top: 4px solid var(--color-primary);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  background: var(--color-bg-alt);
}
.sidebar__title { font-family: var(--font-serif); }
.sidebar__intro, .sidebar__count { color: var(--color-text-muted); }

.tianguis-list, .business-list { display: grid; gap: var(--space-3); }

.tianguis-card {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-white);
  box-shadow: var(--shadow-sm);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}
.tianguis-card:hover { border-color: var(--color-primary); box-shadow: var(--shadow-md); }
.tianguis-card--selected,
.tianguis-card--selected:hover { border-color: var(--color-highlight); background: var(--color-highlight-soft); }
.tianguis-card__head { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: var(--space-2); }
.tianguis-card__title { font-size: var(--text-lg); }
.tianguis-card__place { color: var(--color-text-muted); font-weight: var(--weight-semibold); }

.meta { display: grid; grid-template-columns: auto 1fr; gap: var(--space-1) var(--space-3); font-size: var(--text-sm); }
.meta__term { font-weight: var(--weight-bold); color: var(--color-heading); }
.meta__value { margin: 0; }

.detail { display: grid; gap: var(--space-4); }
.detail__title { font-family: var(--font-serif); font-size: var(--text-2xl); }

.business-card {
  display: grid;
  justify-items: start;
  gap: var(--space-2);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-white);
}
.business-card__name { font-size: var(--text-lg); }
.business-card__text { color: var(--color-text-muted); }

/* 7. MAPA Y MARCADORES ----------------------------------------------------- */
.map { position: relative; z-index: 0; min-height: var(--map-h-mobile); background: var(--color-bg-alt); }
.map__canvas { position: absolute; inset: 0; }
.map__placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: var(--space-5);
  color: var(--color-text-muted);
  text-align: center;
}

.legend {
  --dot-size: 1.25rem;
  position: absolute;
  left: var(--space-3);
  bottom: var(--space-3);
  z-index: var(--z-map-ui);
  max-width: calc(100% - var(--space-6));
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: rgb(255 255 255 / 0.96);
  box-shadow: var(--shadow-md);
}
.legend__title { margin-bottom: var(--space-1); font-weight: var(--weight-bold); color: var(--color-heading); }
.legend__list { display: flex; flex-wrap: wrap; gap: var(--space-1) var(--space-4); }
.legend__item { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); }
.legend__cluster { flex: none; width: 1.75rem; height: 1.75rem; font-size: var(--text-sm); }

/* Marcador de tianguis. El contenedor mide ≥44 px (área táctil);
   el punto visible es más pequeño. No se fija position: lo gestiona Leaflet. */
.marker {
  display: grid;
  place-items: center;
  min-width: var(--touch-min);
  min-height: var(--touch-min);
  cursor: pointer;
}
.marker__dot {
  display: grid;
  flex: none;
  place-items: center;
  width: var(--dot-size, 1.75rem);
  height: var(--dot-size, 1.75rem);
  border: 3px solid var(--color-white);
  border-radius: 50%;
  background: var(--color-accent);   /* 6.2:1 contra el borde blanco */
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
.marker:hover .marker__dot { transform: scale(var(--hover-scale)); }

/* Seleccionado: más grande, anillo Deep Violet y punto central (no solo color) */
.marker--selected .marker__dot,
.marker__dot--selected {
  width: calc(var(--dot-size, 1.75rem) * 1.3);
  height: calc(var(--dot-size, 1.75rem) * 1.3);
  box-shadow: 0 0 0 3px var(--color-heading), var(--shadow-md);
}
.marker--selected .marker__dot::after,
.marker__dot--selected::after {
  content: "";
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--color-white);
}
.marker:focus-visible { outline: none; }
.marker:focus-visible .marker__dot { box-shadow: 0 0 0 3px var(--color-white), 0 0 0 6px var(--color-focus); }

/* Grupo de marcadores cercanos */
.cluster { display: grid; place-items: center; min-width: var(--touch-min); min-height: var(--touch-min); cursor: pointer; }
.cluster__count {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border: 3px solid var(--color-white);
  border-radius: 50%;
  background: var(--color-heading);
  color: var(--color-white);
  font-weight: var(--weight-bold);
  box-shadow: var(--shadow-md);
}

/* 8. LAYOUT RESPONSIVE ----------------------------------------------------- */
.layout { display: grid; grid-template-columns: minmax(0, 1fr); }

/* Tableta (≥ 768 px): mapa arriba, tarjetas en dos columnas */
@media (min-width: 48rem) {
  .map { min-height: 60svh; }
  .tianguis-list, .business-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .legend__list { flex-direction: column; }
  .nav { order: 0; flex-basis: auto; }
}

/* Escritorio (≥ 1024 px): mapa y sidebar lado a lado, la sidebar se desplaza sola */
@media (min-width: 64rem) {
  body { display: flex; flex-direction: column; height: 100dvh; }
  .layout { flex: 1; min-height: 0; grid-template-columns: minmax(0, 1fr) var(--sidebar-w); grid-template-rows: minmax(0, 1fr); }
  .map { min-height: 0; }
  .sidebar { overflow-y: auto; border-top: 0; border-radius: 0; border-left: 4px solid var(--color-primary); }
  .tianguis-list, .business-list { grid-template-columns: minmax(0, 1fr); }
}

/* 9. INTEGRACIÓN CON LEAFLET (opcional) ------------------------------------
   Cargar leaflet.css ANTES de este archivo para que estas reglas prevalezcan. */
.map .leaflet-container { font-family: inherit; }
.map .leaflet-bar a {
  width: var(--touch-min);
  height: var(--touch-min);
  line-height: var(--touch-min);
  color: var(--color-heading);
  font-weight: var(--weight-bold);
}
  </style>
</head>
<body>
  <a class="skip-link" href="#mapa">Saltar al mapa</a>
  <a class="skip-link" href="#lista">Saltar a la lista de tianguis</a>

  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand" href="#"><span class="brand__mark" aria-hidden="true"></span>Tianguis CDMX</a>
      <nav class="nav" aria-label="Principal">
        <ul class="nav__list" role="list">
          <li><a class="nav__link" href="#" aria-current="page">Mapa</a></li>
          <li><a class="nav__link" href="#">Tianguis</a></li>
          <li><a class="nav__link" href="#">Negocios</a></li>
          <li><a class="nav__link" href="#">Ayuda</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <form class="filterbar" aria-label="Filtros de tianguis">
    <div class="filterbar__inner">
      <span class="filterbar__label">Filtrar por</span>

      <details class="dropdown">
        <summary class="dropdown__toggle">Categoría comercial</summary>
        <div class="dropdown__panel">
          <fieldset class="dropdown__group">
            <legend class="sr-only">Categoría comercial</legend>
            <ul class="dropdown__list" role="list">
              <li><label class="option"><input class="option__input" type="checkbox" name="categoria" value="alimentos"><span>Alimentos</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="categoria" value="ropa"><span>Ropa</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="categoria" value="calzado"><span>Calzado</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="categoria" value="hogar"><span>Hogar</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="categoria" value="artesanias"><span>Artesanías</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="categoria" value="tecnologia"><span>Tecnología</span></label></li>
            </ul>
          </fieldset>
        </div>
      </details>

      <details class="dropdown">
        <summary class="dropdown__toggle">Alcaldía</summary>
        <div class="dropdown__panel dropdown__panel--wide">
          <fieldset class="dropdown__group">
            <legend class="sr-only">Alcaldía</legend>
            <ul class="dropdown__list dropdown__list--cols" role="list">
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="alvaro-obregon"><span>Álvaro Obregón</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="azcapotzalco"><span>Azcapotzalco</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="benito-juarez"><span>Benito Juárez</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="coyoacan"><span>Coyoacán</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="cuajimalpa"><span>Cuajimalpa de Morelos</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="cuauhtemoc"><span>Cuauhtémoc</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="gustavo-a-madero"><span>Gustavo A. Madero</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="iztacalco"><span>Iztacalco</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="iztapalapa"><span>Iztapalapa</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="magdalena-contreras"><span>La Magdalena Contreras</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="miguel-hidalgo"><span>Miguel Hidalgo</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="milpa-alta"><span>Milpa Alta</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="tlahuac"><span>Tláhuac</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="tlalpan"><span>Tlalpan</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="venustiano-carranza"><span>Venustiano Carranza</span></label></li>
              <li><label class="option"><input class="option__input" type="checkbox" name="alcaldia" value="xochimilco"><span>Xochimilco</span></label></li>
            </ul>
          </fieldset>
        </div>
      </details>

      <button class="btn btn--secondary filterbar__reset" type="reset">Limpiar filtros</button>
    </div>
  </form>

  <main class="layout">
    <section class="map" id="mapa" aria-label="Mapa de tianguis" tabindex="-1">
      <!-- Elimina este párrafo cuando conectes la biblioteca de mapas -->
      <p class="map__placeholder">Aquí se mostrará el mapa interactivo de la Ciudad de México.</p>
      <div class="map__canvas" id="map"></div>

      <div class="legend" role="group" aria-labelledby="leyenda-titulo">
        <p class="legend__title" id="leyenda-titulo">Leyenda</p>
        <ul class="legend__list" role="list">
          <li class="legend__item"><span class="marker__dot" aria-hidden="true"></span>Un tianguis</li>
          <li class="legend__item"><span class="marker__dot marker__dot--selected" aria-hidden="true"></span>Tianguis seleccionado</li>
          <li class="legend__item"><span class="cluster__count legend__cluster" aria-hidden="true">8</span>Varios tianguis juntos</li>
        </ul>
      </div>
    </section>

    <aside class="sidebar" id="lista" aria-labelledby="sidebar-titulo" tabindex="-1">
      <div>
        <h1 class="sidebar__title" id="sidebar-titulo">Tianguis de la Ciudad de México</h1>
        <p class="sidebar__intro">Elige un tianguis para ver los negocios que tiene.</p>
      </div>

      <div class="message">
        <p class="message__title">Datos de demostración</p>
        <p class="message__text">Los tianguis de esta lista son ejemplos para probar el diseño. No son ubicaciones reales.</p>
      </div>

      <p class="sidebar__count" role="status">Mostrando 3 tianguis de ejemplo</p>

      <ul class="tianguis-list" role="list">
        <li>
          <!-- Estado "seleccionado": solo muestra el estilo; la lógica aún no está conectada -->
          <article class="tianguis-card tianguis-card--selected" aria-current="true">
            <div class="tianguis-card__head">
              <h2 class="tianguis-card__title" id="t1">Tianguis de ejemplo A</h2>
              <span class="tag tag--selected">Seleccionado</span>
            </div>
            <p class="tianguis-card__place">Coyoacán</p>
            <dl class="meta">
              <dt class="meta__term">Días</dt><dd class="meta__value">Sábado y domingo</dd>
              <dt class="meta__term">Horario</dt><dd class="meta__value">8:00 a 16:00</dd>
              <dt class="meta__term">Negocios</dt><dd class="meta__value">42 registrados</dd>
            </dl>
            <button class="btn btn--secondary" type="button" aria-describedby="t1">Ver detalles</button>
          </article>
        </li>
        <li>
          <article class="tianguis-card">
            <div class="tianguis-card__head"><h2 class="tianguis-card__title" id="t2">Tianguis de ejemplo B</h2></div>
            <p class="tianguis-card__place">Iztapalapa</p>
            <dl class="meta">
              <dt class="meta__term">Días</dt><dd class="meta__value">Miércoles</dd>
              <dt class="meta__term">Horario</dt><dd class="meta__value">9:00 a 17:00</dd>
              <dt class="meta__term">Negocios</dt><dd class="meta__value">118 registrados</dd>
            </dl>
            <button class="btn btn--secondary" type="button" aria-describedby="t2">Ver detalles</button>
          </article>
        </li>
        <li>
          <article class="tianguis-card">
            <div class="tianguis-card__head"><h2 class="tianguis-card__title" id="t3">Tianguis de ejemplo C</h2></div>
            <p class="tianguis-card__place">Tlalpan</p>
            <dl class="meta">
              <dt class="meta__term">Días</dt><dd class="meta__value">Domingo</dd>
              <dt class="meta__term">Horario</dt><dd class="meta__value">8:00 a 15:00</dd>
              <dt class="meta__term">Negocios</dt><dd class="meta__value">27 registrados</dd>
            </dl>
            <button class="btn btn--secondary" type="button" aria-describedby="t3">Ver detalles</button>
          </article>
        </li>
      </ul>
    </aside>
  </main>

  <!-- Plantillas para tu JS (no se muestran). Copia su contenido dentro de <body> para revisar estilos. -->
  <template id="tpl-detalle">
    <section class="detail" aria-labelledby="detalle-titulo">
      <button class="btn btn--secondary" type="button">← Volver al listado</button>
      <div>
        <h2 class="detail__title" id="detalle-titulo">Tianguis de ejemplo A</h2>
        <p class="tianguis-card__place">Coyoacán</p>
      </div>
      <h3>Negocios (2)</h3>
      <ul class="business-list" role="list">
        <li>
          <article class="business-card">
            <h4 class="business-card__name">Negocio de ejemplo 1</h4>
            <span class="tag">Alimentos</span>
            <p class="business-card__text">Descripción breve, si existe.</p>
            <p class="business-card__text">Ubicación: pasillo 3</p>
          </article>
        </li>
        <li>
          <article class="business-card">
            <h4 class="business-card__name">Negocio de ejemplo 2</h4>
            <span class="tag">Artesanías</span>
          </article>
        </li>
      </ul>
    </section>
  </template>

  <template id="tpl-mensajes">
    <div class="message" role="status">
      <p class="message__title">No hay tianguis con estos filtros</p>
      <p class="message__text">Quita algún filtro o usa “Limpiar filtros” para ver todos.</p>
    </div>
    <div class="message message--error" role="alert">
      <p class="message__title message__title--error">No pudimos cargar los tianguis</p>
      <p class="message__text">Revisa tu conexión e inténtalo de nuevo.</p>
    </div>
  </template>
  <script>
    // Solo abre y cierra las listas desplegables. El filtrado de datos aún no está implementado.
    (function () {
      var dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(function (d) {
        d.addEventListener('toggle', function () {
          if (d.open) dropdowns.forEach(function (o) { if (o !== d) o.open = false; });
        });
      });
      document.addEventListener('click', function (e) {
        dropdowns.forEach(function (d) { if (d.open && !d.contains(e.target)) d.open = false; });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        dropdowns.forEach(function (d) {
          if (d.open) { d.open = false; d.querySelector('summary').focus(); }
        });
      });
    })();
  </script>
</body>
</html>
