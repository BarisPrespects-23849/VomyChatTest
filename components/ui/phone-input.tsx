"use client"

import * as React from "react"
import { Input, type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface PhoneInputProps extends Omit<InputProps, "onChange"> {
  onChange: (value: string) => void
  value: string
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    // Format phone number as user types
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let input = e.target.value

      // Remove all non-numeric characters except + at the beginning
      input = input.replace(/[^\d+]/g, "")

      // Allow only one + at the beginning
      if (input.startsWith("+")) {
        input = "+" + input.substring(1).replace(/\+/g, "")
      }

      // Format the phone number
      let formattedInput = input

      // Format US numbers with country code
      if (input.startsWith("+1") && input.length > 2) {
        const areaCode = input.substring(2, Math.min(5, input.length))
        const middle = input.length > 5 ? input.substring(5, Math.min(8, input.length)) : ""
        const last = input.length > 8 ? input.substring(8, Math.min(12, input.length)) : ""

        formattedInput = `+1 ${areaCode}`
        if (middle) formattedInput += `-${middle}`
        if (last) formattedInput += `-${last}`
      }
      // Format international numbers
      else if (input.startsWith("+") && input.length > 3) {
        // Simple formatting for international numbers
        const countryCode = input.substring(0, 3)
        const rest = input.substring(3)

        formattedInput = `${countryCode} ${rest}`
      }

      onChange(formattedInput)
    }

    // Handle paste event to clean and format pasted phone numbers
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pastedText = e.clipboardData.getData("text")

      // Clean the pasted text
      let cleaned = pastedText.replace(/[^\d+]/g, "")

      // Ensure only one + at the beginning
      if (cleaned.startsWith("+")) {
        cleaned = "+" + cleaned.substring(1).replace(/\+/g, "")
      }

      // Apply basic formatting
      let formatted = cleaned

      // Format US numbers
      if (cleaned.startsWith("+1") && cleaned.length > 2) {
        const areaCode = cleaned.substring(2, Math.min(5, cleaned.length))
        const middle = cleaned.length > 5 ? cleaned.substring(5, Math.min(8, cleaned.length)) : ""
        const last = cleaned.length > 8 ? cleaned.substring(8, Math.min(12, cleaned.length)) : ""

        formatted = `+1 ${areaCode}`
        if (middle) formatted += `-${middle}`
        if (last) formatted += `-${last}`
      }
      // Basic formatting for international numbers
      else if (cleaned.startsWith("+") && cleaned.length > 3) {
        const countryCode = cleaned.substring(0, 3)
        const rest = cleaned.substring(3)

        formatted = `${countryCode} ${rest}`
      }

      onChange(formatted)
    }

    return (
      <Input
        type="tel"
        className={cn("font-mono", className)}
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        ref={ref}
        {...props}
      />
    )
  },
)

PhoneInput.displayName = "PhoneInput"

