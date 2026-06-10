import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina classes Tailwind com segurança.
 * twMerge resolve conflitos (ex: bg-white + bg-gray-100 → bg-gray-100 vence).
 * clsx resolve condicionais (ex: { 'rounded-lg': isRounded }).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
