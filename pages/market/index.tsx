import { useEffect, useState } from "react"
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import { io, Socket } from "socket.io-client"
import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { allItemsType, fetchAllItemsType } from "../../interface/itemsFetching"
import { checkIfTimeStillValid, convertItemsTimestamp, convertRawTimeToFormatV2, initTimeDifference, secondsDifference} from "../../functions/dateTime"
import _ from "lodash"

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
    }).filter((eachItem: allItemsType) =>{
      return checkIfTimeStillValid(eachItem.end_time)
    })

    const timeConvertedItems = convertItemsTimestamp(finalData)
    const defaultSortedItems = _.orderBy(timeConvertedItems, "start_time", "desc")
    
    return { props: {defaultSortedItems} };
  }catch(e){
    return { props: {}}
  }
}

const Market = (props: fetchAllItemsType) => {
  const [searchItem, setSearchItem] = useState("")
  const [isDefaultSorting, setIsDefaultSorting] = useState(true)
  const [sortingChoice, setSortingChoice] = useState("")
  const [sortedItems, setSortedItems] = useState<allItemsType[]>()
  const [currentPage, setCurrentPage] = useState(1)
  const [minPageLimit, setMinPageLimit] = useState(1)
  const [maxPageLimit, setMaxPageLimit] = useState(3)

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

  useEffect(() => {
    if(props.defaultSortedItems.length > 2){
      setMaxPageLimit(3)
    }else{
      setMaxPageLimit(props.defaultSortedItems.length)
    }
  }, [])

  let pages: number[] = [];
  for (let i=minPageLimit; i<=maxPageLimit; i++){
    pages.push(i)
  }

  const totalMaxPages = Math.ceil(props.defaultSortedItems.length / 4)

  const switchPage = (e: any) => {
    setCurrentPage(Number(e.target.id))
    if(Number(e.target.id) > maxPageLimit){
      setMinPageLimit(Math.ceil(Number(e.target.id)/3))
      setMaxPageLimit(Math.ceil(Number(e.target.id)/3) + 3)
    }
  }

  const nextPage = (e: number) => {
    setCurrentPage(currentPage + 1)
    if(currentPage+1 > maxPageLimit){
      setMinPageLimit(Math.floor(Number(e)/3)*3 + 1)
      if( (Math.floor(Number(e)/3)*3 + 3) < totalMaxPages ){
        setMaxPageLimit(Math.floor(Number(e)/3)*3 + 3)
      }else{
        setMaxPageLimit(totalMaxPages)
      }
    }
  }

  const prevPage = (e: number) => {
    setCurrentPage(currentPage - 1)
    if(currentPage-1 < minPageLimit){
      setMinPageLimit(Math.floor(Number(e)/3)*3 - 2)
      setMaxPageLimit(e - 1)
    }
  }

  const switching = () => {
    console.log("switched")
    setSortedItems(_.orderBy(props?.defaultSortedItems, "start_price", "asc"))
  }

  const redirectToItemPage = (id: string) => {
    window.location.replace(`/market/${id}`)
  }

  return (
    <div className="bg-neutral-50 dark:bg-gray-900 h-auto my-auto pt-10">
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
        <div className="flex gap-2 items-center font-family_header3 text-lg">
          <div className="cursor-pointer p-1 px-4"> Latest </div>
          <div className="cursor-pointer p-1 px-4"> Lowest Price </div>
          <div className="cursor-pointer p-1 px-4" onClick={switching}> Highest Price </div>
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
      <div className="flex flex-col mx-[8vw] gap-20">
        {isDefaultSorting ?
        props?.defaultSortedItems.slice(4*currentPage-4,4*currentPage).map((eachItems) => {
          return (
          <div key={eachItems._id} className="flex py-6 px-12 bg-gradient-to-t from-neutral-100 via-slate-50 to-neutral-200 shadow-lg border-x-2
          dark:bg-gradient-to-t dark:from-neutral-900 dark:via-gray-900 dark:to-neutral-900 dark:border-neutral-900">
            <img src={eachItems.photo_URL} className="w-[200px] h-[220px]" />
            <div className="flex flex-col mx-[6vw] grow">
              <div className="font-family_header3 font-semibold text-xl">{eachItems.name}</div>
              <div className="font-family_header2 text-[1.1rem]">
                <div className="flex gap-1">Created at <div className="text-emerald-400 dark:text-sky-400">{convertRawTimeToFormatV2(eachItems.start_time)} (HKT)</div> By <div>{eachItems.owner_data.firstname} {eachItems.owner_data.lastname}</div>
                </div>
              </div>
              <div className="scrollbar pr-2 my-2 text-base font-family_body h-[75px] overflow-y-scroll text-justify snap-none">{eachItems.description}</div>
              <div className="flex mt-1 justify-around text-lg font-family_body2">
                <div className="">Start Price: {eachItems.start_price}</div>
                <div className="">Per Price: {eachItems.per_price}</div>
                <div className="">Current Price: {eachItems.current_price ? eachItems.start_price :eachItems.start_price}</div>
              </div>
              <div className="flex mt-1 justify-around text-lg font-family_body2">
                {eachItems._id}
                <div className="">Top Bidder: {eachItems.bidder_data ? `${eachItems.bidder_data.firstname} ${eachItems.bidder_data.lastname}` : "--"}</div>
                <div className="flex">
                  Time Left: <div className={eachItems.time_left === "less than a minute" ? "text-red-600" : "text-blue-600 dark:text-cyan-300"}>{eachItems.time_left}
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <button className="text-center px-2 rounded-md font-family_header3 text-lg bg-gradient-to-t from-green-400 via-emerald-200 to-teal-300 dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500" onClick={() => redirectToItemPage(eachItems._id)}>Bid / See More Detail</button>
              </div>
            </div>
          </div>
          )
        })
        :
        ""
        }
      </div>
      <div className="flex justify-center gap-1 text-lg mt-5">
        <ChevronLeftIcon className="cursor-pointer w-6 h-8" onClick={currentPage === 1 ? () => {} : () => prevPage(currentPage)} />
        {pages.map((eachPage)=>{
          return (
            <div key={eachPage} id={eachPage.toString()} onClick={(e) => switchPage(e)}
            className={currentPage === eachPage ? "cursor-pointer text-sky-600 dark:text-sky-400 border-blue-400 border-2 px-2" : "cursor-pointer px-2 border-2"}>{eachPage}</div>
          )
        })}
        <ChevronRightIcon className="cursor-pointer w-6 h-8" onClick={currentPage === totalMaxPages ? () => {} : () => nextPage(currentPage)} />
      </div>
      <button onClick={() => {console.log(props?.defaultSortedItems)}}>check props</button><br/>
      <button onClick={() => {console.log(sortedItems)}}>check sortedProps</button>

    </div>
  )
  }
  
  export default Market
  