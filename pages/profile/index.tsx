import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import useSWR from "swr"

const fetcher = async () =>{
    const jwt_token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null
    const client = new ApolloClient({
        uri: "http://localhost:5000/graphql/",
        cache: new InMemoryCache(),
        headers: {
            authorization: jwt_token ? `Bearer ${jwt_token}` : ""
        }
      })
    const {data} = await client.query({
        query: gql
        `query{
        find_profile(input: "${jwt_token}"){
            _id
            email
            firstname
            lastname
            balance
            currentItem
            biddingItem
            winningItem
            }
        }`
    })
        console.log(data)
    return data;
}

const userPage = () => {
    const {data, error} = useSWR('profile', fetcher);

    if (error) return "Error occured"
    if (!data) return "Data loading"

    return(
        <div className="flex flex-col text-center m-8 ml-[10vw] mr-[10vw] gap-5">
            <div className="flex flex-row min-h-[180px] gap-5">
                <div className="basis-1/2 text-lg py-4 rounded-xl bg-gray-100 shadow-xl
                dark:bg-neutral-800 dark:shadow-xl dark:shadow-zinc-800/40">{data.find_profile.email}</div>
                <div className="basis-1/2 text-lg py-4 rounded-xl bg-gray-100 shadow-xl
                dark:bg-neutral-800 dark:shadow-xl dark:shadow-zinc-800/40">{data.find_profile.balance}</div>
            </div>
            <div className="text-lg py-4 min-h-[180px] rounded-xl bg-gray-100 shadow-xl
            dark:bg-neutral-800 dark:shadow-xl dark:shadow-zinc-800/40">{data.find_profile._id}</div>
            <div className="text-lg py-4 min-h-[180px] rounded-xl bg-gray-100 shadow-xl
            dark:bg-neutral-800 dark:shadow-xl dark:shadow-zinc-800/40">{data.find_profile.firstname}</div>
            <div className="text-lg py-4 min-h-[180px] rounded-xl bg-gray-100 shadow-xl
            dark:bg-neutral-800 dark:shadow-xl dark:shadow-zinc-800/40">{data.find_profile.lastname}</div>
        </div>
    )
}

export default userPage;