import ModalContainer from "@/components/partials/container/ModalContainer"
import CTA from "../CTA"
import SearchForm from "../searchForm"
import TourList from "../TourList"
import Banner from "../banner"
import Whytorino from "../why torino"

function HomePage({data}) {
  return (
    <>
    <Banner/>
    <div className="px-4">
    <SearchForm/>
    <TourList toursData={data}/>
    <ModalContainer/>
    <CTA/>
    <Whytorino/>
    </div>
    </>
  )
}

export default HomePage