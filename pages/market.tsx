import { useEffect, useState } from "react"
import { SearchIcon } from "@heroicons/react/solid"
import { io, Socket } from "socket.io-client"
import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { addAbortSignal } from "stream"
import { allItemsType, fetchAllItemsType } from "../interface/itemsFetching"
import { initTimeDifference, secondsDifference, timeDifference } from "../functions/dateTime"

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
            time_left,
            photo_URL
          }
        }`
    })

    const finalData: allItemsType[] = data.findAll_items.map((d: allItemsType) => {
      const currTime = new Date().getTime()
      const endTime = new Date(d.end_time).getTime()
      const time_left = initTimeDifference(secondsDifference(currTime, endTime))

      return {...d, time_left}
    })
    
    return { props: {finalData} };
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
    <div className="bg-neutral-50 dark:bg-gray-900 h-screen my-auto pt-10">
      <div className="flex justify-between mx-[8vw]">
        <div className="flex gap-3">
          <div className="cursor-pointer p-1 px-4 font-family_header2 bg-gradient-to-t from-neutral-200 via-slate-50 to-neutral-100 border-x-2 border-t-2
          dark:bg-gradient-to-t dark:from-neutral-900 dark:via-gray-900 dark:to-neutral-900 dark:border-neutral-900">Recent Activity</div>
          <div className="cursor-pointer p-1 px-4 font-family_header2 bg-gradient-to-t from-neutral-200 via-slate-50 to-neutral-100 border-x-2 border-t-2
          dark:bg-gradient-to-t dark:from-neutral-900 dark:via-gray-900 dark:to-neutral-900 dark:border-neutral-900">My Activity</div>
        </div>
        <div className="cursor-pointer p-1 px-4 font-family_header2 rounded-lg bg-gradient-to-t from-green-400 via-emerald-200 to-teal-300
        dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500">Create a Bidding Item</div>
      </div>
      <div className="mx-[8vw] h-[160px] mb-5 bg-gradient-to-t from-neutral-100 via-slate-50 to-neutral-200 shadow-lg px-10 border-x-2
      dark:bg-gradient-to-t dark:from-neutral-900 dark:via-gray-900 dark:to-neutral-900 dark:border-neutral-900">
        hello<br/>
        hello<br/>
        hello<br/>
        hello<br/>
        hello
      </div>
      <div className="flex mx-[8vw] justify-between">
        <div className="flex gap-2 items-center">
          <div className="cursor-pointer p-1 px-4"> Latest </div>
          <div className="cursor-pointer p-1 px-4"> Lowest Price </div>
          <div className="cursor-pointer p-1 px-4"> Highest Price </div>
          <div className="cursor-pointer p-1 px-4"> Ending Soon </div>
        </div>
        <form className="text-center">
          <div className="flex items-center text-center bg-zinc-200 rounded-md 
          dark:bg-zinc-700 text-lg">
            <input type="text" className="w-full my-1 mx-3 focus:outline-none bg-zinc-200 h-8 p-1
            dark:bg-zinc-700" onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Search for items"/>
            <SearchIcon className="w-6 h-6 mx-4 cursor-pointer" onClick={() => console.log(searchItem)}/>
          </div>
        </form>
      </div>
      <button onClick={() => {console.log(props)}}>check props</button>
    </div>
  )
  }
  
  export default Market
  