'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'

/**
 * Renders a Toaster component that displays toast notifications
 * @returns {JSX.Element} A ToastProvider component containing Toast elements for each notification
 */
export function Toaster() {
  ```
  /**
   * Renders a list of Toast components based on the provided toasts array
   * @param {Array} toasts - An array of toast objects containing id, title, description, action, and other props
   * @returns {Array} An array of Toast components with their respective content and properties
   */
  ```
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className='grid gap-1'>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}