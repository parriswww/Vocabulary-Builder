import type { ComponentType } from 'react'
import manifestData from './slides-manifest.json'

export interface SlideEntry {
  id: string
  position: number
  filepath: string
  title: string
  module: string
}

export const manifest: { slides: SlideEntry[] } = manifestData

// Eager-import every slide component
const modules = import.meta.glob('./slides/*.tsx', { eager: true }) as Record<
  string,
  { default: ComponentType }
>

export function getSlideComponent(filepath: string): ComponentType | null {
  const key = `./${filepath}.tsx`
  return modules[key]?.default ?? null
}

export function getAllSlides(): SlideEntry[] {
  return manifest.slides
}
