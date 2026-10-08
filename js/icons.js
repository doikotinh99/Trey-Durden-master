/**
 * Trey Durden - SVG Icon Sprite System
 * Provides unified, scalable vector icons across all pages.
 * All icons support `currentColor` inheritance for flawless color synchronization.
 */

const SVG_ICONS_SPRITE = `
<svg id="svgSpriteDefs" style="display:none;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Solid Fill Icons (use fill="currentColor") -->
    <symbol id="icon-fire" viewBox="0 0 24 24">
      <path d="M12 23c-4.97 0-9-4.03-9-9 0-4.12 2.76-7.86 5.86-10.37.78-.63 1.93-.15 2.06.85.22 1.69 1.08 3.19 2.08 4.26.17-2.19 1.13-4.22 2.72-5.74.83-.8 2.2-.28 2.3.87.28 3.09 1.76 5.13 2.98 6.42C22.04 12.43 23 14.15 23 16c0 3.86-3.14 7-7 7h-4zm0-2c3.87 0 7-3.13 7-7 0-1.42-.72-2.77-1.63-3.73-1.47-1.56-2.58-3.69-2.84-6.32-1.07 1.34-1.78 3.03-1.87 4.88-.06 1.1-.92 1.98-2.02 2.03-1.22.06-2.29-.86-2.39-2.08-.03-.39-.12-.76-.24-1.12-2.13 2.03-4.01 4.79-4.01 7.34 0 3.87 3.13 7 7 7zm-1-3c-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83.55-.2 1.13.25 1.09.83-.07 1.07.78 1.98 1.86 2 .46.01.83.38.83.84 0 1.19-.88 2.16-2.04 2.16h-.74z" fill="currentColor"/>
    </symbol>

    <symbol id="icon-bolt" viewBox="0 0 24 24">
      <path d="M11 21h-1l1-7H7.5c-.88 0-1.33-1.06-.71-1.69L14.5 3h1l-1 7h3.5c.88 0 1.33 1.06.71 1.69L11 21z" fill="currentColor"/>
    </symbol>

    <symbol id="icon-shield" viewBox="0 0 24 24">
      <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.25 14.25l-3.75-3.75 1.41-1.41 2.34 2.34 5.34-5.34 1.41 1.41-6.75 6.75z" fill="currentColor"/>
    </symbol>

    <symbol id="icon-droplet" viewBox="0 0 24 24">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69zm0 3.83L8.05 10.46a5.5 5.5 0 1 0 7.78 0L12 6.52z" fill="currentColor"/>
    </symbol>

    <symbol id="icon-sparkles" viewBox="0 0 24 24">
      <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4zm7 13l1.2 2.8L23 19l-2.8 1.2L19 23l-1.2-2.8L15 19l2.8-1.2zM5 16l1 2.5L8.5 19.5 6 20.5 5 23l-1-2.5L1.5 19.5 4 18.5z" fill="currentColor"/>
    </symbol>

    <symbol id="icon-tools" viewBox="0 0 24 24">
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.5 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" fill="currentColor"/>
    </symbol>

    <symbol id="icon-phone" viewBox="0 0 24 24">
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-2.2 2.2a15.05 15.05 0 0 1-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.35 8.5 5.16 8.5 3.93 8.5 3.42 8.08 3 7.57 3H4.06C3.55 3 3 3.42 3 3.93 3 13.36 10.64 21 20.01 21c.51 0 .99-.55.99-1.06v-3.56c0-.51-.42-.99-.99-.99z" fill="currentColor"/>
    </symbol>

    <symbol id="icon-map-pin" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" fill="currentColor"/>
    </symbol>

    <symbol id="icon-star" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/>
    </symbol>

    <symbol id="icon-alert" viewBox="0 0 24 24">
      <path d="M12 2L1 21h22L12 2zm0 3.5L20.25 19H3.75L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" fill="currentColor"/>
    </symbol>

    <symbol id="icon-home" viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/>
    </symbol>

    <symbol id="icon-zap" viewBox="0 0 24 24">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor"/>
    </symbol>

    <!-- Stroke Outline Icons (use fill="none" stroke="currentColor") -->
    <symbol id="icon-snowflake" viewBox="0 0 24 24">
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93M12 6l2-2m-4 0l2 2m0 12l2 2m-4 0l2-2m-6-6l-2-2m0 4l2-2m12 0l2-2m0 4l-2-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-clock" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
      <polyline points="12,7 12,12 15.5,14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-check" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-check-circle" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
      <polyline points="8,12 11,15 16,9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-headphones" viewBox="0 0 24 24">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" fill="currentColor"/>
    </symbol>

    <symbol id="icon-dollar" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M12 6v12M15 9.5c0-1.38-1.34-2.5-3-2.5s-3 1.12-3 2.5 1.34 2.5 3 2.5 3 1.12 3 2.5-1.34 2.5-3 2.5-3-1.12-3-2.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-award" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <polyline points="8.21,13.89 7,22 12,19 17,22 15.79,13.88" fill="none" stroke="currentColor" stroke-width="2"/>
    </symbol>

    <symbol id="icon-building" viewBox="0 0 24 24">
      <path d="M4 20V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M2 20h20M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-search" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-close" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="6" y1="6" x2="18" y2="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-chevron-down" viewBox="0 0 24 24">
      <polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-chevron-right" viewBox="0 0 24 24">
      <polyline points="9 18 15 12 9 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-arrow-right" viewBox="0 0 24 24">
      <line x1="5" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <polyline points="12 5 19 12 12 19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-arrow-left" viewBox="0 0 24 24">
      <line x1="19" y1="12" x2="5" y2="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <polyline points="12 19 5 12 12 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-grid" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="14" y="3" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="14" y="14" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="3" y="14" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/>
    </symbol>

    <symbol id="icon-list" viewBox="0 0 24 24">
      <line x1="8" y1="6" x2="21" y2="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="8" y1="12" x2="21" y2="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="8" y1="18" x2="21" y2="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="3" y1="6" x2="3.01" y2="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="3" y1="12" x2="3.01" y2="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="3" y1="18" x2="3.01" y2="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-package" viewBox="0 0 24 24">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" stroke="currentColor" stroke-width="2"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-filter" viewBox="0 0 24 24">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-ruler" viewBox="0 0 24 24">
      <rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="6" y1="7" x2="6" y2="12" stroke="currentColor" stroke-width="2"/>
      <line x1="10" y1="7" x2="10" y2="10" stroke="currentColor" stroke-width="2"/>
      <line x1="14" y1="7" x2="14" y2="12" stroke="currentColor" stroke-width="2"/>
      <line x1="18" y1="7" x2="18" y2="10" stroke="currentColor" stroke-width="2"/>
    </symbol>

    <symbol id="icon-sliders" viewBox="0 0 24 24">
      <line x1="4" y1="21" x2="4" y2="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="4" y1="10" x2="4" y2="3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="21" x2="12" y2="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="8" x2="12" y2="3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="20" y1="21" x2="20" y2="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="20" y1="12" x2="20" y2="3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="1" y1="14" x2="7" y2="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="9" y1="8" x2="15" y2="8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="17" y1="16" x2="23" y2="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-truck" viewBox="0 0 24 24">
      <rect x="1" y="3" width="15" height="13" rx="1" fill="none" stroke="currentColor" stroke-width="2"/>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="5.5" cy="18.5" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="18.5" cy="18.5" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/>
    </symbol>

    <symbol id="icon-leaf" viewBox="0 0 24 24">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-cpu" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="9" y="9" width="6" height="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-calendar" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
    </symbol>

    <symbol id="icon-volume" viewBox="0 0 24 24">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-fan" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M12 9V2a4 4 0 0 1 4 4v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M15 12h7a4 4 0 0 1-4 4h-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 15v7a4 4 0 0 1-4-4v-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M9 12H2a4 4 0 0 1 4-4h3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-info" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-wind" viewBox="0 0 24 24">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-wifi" viewBox="0 0 24 24">
      <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-plus" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-minus" viewBox="0 0 24 24">
      <line x1="5" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-gear" viewBox="0 0 24 24">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-mail" viewBox="0 0 24 24">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-globe" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="currentColor" stroke-width="2"/>
    </symbol>

    <symbol id="icon-user" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/>
    </symbol>

    <symbol id="icon-thermometer" viewBox="0 0 24 24">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-external-link" viewBox="0 0 24 24">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="15 3 21 3 21 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="icon-facebook" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor"/>
    </symbol>

    <symbol id="icon-instagram" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="icon-linkedin" viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="currentColor"/>
      <rect x="2" y="9" width="4" height="12" fill="currentColor"/>
      <circle cx="4" cy="4" r="2" fill="currentColor"/>
    </symbol>
  </defs>
</svg>
`;

function initIcons() {
  const existingSprite = document.getElementById('svgSpriteDefs');
  if (!existingSprite) {
    const div = document.createElement('div');
    div.innerHTML = SVG_ICONS_SPRITE;
    if (document.body) {
      document.body.insertAdjacentElement('afterbegin', div.firstElementChild);
    }
  }
}

if (typeof window !== 'undefined') {
  window.SVG_ICONS_SPRITE = SVG_ICONS_SPRITE;
  window.initIcons = initIcons;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIcons);
  } else {
    initIcons();
  }
}
