import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { config } from "../../interface/config";

export const registerGuestUser = async () =>{
  const client = new ApolloClient({
      uri: config.GRAPHQL_URL,
      cache: new InMemoryCache(),
    })
  try{
    const {data} = await client.mutate({
      mutation: gql
      `mutation{
        createGuestUser
      }`   
    })
    return data
  }catch(e: any){
      return e.message
  }
}

export const loginGuestUser = async (guestEmail: string) => {
  const client = new ApolloClient({
    uri: config.GRAPHQL_URL,
    cache: new InMemoryCache(),
  })
  try{
    const {data} = await client.mutate({
      mutation: gql
      `mutation{
        loginGuestUser(input: "${guestEmail}"){
          access_token
        }
      }`   
    })
    return data
  }catch(e: any){
      return e.message
  }
}