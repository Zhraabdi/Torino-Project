"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Profile from "../../../public/icons/Profile";
import SunFog from "../../../public/icons/SunFog";
import Conver from "../../../public/icons/Conver";
import AuthProvider from "@/components/partials/providers/AuthProvider";

function ProfileLayout({ children }) {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  return (
    <AuthProvider>
      <div className="px-8 ">
        <div className=" max-w-[1440px] grid md:grid-cols-4 md:gap-10 my-11 mx-auto">
          <div className="border-b md:border md:border-border md:rounded-2xl  h-fit ">
            <ul className=" flex justify-between text-xs font-medium  md:text-sm md:block md:divide-y  ">
              <li
                className={`flex px-5 py-3  items-center gap-2  ${
                isActive("/profile")? "md:bg-green-500/20 text-primary rounded-t-2xl" : ""} hover:text-primary transition-all`}
              >
              <Profile  />
              <Link href={"/profile"}> پروفایل من </Link>
              </li>
              <li
                className={`flex px-5 py-3 items-center gap-2 ${
                isActive("/profile/my-tours") ? "md:bg-green-500/20 text-primary " : ""} hover:text-primary transition-all `}
              >
                <Conver />
                <Link href={"/profile/my-tours"}>تورهای من</Link>
              </li>
              <li
                className={`flex px-5 py-3 items-center gap-2 ${
                isActive("/profile/transactions") ? " md:bg-green-500/20 text-primary md:rounded-b-2xl border-b" : ""} hover:text-primary transition-all`}
              >
              <SunFog />
              <Link href={"/profile/transactions"}>تراکنش ها</Link>
              </li>
            </ul>
          </div>
        <main className="md:col-span-3  md:mx-0 ">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}

export default ProfileLayout;
