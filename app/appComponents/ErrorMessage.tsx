import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ErrorMessageProps {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Card className="border-red-200">
      <CardHeader className="border-b border-red-100">
        <CardTitle className="text-red-700 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Case Not Found
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
          <AlertDescription className="text-red-800">{message}</AlertDescription>
        </Alert>
        <div className="mt-4 text-gray-700">
          <p className="font-medium mb-2">Possible reasons:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The receipt number was entered incorrectly</li>
            <li>The case is too recent and not yet in the system</li>
            <li>The case is too old and has been archived</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

