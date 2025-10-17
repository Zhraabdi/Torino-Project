"use client"
import Link from "next/link"
import { useState } from "react"

import Profile from "../../../../public/icons/Profile"
import LogOut from "../../../../public/icons/LogOut"
import LogOutModal from "./LogOutModal"

function DropMenu ({mobile}) {
const [isLogOutModalOpen,setIsLogOutModalOpen]=useState(false)
console.log(isLogOutModalOpen);

const confirmLogOut=()=>{
  document.cookie = "accessToken=; max-age=0; path=/";
  document.cookie = "refreshToken=; max-age=0; path=/";
  window.location.replace("/");
}
const CanseslLogOut=()=>{
  setIsLogOutModalOpen(false);

}
  return (
      <>
    <div className="absolute  md:left-26 top-[88px] bg-background shadow-md w-44 h-32 md:w-[246px] md:h-[152px] border-1 border-secondary rounded-xl  grid  ">
       <p className=" flex bg-slate-200 w-44 md:w-[246px] h-[44px] font-semibold rounded-t-xl pt-3 pr-3 text-sm md:text-base hover:text-primary"><Profile /><span className="text-secondary ">{mobile}</span></p>
        <div ><Link href={"/profile"} className="flex  md:pt-2 md:pr-3 hover:text-primary"><Profile/>اطلاعات حساب کاربری</Link></div>
        <span className="border-b border-border mb-1 md:mb-4"></span>
        <button onClick={()=>setIsLogOutModalOpen(true)} className="flex  md:pb-1 md:pr-3 hover:text-red-500">  <LogOut  />خروج از حساب کاربری  </button>
    </div>

    {isLogOutModalOpen &&<LogOutModal  onConfirm={confirmLogOut} onCansel={CanseslLogOut}/>}
      </>
  )
}

export default DropMenu