"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "../../.././app/globals.css"
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { EffectCards } from "swiper/modules";
import Image from "next/image";


const Images=["/images/slide1.png","/images/slide2.png","/images/slide3.png","/images/slide4.png"]


function Whytorino() {
  return (
    <div className="mt-20 md:mt-32 mb-8 mx-8 md:mx-0">
            <div className="md:flex max-w-[1440px] mx-auto">
                <div className="md:w-1/2 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-b from-primary to-secondary rounded-full text-center text-2xl md:text-4xl font-extrabold text-white p-2 md:p-3">؟</div>
                        <p className="text-2xl md:text-4xl font-extrabold">چرا <span className='text-primary'>تورینو</span>؟</p>
                    </div>
                    <div className=" md:block mt-8">
                        <h4 className="text-2xl font-semibold">تور طبیعت گردی و تاریخی</h4>
                        <p className="text-[20px] font-light mt-9 leading-8 text-justify">
                        اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و تاریخی را خریداری کنید.
                        اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و تاریخی را خریداری کنید.
                        </p>
                    </div>
                </div>
                <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="mySwiper">
               {Images.map((image,index)=>(<SwiperSlide key={index}><div className="relative w-[389px] h-[400px] md:w-[389px] md:h-[400px] rounded-xl overflow-hidden"> 
               <Image src={image} alt="slide_photo" fill className="object-cover rounded-xl" sizes="(max-width: 768px) 300px, 389px"/>
                </div>
                </SwiperSlide>))}
               </Swiper>
                </div>
                </div>
  )
}

export default Whytorino