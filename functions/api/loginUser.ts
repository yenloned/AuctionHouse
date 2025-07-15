import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { UserLogin } from "../../interface/userAuth";
import { config } from "../../interface/config";

export const loginUser = async (loginInput: UserLogin) =>{
    const client = new ApolloClient({
        uri: config.GRAPHQL_URL,
        cache: new InMemoryCache(),
      })
    try{
      const {data} = await client.mutate({
        mutation: gql
        `mutation{
          loginUser(input: {
            email: "${loginInput.email}", 
            password: "${loginInput.password}",
            })
          {
            access_token
            user{
                _id
                email
            }
          }
        }`   
      })
      return data;
    }catch(e: any){
        return e.message
    }

    
}