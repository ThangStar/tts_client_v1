'use client'

import { Button, Input, Radio, RadioGroup } from "@nextui-org/react"
import { ArrowLeft, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import VoiceHistoryList from "../components/VoiceHistoryList"
import Layout from "../components/layout/layout"

export default function PaymentPage() {

    return (
        <Layout>
            <div className="flex-1 p-1 lg:p-3 bg-gradient-to-br from-blue-50/50 to-primary/5">
                <h1 className="text-2xl font-semibold">Lịch sử</h1>
            </div>
            <VoiceHistoryList rowsPerPage={10} />
        </Layout>
    )
} 