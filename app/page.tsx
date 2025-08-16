import { Hero } from "@/components/hero"
// import { PetGrid } from "@/components/pet-grid"
import { Features } from "@/components/features"
import { CallToAction } from "@/components/call-to-action"
import { seoTemplates } from "@/lib/seo"

export const metadata = seoTemplates.home()

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <Features /> */}
      {/* <CallToAction /> */}
    </>
  )
}
