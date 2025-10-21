"use client"

import { useGetUserData } from "@/core/services/queries";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import { useEffect } from "react";
import useAuthToken from "@/core/hook/useAuthToken";

function AuthProvider({children}) {

const { hasToken } = useAuthToken();

    const {data,isPending}=useGetUserData(hasToken);
    const router=useRouter()
    useEffect(()=>{
      if(!isPending && !data?.data && !hasToken) router.push("/")
    },[isPending, data, hasToken, router])

    if(isPending) return <PulseLoader color="#28a745" size={20} className="text-center mt-20" />

  return children;
 
}

export default AuthProvider