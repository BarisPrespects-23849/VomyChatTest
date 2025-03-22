"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

// Generate random growth data
const generateGrowthData = () => {
  const data = []
  const now = new Date()
  let cumulativeValue = 20000

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const dailyGrowth = Math.floor(Math.random() * 300) + 100
    cumulativeValue += dailyGrowth

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: cumulativeValue,
      growth: dailyGrowth,
    })
  }

  return data
}

export function AudienceGrowth() {
  const [growthData, setGrowthData] = useState(generateGrowthData())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audience Growth</CardTitle>
        <CardDescription>Total audience growth over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={growthData}
            margin={{
              top: 5,
              right: 10,
              left: 10,
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
              interval="preserveStartEnd"
            />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#9333ea" fill="url(#colorGrowth)" strokeWidth={2} />
            <defs>
              <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9333ea" stopOpacity={0.1} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

