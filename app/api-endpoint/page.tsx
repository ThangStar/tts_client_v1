'use client'
import Layout from '../components/layout/layout'

import { Tab, Tabs } from "@nextui-org/react"
import { Code } from "@nextui-org/react"
import { Chip } from "@nextui-org/react"

export default function APIEndpointPage() {
  return (
    <Layout>
      <div className="container px-6 py-8 max-w-5xl space-y-8">
        <div className="space-y-4">
        <h1 className="text-3xl font-bold">API Documentation</h1>
        <p className="text-default-600">
          Tài liệu API cho phép bạn tích hợp dịch vụ Text-to-Speech vào ứng dụng của mình.
        </p>
      </div>

      <div className="space-y-12">
        {/* Authentication */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Authentication</h2>
          <p>Tất cả các API calls cần include Bearer token trong header:</p>
          <Code>
            {`Authorization: Bearer your_token_here`}
          </Code>
        </section>

        {/* Base URL */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Base URL</h2>
          <Code>
            https://api.aivoice.com.vn/v1
          </Code>
        </section>

        {/* Endpoints */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Endpoints</h2>

          <Tabs aria-label="API endpoints">
            <Tab key="text-to-speech" title="Text to Speech">
              <div className="p-4 space-y-6">
                <div className="flex items-center gap-2">
                  <Chip color="success">POST</Chip>
                  <code>/tts/convert</code>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Request Body</h4>
                  <Code>
{`{
  "text": "Văn bản cần chuyển đổi",
  "voice_id": "vi_female_1",
  "speed": 1.0,
  "pitch": 1.0
}`}
                  </Code>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Response</h4>
                  <Code>
{`{
  "success": true,
  "data": {
    "audio_url": "https://storage.aivoice.com.vn/audio/123.mp3",
    "duration": 3.5,
    "characters": 150
  }
}`}
                  </Code>
                </div>
              </div>
            </Tab>

            <Tab key="voices" title="Voices">
              <div className="p-4 space-y-6">
                <div className="flex items-center gap-2">
                  <Chip color="primary">GET</Chip>
                  <code>/voices</code>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Response</h4>
                  <Code>
{`{
  "success": true,
  "data": [
    {
      "id": "vi_female_1",
      "name": "Thu Minh",
      "gender": "female",
      "language": "vi",
      "preview_url": "https://storage.aivoice.com.vn/preview/voice1.mp3"
    }
  ]
}`}
                  </Code>
                </div>
              </div>
            </Tab>

            <Tab key="history" title="History">
              <div className="p-4 space-y-6">
                <div className="flex items-center gap-2">
                  <Chip color="primary">GET</Chip>
                  <code>/history</code>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Query Parameters</h4>
                  <Code>
{`{
  "page": 1,
  "limit": 10,
  "from_date": "2024-03-01",
  "to_date": "2024-03-15"
}`}
                  </Code>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Response</h4>
                  <Code>
{`{
  "success": true,
  "data": {
    "items": [
      {
        "id": "tts_123",
        "text": "Văn bản mẫu",
        "voice_id": "vi_female_1",
        "audio_url": "https://storage.aivoice.com.vn/audio/123.mp3",
        "created_at": "2024-03-15T14:30:00Z"
      }
    ],
    "total": 50,
    "page": 1,
    "limit": 10
  }
}`}
                  </Code>
                </div>
              </div>
            </Tab>

            <Tab key="usage" title="Usage">
              <div className="p-4 space-y-6">
                <div className="flex items-center gap-2">
                  <Chip color="primary">GET</Chip>
                  <code>/usage</code>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Response</h4>
                  <Code>
{`{
  "success": true,
  "data": {
    "plan": "professional",
    "characters_used": 150000,
    "characters_limit": 600000,
    "expires_at": "2024-04-15T00:00:00Z"
  }
}`}
                  </Code>
                </div>
              </div>
            </Tab>
          </Tabs>
        </section>

        {/* Error Codes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Error Codes</h2>
          <div className="space-y-2">
            <p><code>400</code> - Bad Request - Thông tin yêu cầu không hợp lệ</p>
            <p><code>401</code> - Unauthorized - Token không hợp lệ hoặc hết hạn</p>
            <p><code>403</code> - Forbidden - Không có quyền truy cập</p>
            <p><code>429</code> - Too Many Requests - Vượt quá giới hạn request</p>
            <p><code>500</code> - Internal Server Error - Lỗi hệ thống</p>
          </div>
        </section>

        {/* Rate Limits */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Rate Limits</h2>
          <div className="space-y-2">
            <p>• Gói Tiêu chuẩn: 60 requests/phút</p>
            <p>• Gói Chuyên nghiệp: 120 requests/phút</p>
            <p>• Gói Đặc biệt: 240 requests/phút</p>
          </div>
        </section>
      </div>
      </div>
    </Layout>
  )
}
