import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility to prevent body scroll when dialogs are open
export function preventBodyScroll(prevent: boolean) {
  if (typeof document !== "undefined") {
    if (prevent) {
      document.body.classList.add("dialog-open")
    } else {
      document.body.classList.remove("dialog-open")
    }
  }
}

// Utility to check if an element is in viewport
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Utility to scroll element into view if needed
export function scrollIntoViewIfNeeded(element: HTMLElement): void {
  if (!isInViewport(element)) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }
}

