import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { config } from "../../interface/config";

export const getUserActivity = async(userID: string) => {
    const client = new ApolloClient({
        uri: config.GRAPHQL_URL,
        cache: new InMemoryCache(),
      })
      try{
        const {data} = await client.query({
            query: gql
            `query{
                findUser_Activity(id: "${userID}"){
                    _id
                    user_data{
                        firstname,
                        lastname,
                        iconURL
                    }
                    item_data{
                        _id,
                        name,
                        photo_URL
                    }
                    bid_price
                    timestamp
                    action
                }
              }`
        })
        return data
    }catch(e){
        return {}
    }
}