import TourDetailPage from '@/components/templates/TourdDetailsPage'
import { serverFetch } from '@/core/services/http'

 async function TourList({ params }) {
    const tourData = await serverFetch(`tour/${params.id}`, null, {
      cache: "no-store",
      })
   console.log(tourData);
    
  return (
    <TourDetailPage tourData={tourData}/>
  )
}

export default TourList