"use client"
import { useGetUserTransactions } from "@/core/services/queries"
import { DateToPersian, getHour, ToPersianNum } from "@/core/utils/helper";
import { PulseLoader } from "react-spinners";

function TransactionsPage() {
    const {data:transition,isPending}=useGetUserTransactions();
    if(isPending) return <PulseLoader color="#28a745" size={15} className="text-center pt-8"/>
     
    return (
    <div className=" border border-border rounded-lg" >
        <table className="w-full  ">
            <thead>
            <tr className=" bg-[#F3F3F3] md:text-xl text-sm text-black/60 ">
                <th className="p-4 font-medium rounded-tr-lg">تاریخ و ساعت</th>
                <th className="p-4 font-medium">مبلغ(تومان)</th>
                <th className="p-4  font-medium hidden md:block">نوع تراکنش</th>
                <th className="p-4 font-medium rounded-tl-lg ">شماره سفارش</th>
            </tr>
            </thead>
            <tbody> 
            {transition?.data?.map((transTour)=>(
                <tr key={transTour.id} className="text-center">
                    <td className="p-3 text-sm md:text-base">{DateToPersian(transTour?.createdAt)}-{getHour(transTour?.createdAt)}</td>
                    <td className="p-3 text-sm md:text-base">{ToPersianNum(transTour?.amount)}</td>
                    <td className="p-3 text-sm md:text-base hidden md:block">{transTour?.type ==="Purchase" ? "ثبت نام در تور" :"-" }</td>
                    <td className="p-3 text-sm md:text-base">سفارش{transTour?.id.slice(0, 8)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>

  )
}

export default TransactionsPage