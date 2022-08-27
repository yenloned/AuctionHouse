import { ApolloClient, gql, InMemoryCache } from "@apollo/client"

export const registerGuestUser = async () =>{
  const client = new ApolloClient({
      uri: "https://auctionhouse-backend-api.herokuapp.com/graphql/",
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
    uri: "https://auctionhouse-backend-api.herokuapp.com/graphql/",
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