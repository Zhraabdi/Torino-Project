import { Suspense } from "react"
import SearchParamWrapper from "@/components/atoms/SearchParamWrapper"

export default function PeymentPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <SearchParamWrapper />
    </Suspense>
  )
}
