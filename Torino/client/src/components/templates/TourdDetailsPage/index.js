import ReservationButton from "@/components/atoms/ReservationButton";
import { DateToPersian, ToPersianNum } from "@/core/utils/helper"
import Image from "next/image"
import { translateVehicle, getCityName, getVehicleIcon } from "@/core/utils/helper";

function TourDetailPage({tourData}) {

  
  const start = new Date(tourData?.startDate);
  const end = new Date(tourData?.endDate);
  const day = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  const night=day-1;
  console.log(tourData);

const Featurs = [
    { title: "مبدا", icon: "/icons/routing-2.svg", value: getCityName(tourData?.originId || tourData?.origin?.id) },
    { title: "تاریخ رفت", icon: "/icons/calendar.svg", value: DateToPersian(tourData?.startDate) },
    { title: "تاریخ برگشت", icon: "/icons/calendar-2.svg", value: DateToPersian(tourData?.endDate) },
    { title: "حمل ونقل", icon: getVehicleIcon(tourData?.fleetVehicle), value: translateVehicle(tourData?.fleetVehicle) },
    { title: "ظرفیت", icon: "/icons/profile-2user.svg", value: tourData?.availableSeats },
    { title: "بیمه", icon: "/icons/security.svg", value: tourData?.insurance ? "دارد" : "ندارد" },
  ];
  

  return (
    <div className="bg-gray-100 min-h-svh py-8">
            <div className="max-w-[1440px] mx-auto px-8">
                <div className="bg-white rounded-2xl p-4 md:p-6">
                    <div className="grid  md:grid-cols-4 gap-6">
                       
                        <div className="col-span-4 md:col-span-1">
                            <Image
                                src={tourData.image}
                                alt={tourData.title}
                                width={1440}
                                height={480}
                                className="w-full aspect-[4/3] object-cover rounded-lg"
                            />
                        </div>

                      
                        <div className="gap-6 col-span-4 md:col-span-3">
                            <div className="flex justify-between md:flex-col md:justify-start md:gap-4 items-start">
                                <h1 className="text-2xl font-extrabold">{tourData.title}</h1>
                                <p className="font-medium text-gray-600 justify-self-end">{`${day} روز و ${night} شب`}</p>
                            </div>

                            <div className="flex justify-between mt-4 md:justify-start md:gap-20 md:mt-10 text-sm md:text-[20px] text-[#7D7D7D]">
                                <span className="flex items-center gap-1">
                                    <Image src="/icons/user-tick.svg" width={14} height={14} alt="تور لیدر" />
                                    تور لیدر از مبدا
                                </span>
                                <span className="flex items-center gap-1 justify-center">
                                    <Image src="/icons/map.svg" width={14} height={14} alt="برنامه" />
                                    برنامه سفر
                                </span>
                                <span className="flex items-center gap-1 justify-end">
                                    <Image src="/icons/medal-star.svg" width={14} height={14} alt="کیفیت" />
                                    تضمین کیفیت
                                </span>
                            </div>
                            <div className="md:hidden max-w-[290px] col-span-4 overflow-x-auto py-2">
                                <div className="flex gap-2 w-max">
                                    {Featurs.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center min-w-[120px]"
                                        >
                                            <div className="flex items-center justify-center w-10 h-10">
                                                <Image src={feature.icon} alt={feature.title} width={24} height={24} />
                                            </div>
                                            <p className="text-sm font-medium text-center whitespace-nowrap">
                                                {feature.title}
                                            </p>
                                            <div className="text-xs text-gray-600 text-center whitespace-nowrap">
                                                {feature.value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden md:flex  mt-14 flex-row-reverse justify-between items-center">
                            <ReservationButton id={tourData.id}/>
                                <div className="text-complementary text-2xl  font-semibold justify-self-end">
                                    {ToPersianNum(tourData.price)} <span className="text-sm text-gray-600">تومان</span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:grid grid-cols-6 md:col-span-4 gap-4 mt-6 border-r  *:border-l">

                            {Featurs.map((feature, index) => (
                                <div key={index} className="flex flex-col items-center gap-y-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <Image src={feature.icon} alt={feature.title} width={24} height={24} />

                                        <p className="text-lg font-medium text-center mt-2 text-gray-600">{feature.title}</p>
                                    </div>
                                    <div className="text-base text-center mt-1">{feature.value}</div>
                                </div>
                            ))}
                        </div>

                        <div className="md:hidden col-span-4 flex justify-between items-center ">
                          <ReservationButton id={tourData.id}/>
                            <div className="text-complementary text-2xl  font-semibold justify-self-end">
                                {ToPersianNum(tourData.price)} <span className="text-sm text-gray-600">تومان</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default TourDetailPage