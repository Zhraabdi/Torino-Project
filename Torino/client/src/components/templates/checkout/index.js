"use client"
import { useForm, Controller } from "react-hook-form"
import { useCheckOut, useUpdateAccountInfo } from "@/core/services/mutations";
import { useGetBasket, useGetUserData } from "@/core/services/queries";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToPersianNum } from "@/core/utils/helper";
import { personalDataSchema } from '@/core/schema';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { DatePicker } from "zaman";

import Calender from "../../../../public/icons/Calender";

function CheckOut() {

  const { data: user } = useGetUserData();
  const router = useRouter();
  const { data: basket } = useGetBasket();
  const { isPending: AccountInfoIsPending, mutate: AccountInfoMutate } = useUpdateAccountInfo();
  const { mutate: checkoutMutate, isPending: checkoutIsPending } = useCheckOut();

  const { register, handleSubmit, reset, getValues, control, formState: { errors } } = useForm({
    resolver: yupResolver(personalDataSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalCode: "",
      birthDate: "",
      gender: "",
    }
  });

  const start = new Date(basket?.data?.startDate);
  const end = new Date(basket?.data?.endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const nights = days - 1;

  useEffect(() => {
    if (user?.data) {
      reset({
        firstName: user?.data?.firstName || "",
        lastName: user?.data?.lastName || "",
        nationalCode: user?.data?.nationalCode || "",
        birthDate: user?.data?.birthDate || "",
        gender: user?.data?.gender || "",
      });
    }
  }, [user, reset]);

  const PersonalinfoHandler = (data) => {
    if (AccountInfoIsPending) return;
    AccountInfoMutate(data, {
      onSuccess: () => {
        toast.success("اطلاعات شخصی با موفقیت ثبت شد");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "خطا در ثبت اطلاعات شخصی");
      }
    });
  };

  const checkoutHandler = () => {
    if (checkoutIsPending) return;
    const checkoutData = {
      nationalCode: getValues("nationalCode"),
      fullName: `${getValues("firstName")} ${getValues("lastName")}`,
      gender: getValues("gender"),
      birthDate: getValues("birthDate")
        ? new Date(getValues("birthDate")).toISOString()
        : null,
    };
    
    checkoutMutate(checkoutData, {
      onSuccess: (data) => {
        console.log(data);
        router.push("/peyment?status===success");
      },
      onError: (error) => {
        toast.error(error.message || "پرداخت با خطا مواجه شد");
      }
    });
  };

  return (
    <div className="sm:flex max-w-[1440px] mx-8 md:mx-auto gap-6">
      <form onSubmit={handleSubmit(PersonalinfoHandler)} className="border border-border rounded-[10px] text-sm md:text-xl mt-6">
        <div className="p-4">
          <h4 className='font-medium mb-4'>اطلاعات شخصی مسافر</h4>
          <div className='flex max-sm:flex-col md:flex-wrap md:justify-start md:items-baseline md:gap-8 gap-2'>
            <div>
            <input {...register("firstName")} placeholder='نام' className={`border-2 p-2 my-2 md:mx-1 rounded-md border-border w-full ${errors.firstName ? 'border-red-500' : ''} focus:outline-none focus:border-green-700`} />
            <p className='text-red-500 text-sm h-4'>{errors.firstName ? errors?.firstName.message : null}</p>
            </div>
            <div>
            <input {...register("lastName")} placeholder='نام خانوادگی' className={`border-2 p-2 my-2 md:mx-1 rounded-md border-border w-full ${errors.lastName ? 'border-red-500' : ''} focus:outline-none focus:border-green-700`} />
            <p className='text-red-500 text-sm h-4'>{errors.lastName ? errors?.lastName.message : null}</p>
            </div>
            <div>
            <input {...register("nationalCode")} placeholder='کد ملی' className={`border-2 p-2 my-2 md:mx-1 rounded-md border-border w-full ${errors.nationalCode ? 'border-red-500' : ''} focus:border-green-700 focus:outline-none`} />
            <p className='text-red-500 text-sm h-4'>{errors.nationalCode ? errors?.nationalCode.message : null}</p>
            </div>
            <div>
            <div className="relative col-span-2 md:col-span-1 border-2 px-3 py-2 md:w-full  p-2 my-2 md:mx-1 rounded-md border-border w-full focus:border-green-700 focus:outline-none">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 mx-auto">
            <Calender className="h-5 w-5" />
            </div>
          <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, value } }) => (
          <DatePicker
          accentColor="#28A745"
          round="x2"
          value={value ? new Date(value) : null}
          defaultMonth={value ? new Date(value) : undefined}
          onChange={(e) => {
        if (e?.value) {
          onChange(e.value);
        } else {
          onChange(null);
        }
      }}
    />
  )}
/>

            </div>
            <p className='text-red-500 text-sm h-4'>{errors.birthDate ? "تاریخ را انتخاب نمایید" : null}</p>
            </div>
            <div>
              <select {...register("gender")} className={`border-2 p-2 my-2 md:mx-1 rounded-md border-border w-full ${errors.gender ? 'border-red-500' : ''} focus:border-green-700`}>
              <option value={""}>جنسیت خود را انتخاب کنید</option>
              <option value={"male"}>مرد</option>
              <option value={"female"}>زن</option>
              </select>
            </div>
            <button type="submit" className="col-span-2 bg-primary rounded-md py-2 px-4 text-white hover:bg-green-900">
              ثبت اطلاعات
            </button>
          </div>
        </div>
      </form>
      <div className="md:w-2/6">
        <div className="border border-border mt-6 px-2 py-4 rounded-xl divide-y-2 divide-dashed">
          <div className="flex justify-between items-center mb-3">
            <h1 className="font-medium md:text-2xl">{basket?.data?.title}</h1>
            <span className="text-xs text-gray-500">{`${days} روز و ${nights} شب`}</span>
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <div className="flex justify-between items-center">
              <p className="text-xs">قیمت نهایی</p>
              <p className="text-complementary">
                {ToPersianNum(basket?.data?.price)}
                <span className="text-sm text-text"> تومان</span>
              </p>
            </div>
            <button onClick={checkoutHandler} className="hover:bg-green-900 bg-primary rounded-md py-2 px-4 text-white">
              ثبت و خرید نهایی
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOut;
