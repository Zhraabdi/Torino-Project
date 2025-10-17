import HomePage from "@/components/templates/homePage";
import { serverFetch } from "@/core/services/http";

export default async function TourPage({ searchParams }) {
  const params = await searchParams;

  console.log(params);

  const formatted = { ...params };
  if (formatted["date[startDate]"]) {
    formatted.startDate = formatted["date[startDate]"];
    formatted.endDate = formatted["date[endDate]"];
    delete formatted["date[startDate]"];
    delete formatted["date[endDate]"];
  }

  const data = await serverFetch("tour", formatted, { cache: "no-store" });
  console.log(`http://localhost:6500/tour?${new URLSearchParams(formatted).toString()}`);

  return <HomePage data={data} />;
}
