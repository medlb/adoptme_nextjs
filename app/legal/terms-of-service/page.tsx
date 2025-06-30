import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "ReceivePets Terms of Service - Read our terms and conditions for using our virtual pet adoption platform.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: January 1, 2024</p>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using ReceivePets, you accept and agree to be bound by the terms and provision of this
                agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Service</h2>
              <p className="text-gray-600 mb-4">
                ReceivePets is a free virtual pet adoption platform. You may use our service to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Browse and claim virtual pets</li>
                <li>Share your claimed pets with others</li>
                <li>Participate in our community</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
              <p className="text-gray-600 mb-4">When using ReceivePets, you agree to:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Use the service in a respectful and lawful manner</li>
                <li>Not attempt to claim pets using automated tools or bots</li>
                <li>Respect other users and the community guidelines</li>
                <li>Not misuse or attempt to exploit our platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Virtual Pet Ownership</h2>
              <p className="text-gray-600 mb-4">
                Virtual pets claimed on ReceivePets are for entertainment purposes only. Pet claims are processed on a
                first-come, first-served basis and are final.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                ReceivePets is provided "as is" without any warranties. We are not liable for any damages arising from
                your use of our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms of Service, please contact us at legal@receivepets.com
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
