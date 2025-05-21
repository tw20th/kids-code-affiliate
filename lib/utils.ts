// lib/utils.ts
import slugifyLib from 'slugify'

export function slugify(text: string): string {
  return slugifyLib(text, {
    lower: true,
    strict: true, // ← 日本語など除外
    trim: true,
  })
}
