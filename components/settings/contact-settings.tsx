"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSettings } from "@/contexts/settings-context"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"
import { PhoneInput } from "@/components/ui/phone-input"

export function ContactSettings() {
  const { contactInfo, setContactInfo, updatePhoneNumber, saveSettings, isSaving } = useSettings()
  const { toast } = useToast()
  const [phoneInputValue, setPhoneInputValue] = useState(contactInfo.phoneNumber || "")

  const handleSave = async () => {
    try {
      await saveSettings()
      toast({
        title: "Contact information updated",
        description: "Your contact information has been saved successfully.",
        variant: "success",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Failed to save contact information. Please try again.",
      })
    }
  }

  const handlePhoneChange = (value: string) => {
    setPhoneInputValue(value)
    updatePhoneNumber(value)
  }

  const handleVerifyPhone = () => {
    // In a real app, this would trigger a verification process
    // For demo purposes, we'll just mark it as verified
    setContactInfo({ phoneNumberVerified: true })
    toast({
      title: "Phone number verified",
      description: "Your phone number has been verified successfully.",
      variant: "success",
    })
  }

  const handleVerifyEmail = () => {
    // In a real app, this would trigger a verification process
    // For demo purposes, we'll just mark it as verified
    setContactInfo({ emailVerified: true })
    toast({
      title: "Email verified",
      description: "Your email has been verified successfully.",
      variant: "success",
    })
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Manage your contact details and verification status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="phone">Phone Number</Label>
            {contactInfo.phoneNumberVerified ? (
              <Badge
                variant="outline"
                className="flex items-center gap-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              >
                <CheckCircle className="h-3 w-3" />
                Verified
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="flex items-center gap-1 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              >
                <XCircle className="h-3 w-3" />
                Unverified
              </Badge>
            )}
          </div>
          <PhoneInput
            id="phone"
            value={phoneInputValue}
            onChange={handlePhoneChange}
            placeholder="+1 (555) 123-4567"
            className="bg-gray-50 dark:bg-gray-800"
          />
          {!contactInfo.phoneNumberVerified && (
            <div className="mt-2 flex justify-end">
              <Button variant="outline" size="sm" onClick={handleVerifyPhone}>
                Verify Phone
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="email">Email Address</Label>
            {contactInfo.emailVerified ? (
              <Badge
                variant="outline"
                className="flex items-center gap-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              >
                <CheckCircle className="h-3 w-3" />
                Verified
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="flex items-center gap-1 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              >
                <XCircle className="h-3 w-3" />
                Unverified
              </Badge>
            )}
          </div>
          <Input
            id="email"
            type="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ email: e.target.value })}
            className="bg-gray-50 dark:bg-gray-800"
          />
          {!contactInfo.emailVerified && (
            <div className="mt-2 flex justify-end">
              <Button variant="outline" size="sm" onClick={handleVerifyEmail}>
                Verify Email
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address (Optional)</Label>
          <Input
            id="address"
            value={contactInfo.address || ""}
            onChange={(e) => setContactInfo({ address: e.target.value })}
            className="bg-gray-50 dark:bg-gray-800"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your address will only be used for shipping physical products
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Cancel</Button>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <svg
                className="mr-2 h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardFooter>
    </>
  )
}

