import { citiesList } from "@/core/constants/constants";

const flattenObject = (obj, prefix = "") => {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}[${k}]` : k;
    if (typeof obj[k] === "object" && obj[k] !== null) {
      Object.assign(acc, flattenObject(obj[k], pre));
    } else {
      acc[pre] = obj[k];
    }
    return acc;
  }, {});
};


  const DateToIso = (date) => new Date(date).toISOString();

  const DateToPersian = date=> new Date(date).toLocaleDateString('fa-IR');


   const DateToPersianWeek=date=> new Date(date).toLocaleDateString('fa-IR',{year:"numeric",month:"2-digit",day:"2-digit", weekday: "long"});

   const getHour=(date)=>{
    const dateObj = new Date(date);
    const hour = dateObj.getUTCHours();
    const minute = dateObj.getUTCMinutes();
    const time=`${hour}:${minute}`;
    return time
   }

const translateVehicle = (type) => {
  if (!type) return "نامشخص";
  const map = {
    bus: "اتوبوس",
    airplane: "هواپیما",
    train: "قطار",
    car: "خودرو",
    ship : "کشتی",
    SUV : "ماشین",
  };
  return map[type] || type;
};
const getVehicleIcon = (type) => {
  const icons = {
    bus: "/icons/bus.svg",
    train: "/icons/train.svg",
    airplane: "/icons/airplane.svg",
    ship: "/icons/ship.svg",
    car: "/icons/bus.svg",
    SUV : "/icons/bus.svg",
  };

  return icons[type] || "/icons/default.svg";
};


const getCityName = (id) => {
  const city = citiesList.find((c) => c.id == id);
  return city ? city.name : "نامشخص";
};

 
  const ToPersianNum = num =>(new Number(num).toLocaleString('fa-ir'))


  


  export { flattenObject, DateToIso,DateToPersian,ToPersianNum,DateToPersianWeek,getHour, translateVehicle, getVehicleIcon, getCityName };