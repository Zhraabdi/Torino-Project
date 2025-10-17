"use client";
import OtpInput from "react-otp-input";
import ArrowLeft from "../../../../public/icons/Arrow-left";
import { useEffect, useState } from "react";
import { useCheckOtop } from "@/core/services/mutations";
import { useSendOtop } from "@/core/services/mutations";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function CheckOtp({ mobile, setIsOpen, setStep }) {
  const [code, setCode] = useState();
  const [timer, setTimer] = useState(60);
  const [isError, setIsError] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(true);

  const router = useRouter();
  const { isPending, mutate } = useCheckOtop();
  const { isPending: isResendPending, mutate: resendOtp } = useSendOtop();


  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const checkOtpHandler = (e) => {
    e.preventDefault();
    if (isPending) return;

    mutate(
      { mobile, code },
      {
        onSuccess: async () => {
          setIsOpen(false);
          router.push("/");
        },
        onError: (error) => {
          console.log(error);

          setIsError(error?.message);
        },
      }
    );
  };
  const resendOtpHandler = () => {
    if (isResendPending) return;

    resendOtp(
      { mobile },
      {
        onSuccess: (data) => {
          toast.success([ "کد تایید شما : ", data?.data?.code,]); 
          setTimer(60);
          setIsTimerActive(true);
        },
        onError: () => {
          toast.error("ارسال مجدد کد با خطا مواجه شد");
        },
      }
    );
  };

  const inputHandler = (code) => {
    if (!code) return toast.error("کد را وارد کنید");
    setCode(code);
  };
  return (
    <form
    onSubmit={checkOtpHandler}
    className=" relative bg-background w-[358px] h-[361px] md:w-[561px] md:h-[362px] rounded-[20px] flex flex-col items-center justify-center shadow-xl mt-10"
    >
    <div className="absolute top-4 left-5 font-bold cursor-pointer"
    onClick={() => setStep(1)}>
    <ArrowLeft className="transition-all ease-out hover:text-rose-600" />
    </div>
    <h3 className="font-medium text-[28px]"> کد تایید را وارد کنید. </h3>
    <div className=" mt-5 mb-2 flex flex-col gap-2 ">
    <p className="font-medium   text-center mb-2 ">
    کد تایید به شماره موبایل {mobile} ارسال شد{" "}
    </p>
    <div style={{ direction: "ltr" }}>
    <OtpInput
     value={code}
     onChange={inputHandler}
     numInputs={6}
     containerStyle={{
      gap: "12px",
      }}
      inputStyle={{
      border: "1px solid silver",
      borderRadius: "6px",
      width: "47px",
      height: "47px",
      textAlign: "center",
      color: "black",
      }}
      renderInput={(props) => <input {...props} />}
      shouldAutoFocus
      />
      </div>
      </div>
      <div className="mb-1 flex  items-center gap-4">
      {isTimerActive ? (
      <p className="text-gray-500 mt-2"> {timer} ثانیه تا ارسال کد بعدی</p>
      ) : (
      <button onClick={resendOtpHandler} className="text-primary font-medium mt-2">ارسال مجدد کد</button>
      )}
      </div>
      <p className="text-red-500 text-center mt-1 h-1">{isError ? isError : null}</p>
      <button
      type="submit"
      className="w-[278px] h-[54px] mb-3  md:w-[491px] md:h-[54px] bg-primary p-2  rounded-md border-x border-border mt-8 text-background shadow-md font-medium text-lg "
      >
      {" "}
      ورود به تورینو
      </button>
    </form>
  );
}

export default CheckOtp;
