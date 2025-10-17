"use client"

import Close from "../../../../public/icons/Close";
import { isValidMobile } from "@/core/utils/validation";
import { useState } from "react";
import { useSendOtop } from "@/core/services/mutations";
import toast from "react-hot-toast";

function SendOtp({ setIsOpen, mobile, setMobile ,setStep}) {
  const [error, setError] = useState("");
  console.log(error);
  
  const {isPending,mutate}=useSendOtop();
  console.log(mobile);

  const submitHandler = (event) => {
    event.preventDefault();
    if(isPending) return ;
    if (!isValidMobile(mobile)) return setError("شماره معتبر وارد کنید!");
    setError("");
    mutate({mobile},
      {
        onSuccess: (data) => {
          toast.success([ "کد تایید شما : ", data?.data?.code,]); 
           setStep(2)
           console.log(data?.data?.code);
        },
        onError:(error)=>{
          console.log(error);
        }
      }
    )

  };
  return (
    <form
      onSubmit={submitHandler}
      className="text-right relative bg-background w-[358px] h-[361px] md:w-[561px] md:h-[362px] rounded-[20px] flex flex-col items-center justify-center shadow-xl"
    >
      <div
        onClick={() => setIsOpen(false)}
        className="absolute top-3 left-4 hover:text-red-800 cursor-pointer "
      >
        <Close />
      </div>
      <h3 className=" font-semibold text-[28px] ">ورود به تورینو</h3>
      <div className="flex flex-col gap-2 mt-14">
        <p className="text-zinc-600">شماره موبایل خود را وارد کنید </p>
        <input
          type="text" placeholder="4253***0912" dir="rtl" className={`placeholder:text-right p-2 rounded-md border border-border w-[278px] h-[54px] md:w-[491px] md:h-[54px] focus:outline-primary 
          ${error && "focus:outline-red-500"}`}
          onChange={(e) => setMobile(e.target.value)}
          value={mobile}
        />
        <p className="text-rose-600 mt-1 text-right h-3 ">{!!error ?  error : null}</p>
      </div>
      <button type="submit" className="w-[278px] h-[54px]  md:w-[491px] md:h-[54px] bg-primary p-2  rounded-md border-x border-border mt-6 text-background shadow-md font-medium text-lg">
        ارسال کد تایید
      </button>
    </form>
  );
}

export default SendOtp;
