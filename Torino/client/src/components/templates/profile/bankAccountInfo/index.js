"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankAccountSchema } from "@/core/schema";
import { useUpdateAccountInfo } from "@/core/services/mutations";
import toast from "react-hot-toast";

function BankAccountInfo({ data }) {
  const [isEdit, setIsEdit] = useState(false);
  const { mutate, isPending } = useUpdateAccountInfo();
  const {
    register,
    handleSubmit,

    formState: { errors },

    reset,
  } = useForm({
    resolver: yupResolver(bankAccountSchema),
    defaultValues: {
      debitCard_code: "",
      shaba_code: "",
      accountIdentifier: "",
    },
  });

  const accountInfoHandler = (formData) => {
    if (isPending) return;
    mutate(
      { payment: formData },
      {
        onSuccess: (data) => {
          toast.success(data?.data.message);
        },
        onError: (data) => {
          toast.error(data?.data?.error);
        },
      }
    );
    setIsEdit(false);
  };

  return (
    <form
      onSubmit={handleSubmit(accountInfoHandler)}
      className=" border border-border rounded-[10px] text-sm md:text-xl mt-6  "
    >
      <div className="p-4 flex  items-baseline justify-between ">
        <h4 className="font-medium">
          {isEdit ? "ویرایش حساب بانکی" : "اطلاعت حساب بانکی"}
        </h4>
        {!isEdit && (
          <button
            onClick={() => setIsEdit(true)}
            className="text-complementary"
          >
            {" "}
            ویرایش اطلاعات
          </button>
        )}
      </div>
      {isEdit ? (
        <div className="p-4 ">
          {/* //*:border-2 *:p-2 *:my-2 *:md:mx-3 *:rounded-md *:border-border*:w-full */}
          <div className=" lg:flex gap-2 ">
            <div className="w-full ">
              <input
                placeholder="شماره کارت"
                {...register("debitCard_code")}
                className="border-2 p-2 my-2 md:mx-1 rounded-md border-border w-full  focus:border-green-700 focus:outline-none"
              />
              {errors.debitCard_code && (
                <p className="text-red-500">{errors.debitCard_code.message}</p>
              )}
            </div>
            <div className="w-full ">
              <input
                placeholder="شماره شبا"
                {...register("shaba_code")}
                className="border-2 p-2 my-2 md:mx-1 rounded-md border-border w-full  focus:border-green-700 focus:outline-none"
              />
              {errors.shaba_code && (
                <p className="text-red-500">{errors.shaba_code.message}</p>
              )}
            </div>
            <div className="w-full">
              <input
                placeholder="شماره حساب"
                {...register("accountIdentifier")}
                className="border-2 p-2 my-2 md:mx-1 rounded-md border-border w-full  focus:border-green-700 focus:outline-none"
              />
              {errors.accountIdentifier && (
                <p className="text-red-500 ">
                  {errors.accountIdentifier.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row-reverse gap-8 mt-4 border-t-2 border-border pt-4 ">
            <button
              type="onSubmit"
              className="text-white bg-primary rounded-md p-2 w-36 "
            >
              تایید
            </button>
            <button
              onClick={() => setIsEdit(false)}
              className="text-primary rounded-md border-primary border-2 p-2 w-36 "
            >
              انصراف
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="flex gap-4">
              <p className="font-medium">شماره شبا</p>
              <p  >{data?.data?.payment?.shaba_code || "-"}</p>
            </div>
            <div className="flex gap-4">
              <p className="font-medium"> شماره کارت</p>
              <p >{data?.data?.payment?.debitCard_code || "-"}</p>
            </div>
            <div className="flex gap-4 ">
              <p className="font-medium"> شماره حساب</p>
              <p >{data?.data?.payment?.accountIdentifier || "-"}</p>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default BankAccountInfo;
