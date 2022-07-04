import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { UserRegister } from "../../interfaces/userRegter";

export const signupUser = async (signupInput: UserRegister) =>{
    const client = new ApolloClient({
        uri: "http://localhost:5000/graphql/",
        cache: new InMemoryCache(),
      })
    try{
      //TODO: bad request 400 / no errorMsg returned
        const signupResult = await client.mutate({
          mutation: gql
          `mutation{
            registerUser(input: {
              firstname: ${signupInput.firstname}, 
              lastname: ${signupInput.lastname}, 
              email: ${signupInput.email}, 
              password: ${signupInput.password},
              confirm_password: ${signupInput.confirm_password},
              })
            {
              currentItem
            }
          }`   
        })
        return signupResult;
    }catch(e){
        return ({errorMsg: "Unkown Error occured, please try again later."})
    }

    
}