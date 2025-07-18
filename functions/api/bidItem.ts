import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { config } from "../../interface/config";

export const bidItem = async (userID: string, item_id: string, bid_price: number, jwt_token: string|null, timestamp: string) => {
    const client = new ApolloClient({
        uri: config.GRAPHQL_URL,
        cache: new InMemoryCache(),
        headers: {
            authorization: jwt_token ? `Bearer ${jwt_token}` : ""
        }
      })
      try{
        const {data} = await client.mutate({
            mutation: gql
            `mutation{
              bid_item(input: {item_id: "${item_id}", userID: "${userID}", bid_price: ${bid_price}, timestamp: "${timestamp}"}){
                item_result{
                    _id,
                    name,
                    photo_URL
                },
                user_result{
                    email,
                    _id,
                    firstname,
                    lastname,
                    iconURL
                },
                message 
              }
            }`
        })
        return data;
    }catch(e){
        return {
            bid_item:{
                message: "You are required to login before submit the bid."
            }
        };
    }
}