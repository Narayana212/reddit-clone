// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

```
/**
 * Generates a unique ID by incrementing a counter and converting it to a string.
 * @returns {string} A unique string ID derived from an incremented counter.
 */
```
function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

/**
 * Adds a toast notification to the remove queue after a specified delay
 * @param {string} toastId - The unique identifier of the toast to be removed
 * @returns {void} This function doesn't return a value
 */
/**
 * Sets a timeout to remove a toast notification after a specified delay
 * @param {string} toastId - The unique identifier of the toast to be removed
 * @returns {number} The timeout ID returned by setTimeout
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  /**
   * Reducer function for managing toast notifications in a state management system.
   * @param {State} state - The current state object containing toast notifications.
   * @param {Action} action - The action object describing the state change to be performed.
   * @returns {State} The new state object after applying the specified action.
   */
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      /**
       * Updates a specific toast in the state's toasts array
       * @param {Object} state - The current state object containing the toasts array
       * @param {Object} action - The action object containing the updated toast information
       * @returns {Array} A new array of toasts with the specified toast updated
       */
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      /**
       * Maps over an array of toasts and closes a specific toast or all toasts
       * @param {Object[]} state.toasts - The current array of toast objects
       * @param {string|undefined} toastId - The ID of the toast to close, or undefined to close all toasts
       * @returns {Object[]} A new array of toast objects with the specified toast(s) marked as closed
       */
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        /**
         * Adds all toast IDs to the remove queue
         * @param {Array} state.toasts - An array of toast objects
         * @returns {void} This function does not return a value
         */
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        /**
         * Filters out a specific toast from the array of toasts in the state
         * @param {Object} state - The current state object containing the toasts array
         * @param {Object} action - The action object containing the toastId to be removed
         * @returns {Array} A new array of toasts with the specified toast removed
         */
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

/**
 * Dispatches an action to update the memory state and notifies all listeners.
 /**
  * Notifies all registered listeners with the current memory state.
  * @param {function[]} listeners - An array of listener functions to be called.
  * @param {Object} memoryState - The current state of the memory to be passed to each listener.
  * @returns {void} This function doesn't return a value.
  */
 * @param {Action} action - The action object to be dispatched and processed by the reducer.
 * @returns {void} This function does not return a value.
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

/**
 * Creates and manages a toast notification
 * @param {Toast} props - The properties for the toast notification
 * @returns {Object} An object containing the toast's id, dismiss function, and update function
 */
function toast({ ...props }: Toast) {
  const id = genId()

  /**
   * Updates a toast notification with new properties
   * @param {ToasterToast} props - The new properties to update the toast with
   * @returns {void} This function doesn't return a value
   */
  /**
   * Dismisses a toast notification
   * @param {void} - This function doesn't take any parameters
   * @returns {void} Dispatches an action to dismiss the toast with the specified id
   */
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      /**
       * Handles the change in open state of a component
       * @param {boolean} open - Indicates whether the component is open or closed
       * @returns {void} This function doesn't return a value
       */
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
```
/**
 * Sets up a listener for state changes and cleans up on unmount
 * @param {Function} setState - The state setter function to be added to listeners
 * @param {Array} listeners - The array of listener functions
 * @param {any} state - The current state value
 * @returns {Function} Cleanup function to remove the listener when the component unmounts
 */
```
}

/**
 * Custom React hook for managing toast notifications
 * @returns {Object} An object containing the current state, toast function, and dismiss function
 * @returns {Object} state - The current state of toast notifications
 * @returns {Function} toast - Function to create new toast notifications
 * @returns {Function} dismiss - Function to dismiss toast notifications
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    /**
     * Removes a specific setState function from the listeners array
     * @returns {Function} A cleanup function that removes the setState function from the listeners array when called
     */
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])
```
/**
 * Dismisses a toast notification
 * @param {string} [toastId] - The unique identifier of the toast to dismiss. If not provided, it may dismiss the most recent or all toasts depending on implementation.
 * @returns {void} This function doesn't return a value
 */
```

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
