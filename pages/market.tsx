import { useEffect, useState } from "react"
import { SearchIcon } from "@heroicons/react/solid"
import { io, Socket } from "socket.io-client"
import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { addAbortSignal } from "stream"
import { fetchAllItemsType } from "../interface/itemsFetching"

export async function getServerSideProps(){
  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql/",
    cache: new InMemoryCache(),
  })
  try{
    const {data} = await client.query({
        query: gql
        `query{
          findAll_items{
            _id,
            name,
            description,
            owner_data{
              _id,
              firstname,
              lastname,
              email,
              iconURL
            },
            start_price,
            per_price,
            current_price,
            bidder_data{
              _id,
              firstname,
              lastname,
              email,
              iconURL
            },
            start_time,
            end_time,
            bidder_time,
            photo_URL
          }
        }`
    })
    return { props: data };
  }catch(e){
    return { props: {}}
  }
}

const Market = (props: fetchAllItemsType | null) => {
  const [searchItem, setSearchItem] = useState("")
  //socketio draft
  /*
  const [test, setTest] = useState("aaaa")
  const [test2, setTest2] = useState("")
  const socket = io("http://localhost:5001", {transports: ['websocket']})

  const tdata = {message: "hello"}
  

  const handlepost = () => {
    console.log("clicked")
    socket.emit('send-message', tdata, (r: any) =>{
      console.log(r)
    })
  }

  socket.on('message', (message: any) =>{
    console.log(message)
    handleNewMessage(socket.id)
    handleNewMessage(message)
  })

  const handleNewMessage = (message: any) => {
    setTest2(message)
  }
  */

  return (
    <div>
      <form className="text-center">
      <div className="flex items-center w-3/4 mx-auto my-5 text-center bg-zinc-200 rounded-md 
      dark:bg-zinc-700 text-lg">
        <input type="text" className="w-full my-1 mx-3 focus:outline-none bg-zinc-200 h-8 p-1
        dark:bg-zinc-700" onChange={(e) => setSearchItem(e.target.value)}
        placeholder="Search for items"/>
        <SearchIcon className="w-6 h-6 mx-4 cursor-pointer" onClick={() => console.log(searchItem)}/>
      </div>
      </form>
      <button onClick={() => {console.log(props)}}>aa</button>
    </div>
  )
  }
  
  export default Market
  