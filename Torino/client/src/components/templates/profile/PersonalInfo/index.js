"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { personalDataSchema } from "@/core/schema";
import { useUpdateAccountInfo } from "@/core/services/mutations";
import { DateToPersian } from "@/core/utils/helper";
import { DatePicker } from "zaman";
import Calender from "../../../../../public/icons/Calender";


function PersonalInfo({ data }) {
  const [isEdit, setIsEdit] = useState(false);
  const { isPending, mutate } = useUpdateAccountInfo();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(personalDataSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalCode: "",
      birthDate: null,
      gender: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      const raw = data.data.birthDate;
      const birthDateAsDate = raw ? new Date(raw) : null;
      const validBirthDate =
        birthDateAsDate && !isNaN(birthDateAsDate.getTime())
          ? birthDateAsDate
          : null;

      reset({
        firstName: data.data.firstName || "",
        lastName: data.data.lastName || "",
        nationalCode: data.data.nationalCode || "",
        birthDate: validBirthDate,
        gender: data.data.gender || "",
      });
    }
  }, [data, reset]);

  const infoHandler = (formData) => {
    if (isPending) return;

    const payload = {
      ...formData,
      birthDate: formData.birthDate
        ? new Date(formData.birthDate).toISOString()
        : null,
    };

    console.log("📦 payload:", payload);

    mutate(payload, {
      onSuccess: () => {
        toast.success("اطلاعات شخصی شما با موفقیت ثبت شد");
        setIsEdit(false);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "خطا در ثبت اطلاعات شخصی"
        );
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(infoHandler)}
      className="border border-border rounded-[10px] text-sm md:text-xl mt-6"
    >
      <div className="p-4 flex items-baseline justify-between">
        <h4 className="font-medium">
          {isEdit ? "ویرایش اطلاعات شخصی" : "اطلاعات شخصی"}
        </h4>
        {!isEdit && (
          <button
            type="button"
            className="text-complementary"
            onClick={() => setIsEdit(true)}
          >
            ویرایش اطلاعات
          </button>
        )}
      </div>

      {isEdit ? (
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div>
              <input
                {...register("firstName")}
                placeholder="نام"
                className={`border-2 p-2 my-2 rounded-md border-border w-full ${
                  errors.firstName ? "border-red-500" : ""
                } focus:outline-none focus:border-green-700`}
              />
              <p className='text-red-500 text-sm h-4'>{errors.firstName ? errors?.firstName.message : null}</p>
            </div>
            <div>
              <input
                {...register("lastName")}
                placeholder="نام خانوادگی"
                className={`border-2 p-2 my-2 rounded-md border-border w-full ${
                  errors.lastName ? "border-red-500" : ""
                } focus:outline-none focus:border-green-700`}
              />
               <p className='text-red-500 text-sm h-4'>{errors.lastName ? errors?.lastName.message : null}</p>
            </div>

            <div>
              <input
                {...register("nationalCode")}
                placeholder="کد ملی"
                className={`border-2 p-2 my-2 rounded-md border-border w-full ${
                  errors.nationalCode ? "border-red-500" : ""
                } focus:outline-none focus:border-green-700`}
              />
               <p className='text-red-500 text-sm h-4'>{errors.nationalCode ? errors?.nationalCode.message : null}</p>
            </div>
            <div>
            <div className="relative col-span-2 md:col-span-1 border-2 px-3 py-[10px]  md:w-full  p-2 my-2 md:mx-1 rounded-md border-border w-full focus:border-green-700 focus:outline-none">
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
              <p className="text-red-500 text-sm h-4">{errors.birthDate ? "تاریخ را انتخاب نمایید" : null}</p>
            </div>
            <div>
              <select
                {...register("gender")}
                className={`border-2 p-2 my-2 rounded-md border-border w-full ${
                  errors.gender ? "border-red-500" : ""
                } focus:border-green-700`}
              >
                <option value="">جنسیت خود را انتخاب کنید</option>
                <option value="male">مرد</option>
                <option value="female">زن</option>
              </select>
              {errors?.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row-reverse gap-8 mt-4 border-t-2 border-border pt-4">
            <button
              type="submit"
              className="text-white bg-primary rounded-md p-2 w-36"
            >
              تایید
            </button>
            <button
              type="button"
              onClick={() => setIsEdit(false)}
              className="text-primary rounded-md border-primary border-2 p-2 w-36"
            >
              انصراف
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between md:justify-start gap-3">
              <p className="font-medium">نام</p>
              <p>{data?.data?.firstName || "-"}</p>
            </div>

            <div className="flex justify-between md:justify-start gap-3">
              <p className="font-medium">نام خانوادگی</p>
              <p>{data?.data?.lastName || "-"}</p>
            </div>

            <div className="flex justify-between md:justify-start gap-3">
              <p className="font-medium">کد ملی</p>
              <p>{data?.data?.nationalCode || "-"}</p>
            </div>

            <div className="flex justify-between md:justify-start gap-3">
              <p className="font-medium">جنسیت</p>
              <p>
                {data?.data?.gender === "male"
                  ? "مرد"
                  : data?.data?.gender === "female"
                  ? "زن"
                  : "-"}
              </p>
            </div>
            <div className="flex justify-between md:justify-start gap-3">
              <p className="font-medium">تاریخ تولد</p>
              <p>
                {data?.data?.birthDate
                  ? DateToPersian(data?.data?.birthDate)
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default PersonalInfo;
