"use client";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DatePicker } from "zaman";
import QueryString from "qs";
import { citiesList } from "@/core/constants/constants";
import { useGetTours } from "@/core/services/queries";
import useQuery from "@/core/hook/queri";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchSchema } from "@/core/schema";

const JalaliToIso = (date) => {
  if (!date) return null;
  const raw = typeof date === "string" ? date : date.toISOString();
  const [ymd] = raw.split("T");

  return ymd;
};


function SearchForm() {
  const { getQuery } = useQuery();
  const [query, setQuery] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(searchSchema),
  });
  
  
  const { data, refetch } = useGetTours(query);

  useEffect(() => {
    const originId = searchParams.get("originId");
    const destinationId = searchParams.get("destinationId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (originId && destinationId) {
      const q = { originId, destinationId, startDate, endDate };
      setQuery(q);
      reset(q);
      refetch();
    }
  }, [searchParams]);

  
  const submitHandler = (form) => {
    const { date, ...rest } = form;
    const cleanForm = {
      ...rest,
      ...(date ? { startDate: date.startDate, endDate: date.endDate } : {}),
    };
  
    const queryString = QueryString.stringify(cleanForm, { encode: true });
    console.log("Query:", `/tour?${queryString}`);
    router.push(`/tour?${queryString}`);
  };
  

  return (
    <div className=" w-full md:w-fit mx-auto p-4 mt-10">
      <h2 className="text-center md:text-[28px] font-medium text-[#595959] mb-8">
        <span className="text-primary">تورینو</span> برگزار کننده بهترین تور های
        داخلی و خارجی
      </h2>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="relative bg-white border p-4 rounded-3xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Image
                src={"/icons/location.svg"}
                width={20}
                height={20}
                alt="مبدا"
                priority
                className="w-5 h-5"
              />
            </div>
            <select
              {...register("originId")}
              className="w-full border rounded-xl py-2 px-10 md:border-white focus:ring-2 focus:ring-primary outline-none text-right appearance-none"
            >
              <option value="default">مبداء</option>
              {citiesList.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Image
                src={"/icons/global-search.svg"}
                width={20}
                height={20}
                alt="مقصد"
                priority
                className="w-5 h-5"
              />
            </div>
            <select
              {...register("destinationId")}
              className="w-full border rounded-xl py-2 px-10 md:border-white focus:ring-2 focus:ring-primary outline-none text-right appearance-none"
            >
              <option value="default">مقصد</option>
              {citiesList.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative col-span-2 md:col-span-1 px-3 py-2 rounded-lg md:w-fit">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 mx-auto">
              <Image
                src={"/icons/calendar-search.svg"}
                width={20}
                height={20}
                alt="تقویم"
                priority
                className="w-5 h-5"
              />
            </div>

            <Controller
              control={control}
              name="date"
              render={({ field: { onChange } }) => (
                <DatePicker
                  round="x2"
                  accentColor="#28A745"
                  onChange={(e) => {
                    console.log("from:", JalaliToIso(e.from));
                    console.log("to:", JalaliToIso(e.to));

                    onChange({
                      startDate: e.from ? JalaliToIso(e.from) : null,
                      endDate: e.to ? JalaliToIso(e.to) : null,
                      
                    });
                  }}
                  range
                  className="w-full "
                />
              )}
            />
          </div>
          <button className="w-full h-full col-span-2 md:col-span-1 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 md:mr-2">
            جستجو
          </button>
        </div>
      </form>
      <div  className="flex justify-center h-1 mt-2 text-red-500"><p>{errors.originId || errors.destinationId || errors.date ? "لطفا تمامی فیلد ها رو پر نمایید " : ""}</p></div>

    </div>
  );
}

export default SearchForm;
