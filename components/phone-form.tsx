"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneInput } from "@/components/phone-input"
import { useToast } from "@/components/ui/use-toast"

export function PhoneForm() {
  const { toast } = useToast()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [format, setFormat] = useState<"national" | "international">("national")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const validatePhoneNumber = (number: string): boolean => {
    // For US/Canada numbers, we expect 10 digits
    const digitsOnly = number.replace(/\D/g, "")

    if (format === "national" && digitsOnly.length !== 10) {
      setError("Please enter a valid 10-digit phone number")
      return false
    }

    if (format === "international" && digitsOnly.length < 10) {
      setError("Please enter a valid international phone number")
      return false
    }

    setError(undefined)
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePhoneNumber(phoneNumber)) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Phone number saved",
        description: `Successfully saved ${phoneNumber}`,
      })

      // Reset form after successful submission
      // setPhoneNumber("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save phone number. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleFormat = () => {
    // Convert the current phone number to the new format
    const digitsOnly = phoneNumber.replace(/\D/g, "")

    if (format === "national") {
      setFormat("international")
      if (digitsOnly.length > 0) {
        setPhoneNumber(
          `+1 ${digitsOnly.substring(0, 3)} ${digitsOnly.substring(3, 6)}${
            digitsOnly.length > 6 ? ` ${digitsOnly.substring(6, 10)}` : digitsOnly.substring(6)
          }`,
        )
      } else {
        setPhoneNumber("+1 ")
      }
    } else {
      setFormat("national")
      if (digitsOnly.length > 0) {
        setPhoneNumber(
          `(${digitsOnly.substring(0, 3)}) ${digitsOnly.substring(3, 6)}${
            digitsOnly.length > 6 ? `-${digitsOnly.substring(6, 10)}` : digitsOnly.substring(6)
          }`,
        )
      } else {
        setPhoneNumber("")
      }
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Phone Number</CardTitle>
        <CardDescription>Enter your contact phone number</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <PhoneInput
              id="phone"
              label="Phone Number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              format={format}
              error={error}
              helpText={format === "national" ? "Format: (XXX) XXX-XXXX" : "Format: +1 XXX XXX XXXX"}
              placeholder={format === "national" ? "(555) 555-5555" : "+1 555 555 5555"}
              disabled={isSubmitting}
            />
            <div className="flex items-center space-x-2">
              <Button type="button" variant="outline" size="sm" onClick={toggleFormat}>
                Switch to {format === "national" ? "International" : "National"} Format
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => setPhoneNumber("")}>
            Clear
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Phone Number"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

