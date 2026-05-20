import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import CommodityShowcase from '@/components/sections/CommodityShowcase'
import HowItWorksSection from '@/components/sections/HowItWorksSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CommodityShowcase />
      <HowItWorksSection />
    </main>
  )
}