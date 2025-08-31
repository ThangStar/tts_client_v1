'use client'

import VoiceHistoryList from "../components/VoiceHistoryList"
import Layout from "../components/layout/layout"

export default function PaymentPage() {

    return (
        <Layout>
            <div className="flex-1 p-1 lg:p-3 bg-gradient-to-br from-blue-50/50 to-primary/5">
                <h1 className="text-2xl font-semibold">Lịch sử</h1>
            </div>
            <VoiceHistoryList/>
        </Layout>
    )
} 