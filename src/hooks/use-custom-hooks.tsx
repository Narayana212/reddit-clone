
import { buttonVariants } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

/**
 * Custom hook for creating and managing toast notifications
 * @returns {Object} An object containing toast notification functions
 * @returns {Function} loginToast - Function to display a login required toast notification
 */
export const useCustomToasts = () => {
  /**
   * Displays a login requirement toast notification with a login action link.
   * @returns {Object} An object containing a dismiss function to close the toast.
   */
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Login required.',
      description: 'You need to be logged in to do that.',
      variant: 'destructive',
      action: (
        <Link
          /**
           * Handles the click event to dismiss the current element or view.
           * @param {void} - This function doesn't take any parameters.
           * @returns {void} This function doesn't return a value.
           */
          onClick={() => dismiss()}
          href='/sign-in'
          className={buttonVariants({ variant: 'outline' })}>
          Login
        </Link>
      ),
    })
  }

  return { loginToast }
}