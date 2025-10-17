import { object, string, date } from "yup";
import * as yup from "yup";

const bankAccountSchema = object({
  debitCard_code: string()
    .required("شماره کارت را وارد کنید")
    .length(16, "شماره کارت باید 16 رقم باشد"),
  shaba_code: string()
    .required("شماره شبا را وارد کنید")
    .length(24, "شماره شبا باید 24 رقم باشد"),
  accountIdentifier: string()
    .required("شماره حساب را وارد کنید")
    .length(10, "شماره حساب باید 10 رقم باشد"),
});
const personalDataSchema = object({
  firstName: string().required("نام خود را وارد کنید"),
  lastName: string().required("نام خانوادگی خود را وارد کنید"),
  nationalCode: string()
  .required("کد ملی خود را وارد کنید")
  .length(10, "کد ملی باید 10 رقم باشد"),
  birthDate: date().required("تاریخ تولد خود را وارد کنید"),
  gender: string().required("جنسیت خود را انتخاب کنید"),
 
});

const accountInfoSchema = object({
  email: string()
    .required("ایمیل خود را وارد کنید")
    .email("فرمت ایمیل نامعتبر است"),
});

const searchSchema = yup.object().shape({
  originId: yup
    .string()
    .required("مبدا را انتخاب کنید")
    .notOneOf(["default"], "مبدا را انتخاب کنید"),

  destinationId: yup
    .string()
    .required("مقصد را انتخاب کنید")
    .notOneOf(["default"], "مقصد را انتخاب کنید"),

  date: yup
    .object({
      startDate: yup.string().required("تاریخ شروع را انتخاب کنید"),
      endDate: yup.string().required("تاریخ پایان را انتخاب کنید"),
    })
    .required("تاریخ را انتخاب کنید"),
});

export { bankAccountSchema, accountInfoSchema, personalDataSchema, searchSchema };
