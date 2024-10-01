import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNowStrict } from 'date-fns'
import locale from 'date-fns/locale/en-US'

/**
 * Combines and merges CSS class names using the clsx and twMerge utilities
 * @param {...ClassValue[]} inputs - An array of class values to be combined and merged
 * @returns {string} A string of merged and deduplicated CSS class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatDistanceLocale = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  /**
   * Formats a time distance string based on the given token and count.
   * @param {string} token - The token representing the time unit (e.g., 'xSeconds', 'xMinutes').
   * @param {number} count - The quantity of the time unit.
   * @param {Object} [options] - Optional configuration for formatting.
   * @param {boolean} [options.addSuffix] - Whether to add a suffix to the formatted string.
   * @param {number} [options.comparison] - A value to determine the suffix ('in' or 'ago').
   * @returns {string} The formatted distance string.
   */
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      if (result === 'just now') return result
      return result + ' ago'
    }
  }

  return result
}

/**
 * Formats a given date to a string representing the distance from now
 * @param {Date} date - The date to format
 * @returns {string} A string representing the formatted time distance from now
 */
export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}