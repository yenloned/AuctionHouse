import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { UserRegister } from "../../interface/userAuth";
import { config } from "../../interface/config";

export const signupUser = async (signupInput: UserRegister) =>{
    const client = new ApolloClient({
        uri: config.GRAPHQL_URL,
        cache: new InMemoryCache(),
      })
    try{
      await client.mutate({
        mutation: gql
        `mutation{
          registerUser(input: {
            firstname: "${signupInput.firstname}", 
            lastname: "${signupInput.lastname}", 
            email: "${signupInput.email}", 
            password: "${signupInput.password}",
            confirm_password: "${signupInput.confirm_password}",
            })
          {
            currentItem
          }
        }`   
      })
    }catch(e: any){
        return e.message
    }

    
}