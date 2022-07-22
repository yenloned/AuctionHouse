import { LoginYourAccount } from "../comps/homepage/LoginYourAccount"
import { BrowseMarket } from "../comps/homepage/BrowseMarket"
import { BidItems } from "../comps/homepage/BidItems"
import { Homeheader } from "../comps/homepage/Homeheader"
import { CreateYourItem } from "../comps/homepage/CreateYourItem"
import { HaveFun } from "../comps/homepage/HaveFun"
import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { useContext, useEffect } from "react"
import LoginStatusContext from "../context/userLogin"

/*
export async function letsgo(){
  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql/",
    cache: new InMemoryCache(),
  })
  try{
    const {data} = await client.mutate({
      mutation: gql
      `mutation{
        registerUser(input: {
          firstname: "Rudy", 
          lastname: "Yen", 
          email: "s2eeaa@gmail.com", 
          password: "asdasdasd",
          confirm_password: "fuck",
          })
        {
          firstname
        }
      }`
    })
    console.log(data)
  }catch(e){
    console.log(e)
    console.log("GHJKL")
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
  const loginStatus = useContext(LoginStatusContext)

  useEffect(() => {
    if(loginStatus){
      console.log(loginStatus.isLoggedIn)
    }
    //console.log(checkJWT(localStorage.getItem("jwt_token"), "62d8ba58454ca9ed6b41f5a0"))
  }, [])
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
