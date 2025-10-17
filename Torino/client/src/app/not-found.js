import Image from "next/image"
import Link from "next/link"

function notFound() {
  return (
 <div className="flex flex-col-reverse md:flex-row items-center justify-center m-auto min-h-screen">
  <div className="flex flex-col justify-between items-center md:gap-[80px] gap-7">
    <h2 className="md:text-4xl text-2xl">صفحه مورد نظر یافت نشد!</h2>
    <button className="bg-[#D8FFE1] md:w-[310px] md:h-[75px] w-[200px] h-[45px] rounded-2xl text-primary md:text-2xl text-lg">
    <Link href={"/"}>بازگشت به صفحه اصلی</Link>    
    </button>
  </div>
  <div>
    <Image src={"/images/Error.png"} width={555} height={555} alt="یافت نشد" />
  </div>
 </div>
  )
}

export default notFound