import { RefObject, useEffect } from 'react'

type Event = MouseEvent | TouchEvent

/**
 * Custom React hook to handle clicks outside of a specified element
 * @param {RefObject<T>} ref - React ref object pointing to the element to monitor
 * @param {(event: Event) => void} handler - Callback function to be called when a click outside occurs
 * @returns {void} This hook doesn't return anything
 */
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  /**
   * Sets up event listeners for detecting clicks outside a specified element.
   * @param {React.RefObject} ref - Reference to the element to check against.
   * @param {Function} handler - Function to call when a click outside is detected.
   * @returns {Function} Cleanup function to remove event listeners.
   */
  useEffect(() => {
    /**
     * Event listener function that checks if a click occurred outside a specified element
     * @param {Event} event - The event object triggered by the click
     * @returns {void} This function doesn't return a value
     */
    const listener = (event: Event) => {
      const el = ref?.current
      if (!el || el.contains((event?.target as Node) || null)) {
        return
      }

      handler(event) // Call the handler only if the click is outside of the element passed.
    /**
     * Returns a cleanup function that removes event listeners for mousedown and touchstart events.
     * @returns {Function} A function that, when called, removes the mousedown and touchstart event listeners from the document.
     */
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler]) // Reload only if ref or handler changes
}