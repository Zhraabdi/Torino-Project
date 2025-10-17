import HomePage from "@/components/templates/homePage";
import { serverFetch } from "@/core/services/http";

export default async function Home({ searchParams }) { 
  console.log(searchParams);
  console.log(process.env.NEXT_PUBLIC_BASE_URL);


  let params = { ...searchParams };
  if (params["date[startDate]"]) {
  params.startDate = params["date[startDate]"];
  params.endDate = params["date[endDate]"];
  delete params["date[startDate]"];
  delete params["date[endDate]"];
  }

  console.log( params);

  const data = await serverFetch("tour", params, { cache: "no-store" });

  console.log(data);

  return <HomePage data={data} />;
}
