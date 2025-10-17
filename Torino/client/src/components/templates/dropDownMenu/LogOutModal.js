import Image from "next/image";

function LogOutModal({onConfirm,onCansel}) {
  
  return (
    <div className="fixed top-0 right-0 w-svw h-svh bg-black/10 z-10 backdrop-blur-sm">
      <div className="w-full h-full flex items-center justify-center">
        <div className="min-w-10 min-h-10 ">
          <div className=" flex flex-col items-center justify-center w-[358px] h-[262px] md:w-[561px] md:h-[262px] bg-background shadow-lg rounded-2xl">
          <Image src={"/images/close.png"} width={90} height={90} alt="close"/>
          <p className="pt-9 pb-9 text-sm md:text-lg">ایا میخواهید از حساب کاربری خود خارج شوید ؟</p>
          <div>
          <button  onClick={onCansel} className=" md:ml-9 ml-7 bg-slate-300 w-20 h-8 rounded-lg">خیر</button>
          <button onClick={onConfirm}  className="bg-rose-600 md:mr-9  mr-7 w-20 h-8 rounded-lg text-white " >تایید</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogOutModal;
