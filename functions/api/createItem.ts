import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { CreateItemType } from "../../interface/marketItems"


export const createItem = async (input: CreateItemType) => {
    const client = new ApolloClient({
        uri: "http://localhost:5000/graphql/",
        cache: new InMemoryCache(),
      })
      try{
        const {data} = await client.mutate({
            mutation: gql
            `mutation{
                createItem(input:{
                    name: "${input.name}",
                    description: "${input.description}",
                    owner_id: "${input.owner_id}",
                    start_price: ${input.start_price},
                    per_price: ${input.per_price}
                    start_time: "${input.start_time}",
                    end_time: "${input.end_time}",
                    photo_URL: "${input.photo_URL}"
                }){
                    activity_result{
                        item_id
                    },
                    message
                }
            }`
        })
        return {
            props: {
                data
            }
        }
    }catch(e){
        return {
            props:{}
        }
    }
}