"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CaseFormProps {
  onSubmit: (caseNumber: string) => void
  isLoading: boolean
}

export default function CaseForm({ onSubmit, isLoading }: CaseFormProps) {
  const [caseNumber, setCaseNumber] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!caseNumber.trim()) {
      setError("Please enter a case number")
      return
    }
    
    const caseNumberRegex = /^[A-Z]{3}[0-9]{10}$/
    if (!caseNumberRegex.test(caseNumber)) {
      setError("Please enter a valid case number format (e.g., IOE9101234567)")
      return
    }

    onSubmit(caseNumber)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Your Case Number</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="caseNumber">Receipt Number</Label>
            <Input
              id="caseNumber"
              placeholder="e.g. IOE9101234567"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value.toUpperCase())}
            />
            <p className="text-sm text-gray-500">Enter your 13-character receipt number (e.g., IOE9101234567)</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Checking..." : "Check Status"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

