"use client"

import { useEffect, useState } from "react";
import LoginForm from "./appComponents/LoginForm";
import { handleUSCISAuth } from "@/lib/api";
import { useRouter } from "next/navigation";
import { USCIS_TOKEN } from "@/lib/constants";

 

export default function Home() {
  const router= useRouter();
  const [, setLoading] = useState(false);

  useEffect(() => {
    if(typeof window !== "undefined") {
      const token = window.sessionStorage.getItem(USCIS_TOKEN);
      if(token) {
        router.push("/case-tracker");
      } else {
        handleUSCISAuth(setLoading, router);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">USCIS Case Tracker</h1>
          <p className="mt-2 text-gray-600">Login to track your USCIS case status</p>
        </div>
         <LoginForm />
      </div>
    </main>
  )
}

