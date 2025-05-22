import slugifyLib from "slugify";

/**
 * クラス名を結合するユーティリティ関数（Tailwindなどで便利）
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * スラッグ化ユーティリティ関数（日本語除外・小文字化）
 */
export function slugify(text: string): string {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}
