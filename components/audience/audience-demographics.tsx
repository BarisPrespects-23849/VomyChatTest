"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"

// Sample demographic data
const ageData = [
  { name: "18-24", value: 35, color: "#9333ea" },
  { name: "25-34", value: 45, color: "#e11d48" },
  { name: "35-44", value: 15, color: "#f59e0b" },
  { name: "45+", value: 5, color: "#10b981" },
]

const genderData = [
  { name: "Female", value: 58, color: "#9333ea" },
  { name: "Male", value: 40, color: "#3b82f6" },
  { name: "Other", value: 2, color: "#f59e0b" },
]

const locationData = [
  { name: "United States", value: 45, color: "#9333ea" },
  { name: "United Kingdom", value: 15, color: "#e11d48" },
  { name: "Canada", value: 12, color: "#f59e0b" },
  { name: "Australia", value: 8, color: "#10b981" },
  { name: "Germany", value: 5, color: "#3b82f6" },
  { name: "Other", value: 15, color: "#6b7280" },
]

export function AudienceDemographics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Demographics</CardTitle>
        <CardDescription>Breakdown of your audience by age, gender, and location</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-medium">Age Distribution</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium">Gender Distribution</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium">Top Locations</h3>
          <div className="space-y-2">
            {locationData.map((location) => (
              <div key={location.name} className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: location.color }}></div>
                <div className="flex-1">{location.name}</div>
                <div className="font-medium">{location.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

