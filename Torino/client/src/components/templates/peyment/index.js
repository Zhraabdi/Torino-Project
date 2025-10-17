import {  useGetUserData } from "@/core/services/queries"
import Image from "next/image"
import Link from "next/link";

function Peyment({params:status}) {
    
  const {data}=useGetUserData();
  console.log(data);
    
if (status === "==success"){
    return (
        <div className="flex items-center justify-center md:mt-32 mt-9 rounded-lg px-6 md:px-0">
        <div className="flex flex-col gap-7 justify-center">
        <div className="flex items-center justify-center">
        <Image  src={"/images/wallet.png"} alt="پرداخت" width={300} height={300} className="w-40 sm:w-52 md:w-64 lg:w-72 h-auto mx-auto" />
        </div>
        <p className="text-sm md:text-lg font-normal text-primary text-center">{data?.data?.firstName || ""} عزیز پرداخت شما با موفقیت انجام شد.</p>
        <p className="text-sm md:text-lg text-center">تور شما با موفقیت رزرو شد میتوانید جزئیات تور رو در پروفایل خود مشاهد ه کنید </p>
        <Link href={"/profile/my-tours"}>
        <p className="bg-primary text-center rounded-md p-3 text-white">مشاهده تور</p>
        </Link>
        <Link href={"/"}>
        <p className="bg-gray-200 text-center rounded-md p-3 text-black"> برگشت به صفحه اصلی</p>
        </Link>
        </div>
    </div>
      )
}

}

export default Peyment