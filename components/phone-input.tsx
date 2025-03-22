"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (value: string) => void
  label?: string
  error?: string
  helpText?: string
  format?: "national" | "international"
  countryCode?: string
}

export function PhoneInput({
  value,
  onChange,
  label,
  error,
  helpText,
  format = "national",
  countryCode = "+1",
  className,
  disabled,
  ...props
}: PhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  // This function handles the raw input and applies formatting
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the cursor position before we update the input
    const cursorPosition = e.target.selectionStart || 0

    // Get the raw input value
    const inputValue = e.target.value

    // Strip all non-numeric characters for processing
    const digitsOnly = inputValue.replace(/\D/g, "")

    // Format the phone number based on the selected format
    let formattedValue = ""

    if (format === "national") {
      // Format as (XXX) XXX-XXXX for US/Canada
      if (digitsOnly.length > 0) {
        formattedValue = digitsOnly.substring(0, 10) // Limit to 10 digits

        if (digitsOnly.length > 3) {
          formattedValue = `(${digitsOnly.substring(0, 3)}) ${digitsOnly.substring(3, 6)}${
            digitsOnly.length > 6 ? `-${digitsOnly.substring(6, 10)}` : digitsOnly.substring(6)
          }`
        } else {
          formattedValue = `(${digitsOnly.substring(0, 3)}`
        }
      }
    } else {
      // International format with country code
      if (digitsOnly.length > 0) {
        formattedValue = `${countryCode} ${digitsOnly.substring(0, 3)} ${digitsOnly.substring(3, 6)}${
          digitsOnly.length > 6 ? ` ${digitsOnly.substring(6, 10)}` : digitsOnly.substring(6)
        }`
      } else {
        formattedValue = countryCode
      }
    }

    // Call the onChange handler with the formatted value
    onChange(formattedValue)

    // Calculate new cursor position after formatting
    // This is important to prevent the cursor from jumping to the end
    setTimeout(() => {
      if (inputRef.current) {
        // Adjust cursor position based on added formatting characters
        const newPosition = cursorPosition

        // Count formatting characters before the cursor position
        const beforeFormatting = inputValue.substring(0, cursorPosition)
        const beforeFormattingDigits = beforeFormatting.replace(/\D/g, "")

        // Find where these digits end up in the formatted string
        let digitCount = 0
        let newCursorPos = 0

        for (let i = 0; i < formattedValue.length; i++) {
          if (/\d/.test(formattedValue[i])) {
            digitCount++
          }
          if (digitCount === beforeFormattingDigits.length) {
            newCursorPos = i + 1
            break
          }
        }

        // Set the adjusted cursor position
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }

  // Handle special keys like backspace and delete
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow navigation keys
    if (["ArrowLeft", "ArrowRight", "Home", "End", "Tab"].includes(e.key)) {
      return
    }

    // Handle backspace and delete to work with formatting
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault()

      const cursorPosition = e.currentTarget.selectionStart || 0
      const selectionEnd = e.currentTarget.selectionEnd || cursorPosition

      // If there's a selection, remove it
      if (cursorPosition !== selectionEnd) {
        const beforeSelection = value.substring(0, cursorPosition)
        const afterSelection = value.substring(selectionEnd)
        onChange(beforeSelection + afterSelection)

        // Set cursor position after deletion
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(cursorPosition, cursorPosition)
          }
        }, 0)
        return
      }

      // Handle backspace
      if (e.key === "Backspace" && cursorPosition > 0) {
        // Find the previous character that is a digit
        let deletePosition = cursorPosition - 1
        while (deletePosition > 0 && !/\d/.test(value[deletePosition])) {
          deletePosition--
        }

        if (deletePosition >= 0) {
          const newValue = value.substring(0, deletePosition) + value.substring(deletePosition + 1)
          onChange(newValue)

          // Set cursor position after deletion
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.setSelectionRange(deletePosition, deletePosition)
            }
          }, 0)
        }
      }

      // Handle delete key
      if (e.key === "Delete" && cursorPosition < value.length) {
        // Find the next character that is a digit
        let deletePosition = cursorPosition
        while (deletePosition < value.length && !/\d/.test(value[deletePosition])) {
          deletePosition++
        }

        if (deletePosition < value.length) {
          const newValue = value.substring(0, deletePosition) + value.substring(deletePosition + 1)
          onChange(newValue)

          // Keep cursor at the same position
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.setSelectionRange(cursorPosition, cursorPosition)
            }
          }, 0)
        }
      }
    }
  }

  // Handle paste events to strip formatting
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData("text/plain")
    const digitsOnly = pastedText.replace(/\D/g, "")

    // Create a new input value by replacing the selection or inserting at cursor
    const cursorPosition = inputRef.current?.selectionStart || 0
    const selectionEnd = inputRef.current?.selectionEnd || cursorPosition

    const beforeCursor = value.substring(0, cursorPosition)
    const afterCursor = value.substring(selectionEnd)

    // Extract digits from the current value
    const currentDigits = value.replace(/\D/g, "")

    // Calculate where to insert the pasted digits
    const beforeCursorDigits = beforeCursor.replace(/\D/g, "")
    const afterCursorDigits = afterCursor.replace(/\D/g, "")

    // Combine with pasted digits
    const newDigits = beforeCursorDigits + digitsOnly + afterCursorDigits

    // Format and update
    let formattedValue = ""
    if (format === "national") {
      if (newDigits.length > 0) {
        const limitedDigits = newDigits.substring(0, 10)
        if (limitedDigits.length > 3) {
          formattedValue = `(${limitedDigits.substring(0, 3)}) ${limitedDigits.substring(3, 6)}${
            limitedDigits.length > 6 ? `-${limitedDigits.substring(6, 10)}` : limitedDigits.substring(6)
          }`
        } else {
          formattedValue = `(${limitedDigits.substring(0, 3)}`
        }
      }
    } else {
      if (newDigits.length > 0) {
        formattedValue = `${countryCode} ${newDigits.substring(0, 3)} ${newDigits.substring(3, 6)}${
          newDigits.length > 6 ? ` ${newDigits.substring(6, 10)}` : newDigits.substring(6)
        }`
      } else {
        formattedValue = countryCode
      }
    }

    onChange(formattedValue)

    // Calculate new cursor position
    const newCursorPosition = cursorPosition + digitsOnly.length
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition)
      }
    }, 0)
  }

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <div className="relative">
        <Input
          ref={inputRef}
          type="tel"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn("pr-10", error && "border-red-500 focus-visible:ring-red-500", className)}
          disabled={disabled}
          {...props}
        />
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          </div>
        )}
      </div>
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : helpText ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      ) : null}
    </div>
  )
}

