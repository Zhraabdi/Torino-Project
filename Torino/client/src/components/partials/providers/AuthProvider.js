"use client"

import { useGetUserData } from "@/core/services/queries";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import { useEffect } from "react";


function AuthProvider({children}) {
    const {data,isPending}=useGetUserData();
    const router=useRouter()
    useEffect(()=>{
      if(!isPending && !data?.data) router.push("/")
    },[isPending])

    if(isPending) return <PulseLoader color="#28a745" size={20} className="text-center mt-20" />

  return children;
 
}

export default AuthProvider