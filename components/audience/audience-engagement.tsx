"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Sample engagement data
const engagementData = [
  {
    source: "Instagram",
    visitors: 8432,
    percentage: 34.5,
    change: 12.3,
  },
  {
    source: "Twitter",
    visitors: 4217,
    percentage: 17.2,
    change: 8.7,
  },
  {
    source: "TikTok",
    visitors: 3845,
    percentage: 15.7,
    change: 23.5,
  },
  {
    source: "YouTube",
    visitors: 2983,
    percentage: 12.2,
    change: 5.2,
  },
  {
    source: "Facebook",
    visitors: 2156,
    percentage: 8.8,
    change: -3.1,
  },
  {
    source: "Direct",
    visitors: 1934,
    percentage: 7.9,
    change: 2.8,
  },
  {
    source: "Other",
    visitors: 912,
    percentage: 3.7,
    change: 1.5,
  },
]

export function AudienceEngagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
        <CardDescription>Where your audience is coming from</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source</TableHead>
              <TableHead>Visitors</TableHead>
              <TableHead>Distribution</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {engagementData.map((item) => (
              <TableRow key={item.source}>
                <TableCell className="font-medium">{item.source}</TableCell>
                <TableCell>{item.visitors.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={item.percentage} className="h-2 w-full" />
                    <span className="text-xs text-gray-500">{item.percentage}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`flex items-center justify-end ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {item.change >= 0 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1 h-4 w-4"
                      >
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1 h-4 w-4"
                      >
                        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                        <polyline points="16 17 22 17 22 11" />
                      </svg>
                    )}
                    {Math.abs(item.change)}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

