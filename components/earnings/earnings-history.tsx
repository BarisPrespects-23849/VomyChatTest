"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// Generate transaction history data
const generateTransactionHistory = () => {
  const transactions = []
  const now = new Date()
  const transactionTypes = ["Sale", "Payout", "Refund"]
  const productNames = ["Premium Membership", "E-book Bundle", "Video Course", "Consultation", "Digital Templates"]

  for (let i = 0; i < 10; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - i * 3 - Math.floor(Math.random() * 3))

    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)]
    let amount = 0
    let status = ""

    if (type === "Sale") {
      amount = Number.parseFloat((Math.random() * 100 + 20).toFixed(2))
      status = "Completed"
    } else if (type === "Payout") {
      amount = Number.parseFloat((Math.random() * 500 + 100).toFixed(2))
      status = Math.random() > 0.3 ? "Completed" : "Processing"
    } else {
      amount = Number.parseFloat((Math.random() * 50 + 10).toFixed(2))
      status = "Completed"
    }

    transactions.push({
      id: `TRX-${Math.floor(Math.random() * 10000)}`,
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      type,
      description:
        type === "Sale"
          ? `Sale of ${productNames[Math.floor(Math.random() * productNames.length)]}`
          : type === "Payout"
            ? "Monthly payout to bank account"
            : `Refund for ${productNames[Math.floor(Math.random() * productNames.length)]}`,
      amount,
      status,
    })
  }

  return transactions
}

export function EarningsHistory() {
  const [transactions] = useState(generateTransactionHistory())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Recent transactions and payouts</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      transaction.type === "Sale"
                        ? "bg-green-100 text-green-800"
                        : transaction.type === "Payout"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell
                  className={`font-medium ${transaction.type === "Refund" ? "text-red-600" : "text-green-600"}`}
                >
                  {transaction.type === "Refund" ? "-" : ""}${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      transaction.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-center">
          <Button variant="outline">View All Transactions</Button>
        </div>
      </CardContent>
    </Card>
  )
}

