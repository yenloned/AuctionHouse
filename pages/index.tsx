//import { ApolloClient, InMemoryCache, gql } from "@apollo/client"

import { LoginYourAccount } from "../comps/homepage/LoginYourAccount"
import { BrowseMarket } from "../comps/homepage/BrowseMarket"
import { BidItems } from "../comps/homepage/BidItems"
import { Homeheader } from "../comps/homepage/Homeheader"
import { CreateYourItem } from "../comps/homepage/CreateYourItem"
import { HaveFun } from "../comps/homepage/HaveFun"

/*
export async function getServerSideProps(){
  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql/",
    cache: new InMemoryCache(),
  })
  const {data} = await client.query({
    query: gql
    `query{
      users{
        name
        _id
      }
    }`
  })
  return {
    props: {
      data: data.users
    }
  }
}

type UserProps = {
  data: [InUserProps]
}

type InUserProps = {
  name: string,
  _id: string
}
*/

const Home = () => {
  return (
    <>
      <Homeheader/>
      <LoginYourAccount/>
      <BrowseMarket/>
      <BidItems/>
      <CreateYourItem/>
      <HaveFun/>
    </>
  )
}
export default Home
