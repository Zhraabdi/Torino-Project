"use client"
import Image from "next/image"
import CTA from "@/components/templates/CTA"

function ContactPage() {
    
    return ( 
        <>
        <div className="flex flex-col md:flex-row items-center justify-between m-auto w-full md:w-fit  mx-auto p-4 max-w-[1440px] md:mt-20 mt-3">
        <h2 className="md:text-4xl text-2xl md:text-right md:mt-0 text-center mt-8">تماس با ما و راه های ارتباطی با ما</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between m-auto w-full md:w-fit  mx-auto p-4 max-w-[1440px] mt-16 gap-10">
            <div class="bg-[url('/Images/contactback.png')] bg-no-repeat bg-center bg-auto w-[260px] h-[270px] relative">
            <div className="absolute top-[85px] right-[85px] flex flex-col justify-center items-center gap-3">
            <Image src={"/icons/call.svg"} width={20} height={20} alt="تماس"  className="md:mt-1"/>
            <p>شماره تماس</p>
            <a href="tel:021-77765769">021-77765769</a>
            </div>
            </div>

            <div>
            <Image src={"/images/contact.png"} width={500} height={500} alt="تماس با ما" />
            </div>

            <div class="bg-[url('/Images/contactback.png')] bg-no-repeat bg-center bg-auto w-[260px] h-[270px] relative">
            <div className="absolute top-[85px] right-[85px] flex flex-col justify-center items-center gap-3">
            <Image src={"/icons/call.svg"} width={20} height={20} alt="تماس"  className="md:mt-1"/>
            <p>شماره تماس</p>
            <a href="tel:021-77765769">021-77765769</a>
            </div>
            </div>
        </div>
        <CTA/>

        </>
    )
}

export default ContactPage