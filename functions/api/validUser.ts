import { ApolloClient, gql, InMemoryCache } from "@apollo/client"

export const validUser = async (userId: string) => {
    const client = new ApolloClient({
        uri: "http://localhost:5000/graphql/",
        cache: new InMemoryCache(),
      })
    try{
      const {data} = await client.query({
        query: gql
        `query{
          find_user(id: ${userId}){
            _id
          }
        }`
      })
      return data;
    }catch(e: any){
        return e.message
    }
}