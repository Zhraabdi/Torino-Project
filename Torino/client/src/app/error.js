"use client"
import Image from "next/image"

function ErrorPage({ error, reset }) { 
    console.log(error)
    
    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-center m-auto min-h-screen">
            <div className="flex flex-col justify-between items-center md:gap-[80px] gap-7">
            <h2 className="md:text-4xl text-2xl">اتصال با سرور برقرار نیست!</h2>
            <p>لطفا بعدا دوباره امتحان کنید.</p>
            </div>
            <div> 
                <Image src={"/images/ErrorServer.png"} width={555} height={555} alt="خطای اتصال" /> 
                </div>
        </div>
                    )
                }
export default ErrorPage

