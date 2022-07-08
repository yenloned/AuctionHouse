import { ApolloClient, gql, InMemoryCache } from "@apollo/client"

export async function getStaticProps(context: any ){
    const userId = localStorage.get
    const client = new ApolloClient({
        uri: "http://localhost:5000/graphql/",
        cache: new InMemoryCache(),
      })
    const {data} = await client.query({
        query: gql
        `query{
        find_user(id: {_id: "${params.userId}"}){
            _id,
            firstname,
            lastname,
            email,
            currentItem,
            biddingItem,
            winningItem
        }
        }`
    })
        console.log(data)
        return {props: {data}}
}


const userPage = () => {
    return(
        <div>
            userID PAGE
        </div>
    )
}

export default userPage;