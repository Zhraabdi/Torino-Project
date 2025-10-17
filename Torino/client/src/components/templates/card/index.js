"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { translateVehicle } from "@/core/utils/helper";

function TourCard({ id, startDate, endDate, fleetVehicle, title, price, options, image }) {
  const router=useRouter();

  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  
  return (
    <div  className="  group  overflow-hidden border rounded-xl flex flex-col hover:shadow-xl transition-shadow duration-300 cursor-pointer group  ">
      <Link href={`/tour/${id}`} >
        <Image src={image} alt={title}  width={400} height={250}/>
      </Link>
      <div className="flex flex-col gap-3 p-3 ">
        <Link href={`/tour/${id}`} className="border-b-2">
          <h3 className=" text-xl text-color font-normal ">{title}</h3>
          <div className=" text-[15px]  text-gray-700 pt-3 pb-3">
          مدت {duration} روز -  {translateVehicle(fleetVehicle)} - {options[1]}
          </div>
        </Link>
        <div className="flex items-center justify-between">
      
        <Link href={`/tour/${id}`}><button className=" w-[99px] h-[29px]  rounded bg-primary text-background ">رزرو</button></Link>   
          <p> <span className="text-complementary">{price.toLocaleString('fa-ir')}</span> تومان</p>
        </div>
      </div>
    </div>


  );
}

export default TourCard;
