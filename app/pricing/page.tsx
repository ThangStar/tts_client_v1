'use client'

import Layout from "@/app/components/layout/layout"
import PricingHeader from "../components/pricing/PricingHeader"
import PricingPage from "../components/pricing/PricingPage"

export default function Pricing() {
  return (
    <Layout>
      <div className="flex-1 h-[calc(100%-10px)] bg-gradient-to-br from-blue-50/50 to-primary/5">
        <PricingHeader />
        <PricingPage />
      </div>
    </Layout>
  )
} 