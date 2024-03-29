import { LoginYourAccount } from "../comps/homepage/LoginYourAccount"
import { BrowseMarket } from "../comps/homepage/BrowseMarket"
import { BidItems } from "../comps/homepage/BidItems"
import { Homeheader } from "../comps/homepage/Homeheader"
import { CreateYourItem } from "../comps/homepage/CreateYourItem"
import { HaveFun } from "../comps/homepage/HaveFun"
import Footer from "../comps/Footer"

const Home = () => {
  return (
    <>
      <Homeheader/>
      <LoginYourAccount/>
      <BrowseMarket/>
      <BidItems/>
      <CreateYourItem/>
      <HaveFun/>
      <Footer/>
    </>
  )
}
export default Home
