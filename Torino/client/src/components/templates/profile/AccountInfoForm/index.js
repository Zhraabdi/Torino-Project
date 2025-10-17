"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useUpdateAccountInfo } from "@/core/services/mutations";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountInfoSchema } from "@/core/schema";

function AccountInformation({ data }) {
  console.log(data);
  
  const [isEdit, setIsEdit] = useState(false);
  const {mutate,isPending}=useUpdateAccountInfo();
  const {
    register,
    handleSubmit,

    formState: { errors },

    reset ,
  } = useForm({resolver:yupResolver(accountInfoSchema)});

  const emailHandler = (formData) => {
 if (isPending) return ;  

mutate(formData, {
  onSuccess: () => {
      toast.success("ایمیل شما با موفقیت به‌روزرسانی شد");
      setIsEdit(false);
  },
  onError: () => {
      toast.error("خطا در به‌روزرسانی ایمیل");
  }
})


  };


  const canselHandlre = () => {
    reset({ email: data?.email || '' })
    setIsEdit(false)
  };
  return (
    <form onSubmit={handleSubmit(emailHandler)} className="border border-border rounded-[10px] text-sm md:text-xl">
      <div className="flex items-baseline justify-between p-4">
        <h4 className=" font-normal">{isEdit ? "ویرایش اطلاعات حساب کاربری" : "اطلاعات حساب کاربری"}</h4>
        {!isEdit && (
          <button className="text-complementary "
            onClick={() => {
              setIsEdit(true);
            }}
          >
            ویرایش ایمیل
          </button>
        )}
      </div>

      {isEdit ? (
        <>
          <div className="p-4">
            <div  className="flex flex-col gap-4">
              <div className="flex justify-between md:justify-start ">
                <p className="md:pl-6 font-medium ">شماره تلفن:</p>
                <p className="font-normal">{data?.data.mobile || "-"}</p>
              </div>
              <div>
                <input type="email" placeholder="آدرس ایمیل" {...register("email")} className={`w-full border-2 border-border rounded-md p-2  focus:border-green-700 focus:outline-none${errors.email ? 'border-red-500' : ''}`} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                <div className="flex gap-8 mt-4 flex-row-reverse ">
                  <button type="onSubmit" className="text-white bg-primary rounded-md p-2 w-36 ">تایید</button>
                  <button onClick={canselHandlre} className="text-primary rounded-md border-primary border-2 p-2 w-36 ">انصراف</button>
                </div > 
              </div> 
            </div>
          </div>
        </>
      ) : (
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm md:text-xl">
              <p className="font-normal">شماره تلفن</p>
              <p >{data?.data.mobile || "-"}</p>
            </div>
            <div className="flex justify-between ">
              <p className="font-normal">ایمیل</p>
              <p >{data?.data.email || "-"}</p>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default AccountInformation;
