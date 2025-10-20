import HomePage from "@/components/templates/homePage";
import { serverFetch } from "@/core/services/http";

export default async function Home({ searchParams }) { 
  const resolvedParams = await searchParams;

  let params = { ...resolvedParams };
  if (params["date[startDate]"]) {
  params.startDate = params["date[startDate]"];
  params.endDate = params["date[endDate]"];
  delete params["date[startDate]"];
  delete params["date[endDate]"];
  }

  const data = await serverFetch("tour", params, { cache: "no-store" });

  console.log(data);

  return <HomePage data={data} />;
}
