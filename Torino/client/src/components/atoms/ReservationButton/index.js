"use client";

import { useAddToBasket } from "@/core/services/mutations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import PeymentModal from "../peymentmodal";

function ReservationButton({ id }) {
  const [isModalOpen,setIsModalOpen]=useState(false)
  const { mutate, isPending } = useAddToBasket();
  const router = useRouter();
  const CartHandler = () => {
    if (isPending) return;
    setIsModalOpen(true)

    mutate(id, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        setTimeout(() => {
          router.push('/checkout');
        }, 1000);
      },
      onError: (error) => {
        console.log(error);

        toast.error("لطفا وارد حساب کاری خود شوید ");
      },
    });
  };
  return (
   
    <div>
      <button
        onClick={CartHandler}
        className="  hover:bg-green-900 bg-primary text-white py-2 px-8 rounded-md text-2xl"
      >
        رزرو و خرید
      </button>
      {isModalOpen && <PeymentModal/>}
    </div>
  );
}

export default ReservationButton;
