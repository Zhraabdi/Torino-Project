"use client"

import { useSearchParams } from "next/navigation"
import Peyment from "@/components/templates/peyment"

export default function SearchParamWrapper() {
  const searchParams = useSearchParams()
  const status = searchParams.get("status")

  return <Peyment params={status} />
}
