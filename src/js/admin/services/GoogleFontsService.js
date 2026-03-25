/**
 * Google Fonts Service
 * Fetches and caches Google Fonts from Official API
 *
 * File: src/js/admin/services/GoogleFontsService.js
 */

const CACHE_KEY = 'themeplus_google_fonts';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

const POPULAR_FONTS = [
  'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald', 'Raleway',
  'PT Sans', 'Lora', 'Roboto Condensed', 'Source Sans Pro', 'Poppins',
  'Merriweather', 'Ubuntu', 'Roboto Slab', 'Playfair Display', 'Noto Sans',
  'PT Serif', 'Mukta', 'Rubik', 'Work Sans', 'Noto Serif', 'Titillium Web',
  'Nunito', 'Nunito Sans', 'Heebo', 'Oxygen', 'Arimo', 'PT Sans Narrow',
  'Karla', 'Cabin', 'Bitter', 'Crimson Text', 'Anton', 'Abel',
  'Josefin Sans', 'Libre Baskerville', 'Quicksand', 'Archivo', 'Hind',
  'Inconsolata', 'Dosis', 'Bebas Neue', 'Libre Franklin', 'Exo 2',
  'Barlow', 'Prompt', 'Asap', 'Varela Round', 'Inter', 'DM Sans', 'Manrope',
];

class GoogleFontsService {
  constructor() {
    this.fonts = [];
    this.loading = false;
    this.loadedFonts = new Set();
  }

  getCachedFonts() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const data = JSON.parse(cached);
      const now = Date.now();

      if (now - data.timestamp < CACHE_DURATION) {
        return data.fonts;
      }

      localStorage.removeItem(CACHE_KEY);
      return null;
    } catch (error) {
      return null;
    }
  }

  cacheFonts(fonts) {
    try {
      const data = {
        fonts: fonts,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      // Silent fail
    }
  }

  async fetchFromJSON() {
    const jsonUrl = window.themePlusData?.googleFontsUrl;

    if (!jsonUrl) {
      return POPULAR_FONTS;
    }

    try {
      const response = await fetch(jsonUrl);

      if (!response.ok) {
        throw new Error('Failed to load fonts JSON');
      }

      const data = await response.json();

      // Handle both trimmed format [{family, variants, category}]
      // and raw API format {items: [...]}
      const items = Array.isArray(data) ? data : data.items;

      return items.map(item => item.family);
    } catch (error) {
      console.warn('Google Fonts JSON failed, using fallback:', error);
      return POPULAR_FONTS;
    }
  }

  async loadFonts() {
    if (this.loading) {
      while (this.loading) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return this.fonts;
    }

    const cached = this.getCachedFonts();
    if (cached) {
      this.fonts = cached;
      return this.fonts;
    }

    this.loading = true;

    try {
      this.fonts = await this.fetchFromJSON();
      this.cacheFonts(this.fonts);
    } catch (error) {
      this.fonts = POPULAR_FONTS;
    } finally {
      this.loading = false;
    }

    return this.fonts;
  }

  async getFonts() {
    if (this.fonts.length > 0) {
      return this.fonts;
    }
    return await this.loadFonts();
  }

  loadFontPreview(fontFamily, subsets = ['latin']) {
    const fontKey = `${fontFamily}-${Array.isArray(subsets) ? subsets.join(',') : 'latin'}`;

    if (this.loadedFonts.has(fontKey)) {
      return;
    }

    const linkId = `google-font-${fontFamily.replace(/\s+/g, '-').toLowerCase()}`;
    const fontName = fontFamily.replace(/\s+/g, '+');
    const subsetsParam = Array.isArray(subsets) && subsets.length > 0
      ? `&subset=${subsets.join(',')}`
      : '';

    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;500;600;700&display=swap${subsetsParam}`;

    const existingLink = document.getElementById(linkId);
    if (existingLink) {
      existingLink.href = fontUrl;
      this.loadedFonts.add(fontKey);
      return;
    }

    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = fontUrl;

    document.head.appendChild(link);
    this.loadedFonts.add(fontKey);
  }

  clearCache() {
    localStorage.removeItem(CACHE_KEY);
    this.fonts = [];
    this.loadedFonts.clear();
  }
}

export default new GoogleFontsService();