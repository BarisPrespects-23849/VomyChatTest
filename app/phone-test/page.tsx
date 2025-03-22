import { PhoneForm } from "@/components/phone-form"

export default function PhoneTestPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Phone Number Input Test</h1>
      <PhoneForm />

      <div className="mt-10 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting Guide</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>If the input doesn't accept typing, check for event handler issues</li>
          <li>If formatting is incorrect, verify the formatting logic</li>
          <li>If cursor position jumps, check the cursor position management</li>
          <li>If validation fails incorrectly, review validation rules</li>
          <li>Test across different browsers to identify compatibility issues</li>
        </ul>
      </div>
    </div>
  )
}

