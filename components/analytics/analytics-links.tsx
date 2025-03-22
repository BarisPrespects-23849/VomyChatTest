"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Sample link performance data
const linkData = [
  {
    name: "Vomy Chat - Connect, Share, and Thrive Together!",
    clicks: 1245,
    views: 4532,
    ctr: 27.5,
    change: 12.3,
  },
  {
    name: "Join Our Community",
    clicks: 876,
    views: 3421,
    ctr: 25.6,
    change: 8.7,
  },
  {
    name: "Premium Features",
    clicks: 654,
    views: 2876,
    ctr: 22.7,
    change: -3.2,
  },
  {
    name: "E-book Bundle",
    clicks: 432,
    views: 1987,
    ctr: 21.7,
    change: 5.4,
  },
  {
    name: "Video Course",
    clicks: 321,
    views: 1543,
    ctr: 20.8,
    change: 2.1,
  },
]

export function AnalyticsLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Link Performance</CardTitle>
        <CardDescription>Click-through rates for your links</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Link</TableHead>
              <TableHead>CTR</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {linkData.map((link) => (
              <TableRow key={link.name}>
                <TableCell className="font-medium">{link.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={link.ctr} className="h-2 w-full" />
                    <span className="text-xs text-gray-500">{link.ctr}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`flex items-center justify-end ${link.change >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {link.change >= 0 ? (
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
                    {Math.abs(link.change)}%
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

