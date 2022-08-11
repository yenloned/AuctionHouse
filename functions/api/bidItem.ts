import { ApolloClient, gql, InMemoryCache } from "@apollo/client"

export const bidItem = async (userID: string, item_id: string, bid_price: number, jwt_token: string|null) => {
    const client = new ApolloClient({
        uri: "http://localhost:5000/graphql/",
        cache: new InMemoryCache(),
        headers: {
            authorization: jwt_token ? `Bearer ${jwt_token}` : ""
        }
      })
      try{
        const {data} = await client.mutate({
            mutation: gql
            `mutation{
              bid_item(input: {item_id: "${item_id}", userID: "${userID}", bid_price: ${bid_price}}){
                item_result{
                    _id
                },
                user_result{
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