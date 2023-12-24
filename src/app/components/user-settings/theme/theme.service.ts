import {DOCUMENT} from "@angular/common";
import {inject, Injectable, RendererFactory2} from "@angular/core";
import {AMOUNTS, DEFAULT_COLORS} from "./theme.const";


@Injectable({ providedIn: 'root' })
export class ThemeService {
  document = inject(DOCUMENT);
  renderer = inject(RendererFactory2).createRenderer(null, null);

  theme!: Record<string, string>;
  style!: HTMLStyleElement;
  colors!: COLORS;

  initTheme() {
    this.colors = getColors();
    this.createTheme();
    this.createStyle();
  }

  setColors(colors: Partial<COLORS>) {
    this.colors = Object.assign(DEFAULT_COLORS, colors);

    setColors(this.colors);

    this.createTheme();
    this.createStyle();
  }

  createTheme() {
    let theme: Record<string, string> = {};
    for (const color in this.colors) {
      Object.assign(
        theme,
        this.createPalette(color, this.colors[color as keyof COLORS])
      )
    }

    this.theme = theme
  }

  createPalette(color: string, value: string) {
    const prefix = 'app-';
    const palette: Record<string, string> = {};
    for (const amount of AMOUNTS) {
      if (amount === 0) {
        palette[`${prefix}${color}`] = value;
      } else {
        palette[`${prefix}${color}${this.createSuffix(amount)}`] = toHex(
          mixColors(amount > 0 ? '#ffffff' : '#cccccc', value, Math.abs(amount))
        );
      }
    }

    return palette
  }

  createStyle() {
    if (this.style) this.renderer.removeChild(this.style.parentNode, this.style);

    const styles = Object.entries(this.theme)
      .map((x) => `${x[0]}: ${x[1]};`)
      .join('');
    this.style = this.renderer.createElement('style');
    this.style.innerHTML = `.app-theme-colors{${styles}}`;
    this.renderer.addClass(this.document.documentElement, 'app-theme-colors');
    this.document.documentElement.getElementsByTagName('head')[0].appendChild(this.style);

  }

  createSuffix(value: number): string {
    if (value > 0) {
      return `-${Math.abs(value * 1000)}`;
    } else if (value < 0) {
      return `-a${Math.abs(value * 1000)}`;
    }
    return '';
  }
}

type COLORS = {
  text: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  background: string;
}

function getColors(): COLORS {
  const str = localStorage.getItem('theme');
  return Object.assign(DEFAULT_COLORS, str ? JSON.parse(str) : {});
}

function setColors(colors: COLORS) {
  localStorage.setItem('theme', JSON.stringify(colors));
}


function mixColors(color1: string, color2: string, weight: number) {
  let rgb1 = toRgb(color1);
  let rgb2 = toRgb(color2);
  let weight1 = weight;
  let weight2 = 1 - weight;
  let result: { r: number; g: number; b: number };

  const inRange = (num: number) => {
    return num > 255 ? 255 : num < 0 ? 0 : num;
  };

  result = {
    r: inRange(Math.round(rgb1.r * weight1 + rgb2.r * weight2)),
    g: inRange(Math.round(rgb1.g * weight1 + rgb2.g * weight2)),
    b: inRange(Math.round(rgb1.b * weight1 + rgb2.b * weight2))
  };

  return result;
}

function toHex(rgb: { r: number; g: number; b: number }) {
  return '#' + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
}

function toRgb(hex: string) {
  if (hex.indexOf('#') == 0) hex = hex.slice(1);
  let num = parseInt(hex, 16);
  let r = num >> 16;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let g = (num >> 8) & 0x00ff;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  let b = num & 0x0000ff;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  return { r: r, g: g, b: b };
}
