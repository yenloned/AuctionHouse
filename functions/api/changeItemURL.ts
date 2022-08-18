import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { ChangeItemURLType } from "../../interface/marketItems"


export const changeItemURL = async (input: ChangeItemURLType) => {
    const client = new ApolloClient({
        uri: "http://localhost:5000/graphql/",
        cache: new InMemoryCache(),
      })
      try{
        const {data} = await client.mutate({
            mutation: gql
            `mutation{
                change_item_photoURL(input: {
                    id: "${input.id}",
                    newURL: "${input.newURL}"
                })
                {
                    _id,
                    photo_URL
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