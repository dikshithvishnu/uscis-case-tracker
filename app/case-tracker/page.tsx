"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { FiGithub } from "react-icons/fi";
import { USCIS_TOKEN } from "@/lib/constants"
import CaseForm from "../appComponents/CaseForm"
import CaseStatus from "../appComponents/CaseStatus"
import ErrorMessage from "../appComponents/ErrorMessage"
import { handleFetchCaseStatus } from "@/lib/api"

interface CaseStatusResponse {
  case_status?: {
    receiptNumber: string
    formType: string
    submittedDate: string
    modifiedDate: string
    current_case_status_text_en: string
    current_case_status_desc_en: string
    hist_case_status: {
      date: string
      completed_text_en: string
    }[]
  }
  message: string
}

export default function CaseTracker() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [caseData, setCaseData] = useState<CaseStatusResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.sessionStorage.getItem(USCIS_TOKEN)
      if (token) {
        setIsLoggedIn(true)
      } else {
        router.push("/")
      }
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem(USCIS_TOKEN)
    router.push("/")
  }

  const handleCaseSubmit = async (caseNumber: string) => {
    try {
      handleFetchCaseStatus(caseNumber, setIsLoading, setCaseData)
    } catch (error) {
      console.error("Error fetching case status:", error)
      setIsLoading(false)
    }
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">USCIS Case Tracker</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <CaseForm onSubmit={handleCaseSubmit} isLoading={isLoading} />

        {caseData && !isLoading && (
          <div className="mt-8">
            {caseData?.case_status && <CaseStatus caseData={caseData.case_status} />}
            {!caseData?.case_status && <ErrorMessage message={caseData.message} />}
          </div>
        )}

        {/* <div className="mt-12 text-center">
          <a href="https://github.com/dikshithvishnu/uscis-case-tracker" target="_blank">
            <Button variant="outline" className="flex items-center gap-2">
              <FiGithub className="h-4 w-4" />
              Contribute on GitHub
            </Button>
          </a>
        </div> */}
      </div>
    </main>
  )
}

