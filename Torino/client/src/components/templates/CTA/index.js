"use client"

import Link from "next/link"
import Image from "next/image"

function CTA() {
  return (
    <div className="max-w-[1440px] mx-8 md:mx-auto md:h-[251px] mt-20 flex max-sm:flex-col border border-r-none rounded-[10px]">
    <div className="h-full md:w-4/6 pr-4 pt-4 md:pt-0 md:pr-20 bg-primary flex flex-col md:gap-4 rounded-t-[10px] md:rounded-[10px] relative">
        <p className="text-[22px] md:text-5xl font-extrabold text-white md:mt-12">خرید تلفنی از <span className="text-[#10411B]">تورینو</span></p>
        <span className="text-white text-[14px] md:text-[32px] font-normal mb-12 md:mb-0">به هرکجا که میخواهید!</span>
        <Image src={"/images/carton.png"} width={400} height={400} alt='تماس تلفنی' priority className="absolute left-0 md:left-10 bottom-0 w-[195px] md:w-[308px] md:h-[225px] z-20"/>
    </div>
    <div className="md:w-2/6 py-4 md:py-0 flex md:flex-col items-center justify-center gap-4">
        <p className="flex gap-1.5 text-[20px] md:text-[28px] font-extrabold">021-1840
          <span className="w-6 h-6">
          <Image src={"/icons/call.svg"} width={20} height={20} alt="تماس"  className="md:mt-1"/>
          </span></p>
        <Link href={"/services"} className="bg-secondary py-2 px-10 rounded-[10px] text-white transition-all ease-out hover:bg-primary">اطلاعات بیشتر</Link>
    </div>
</div>
  )
}

export default CTA