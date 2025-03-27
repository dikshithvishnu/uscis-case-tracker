import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, FileText } from "lucide-react"

interface CaseStatusProps {
  caseData: {
    receiptNumber: string
    formType: string
    current_case_status_text_en: string
    current_case_status_desc_en: string
    hist_case_status: {
      date: string
      completed_text_en: string
    }[]
  }
}

export default function CaseStatus({ caseData }: CaseStatusProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="border-b">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-xl">Case Status</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Receipt Number: {caseData.receiptNumber}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Form {caseData.formType}
            </Badge>
            <Badge className="bg-blue-500">{caseData.current_case_status_text_en}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Current Status</h3>
            <div dangerouslySetInnerHTML={{
                __html: caseData.current_case_status_desc_en
            }} className="text-gray-700"></div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-4">Case History</h3>
            <div className="space-y-4">
              {caseData?.hist_case_status?.map((status, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <CalendarIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    {index < caseData.hist_case_status.length - 1 && (
                      <div className="h-full w-0.5 bg-gray-200 my-1"></div>
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-gray-500">{formatDate(status.date)}</p>
                    <p className="mt-1">{status.completed_text_en}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

