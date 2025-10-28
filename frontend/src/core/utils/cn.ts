import { clsx, type ClassValue } from 'clsx';

/**
 * @utility cn
 * @summary Utility function to merge Tailwind CSS classes
 * @category styling
 *
 * @description
 * Combines clsx for conditional classes with proper handling
 * of Tailwind class conflicts.
 *
 * @param {...ClassValue[]} inputs - Class values to merge
 * @returns {string} Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
