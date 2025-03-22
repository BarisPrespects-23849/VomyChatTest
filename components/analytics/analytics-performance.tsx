"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import { useMediaQuery } from "@/hooks/use-media-query"

// Generate random performance data
const generatePerformanceData = () => {
  const data = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      views: Math.floor(Math.random() * 500) + 300,
      clicks: Math.floor(Math.random() * 200) + 50,
      ctr: Number.parseFloat((Math.random() * 10 + 20).toFixed(1)),
    })
  }

  return data
}

export function AnalyticsPerformance() {
  const [performanceData] = useState(generatePerformanceData())
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Track your key performance indicators over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="views" className="space-y-4">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="views">Views</TabsTrigger>
            <TabsTrigger value="clicks">Clicks</TabsTrigger>
            <TabsTrigger value="ctr">CTR</TabsTrigger>
          </TabsList>

          <TabsContent value="views" className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{
                  top: 5,
                  right: isMobile ? 5 : 10,
                  left: isMobile ? 0 : 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  padding={{ left: 10, right: 10 }}
                  tick={{ fontSize: 12 }}
                  interval={isMobile ? "preserveStartEnd" : "equidistantPreserveStart"}
                  tickFormatter={(value) => (isMobile ? value.split(" ")[0] : value)}
                />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="views" stroke="#9333ea" fill="url(#colorViews)" strokeWidth={2} />
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="clicks" className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{
                  top: 5,
                  right: isMobile ? 5 : 10,
                  left: isMobile ? 0 : 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  padding={{ left: 10, right: 10 }}
                  tick={{ fontSize: 12 }}
                  interval={isMobile ? "preserveStartEnd" : "equidistantPreserveStart"}
                  tickFormatter={(value) => (isMobile ? value.split(" ")[0] : value)}
                />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#e11d48"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="ctr" className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{
                  top: 5,
                  right: isMobile ? 5 : 10,
                  left: isMobile ? 0 : 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  padding={{ left: 10, right: 10 }}
                  tick={{ fontSize: 12 }}
                  interval={isMobile ? "preserveStartEnd" : "equidistantPreserveStart"}
                  tickFormatter={(value) => (isMobile ? value.split(" ")[0] : value)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip formatter={(value) => [`${value}%`, "CTR"]} />
                <Bar dataKey="ctr" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

