import { useContext, useEffect, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon, LockClosedIcon, ClockIcon, BellIcon } from "@heroicons/react/solid"
import { io, Socket } from "socket.io-client"
import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { allActivitiesType, allItemsType, fetchAllItemsType } from "../../interface/marketFetching"
import { checkIfTimeStillValid, convertActivityTimestamp, convertItemsTimestamp, convertRawTimeToFormatV2, convertRawTimeToFormatV3, initTimeDifference, secondsDifference} from "../../functions/dateTime"
import _ from "lodash"
import { activityChoice_active, activityChoice_inactive, sortingChoices_active, sortingChoices_inactive } from "../../styles/classNames"
import LoadingSpinner from "../../comps/LoadingSpinner"
import LoginStatusContext from "../../context/userLogin"
import { checkIfJWTexpired, getUserIdFromJWT } from "../../functions/checkJWT"
import { getUserActivity } from "../../functions/api/getUserActivity"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { ActivityForLobbyWS, marketLobbyForWS } from "../../interface/websocket"
import Footer from "../../comps/Footer"
import { config } from "../../interface/config"

export async function getServerSideProps(){
  const client = new ApolloClient({
    uri: config.GRAPHQL_URL,
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
      const {current_price} = d;
      if (!current_price){
        const current_price = d.start_price
        return {...d, current_price, time_left}
      }else{
        const current_price = d.current_price
        return {...d, current_price, time_left}
      }
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
  const loginStatus = useContext(LoginStatusContext)
  const [userID, setUserID] = useState("")
  const [isDefaultSorting, setIsDefaultSorting] = useState(true)
  const [sortingChoice, setSortingChoice] = useState("")
  const [sortedItems, setSortedItems] = useState<allItemsType[]>([])
  const [activityChoice, setActivityChoice] = useState("recent activity")
  const [currentPage, setCurrentPage] = useState(1)
  const [minPageLimit, setMinPageLimit] = useState(1)
  const [maxPageLimit, setMaxPageLimit] = useState(3)

  const [userActivity, setUserActivity] = useState<allActivitiesType[]>([])

  //socketio
  const [websocket, setWebsocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>()
  const [WS_recentActivity, setWS_recentActivity] = useState<ActivityForLobbyWS[]>()
  useEffect(() => {
    const socket = io(config.SOCKET_URL, {transports: ['websocket']})
    setWebsocket(socket)
  },[])

  websocket?.on("market_lobbyUpdate", (WS_newRecentActivity: marketLobbyForWS) => {
    console.log(WS_newRecentActivity)
    const {bidderActivity} = WS_newRecentActivity
    const {itemData} = WS_newRecentActivity
    if(WS_recentActivity){
      setWS_recentActivity([...WS_recentActivity, {...bidderActivity, ...itemData}])
    }else{
      setWS_recentActivity([{...bidderActivity, ...itemData}])
    }
  } )

  useEffect(() => {
    if(props.defaultSortedItems.length > 2*4){
      setMaxPageLimit(3)
    }else{
      setMaxPageLimit(Math.ceil(props.defaultSortedItems.length / 4))
    }

    const jwt_token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null
    if(!checkIfJWTexpired(jwt_token) && jwt_token){
      const decodedUserID = getUserIdFromJWT(jwt_token)
      if(decodedUserID){
        setUserID(decodedUserID)
        getUserActivity(decodedUserID).then((data) =>{
          const {findUser_Activity} = data

          const timeConvertedActivities = convertActivityTimestamp(findUser_Activity)
          const defaultSortedActivites = _.orderBy(timeConvertedActivities, "sortedTimestamp", "desc")
          setUserActivity(defaultSortedActivites)
        })
      }
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

  const switchActivityChoice = (choice: string) => {
    switch(choice){
      case "recent activity":
        setActivityChoice("recent activity")
        break;
      case "my activity":
        setActivityChoice("my activity")
        if(userID){
          getUserActivity(userID).then((data) =>{
            const {findUser_Activity} = data
            setUserActivity(findUser_Activity)
          })
        }
        break;
      default:
        console.log("switch error (activity)")
        break;
    }
  }

  const switchSortingChoice = (choice: string) => {
    setIsDefaultSorting(false)
    switch(choice){
      case "latest":
        setSortingChoice("")
        setIsDefaultSorting(true)
        break;
      case "highest price":
        setSortingChoice("highest price")
        setSortedItems(_.orderBy(props?.defaultSortedItems, "current_price", "desc"))
        break;
      case "lowest price":
        setSortingChoice("lowest price")
        setSortedItems(_.orderBy(props?.defaultSortedItems, "current_price", "asc"))
        break;
      case "ending soon":
        setSortingChoice("ending soon")
        setSortedItems(_.orderBy(props?.defaultSortedItems, "end_time", "asc"))
        break;
      default:
        console.log("switch error (sorting)")
        break;
    }
  }

  const redirectToItemPage = (id: string) => {
    window.location.replace(`/market/${id}`)
  }

  return (
    <>
    <div className="bg-neutral-50 dark:bg-gray-900 h-auto my-auto pt-10">
      <div className="flex flex-col justify-between mx-[8vw] md:flex-row">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className={activityChoice === "recent activity" ? activityChoice_active : activityChoice_inactive} onClick={() => switchActivityChoice("recent activity")}>Recent Activity</div>
          <div className={activityChoice === "my activity" ? activityChoice_active : activityChoice_inactive} onClick={() => switchActivityChoice("my activity")}>My Activity</div>
        </div>
        <div className="cursor-pointer p-1 px-4 font-family_header2 rounded-lg bg-gradient-to-t from-green-400 via-emerald-200 to-teal-300
        dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500" onClick={() => {window.location.replace("/market/create")}}>Create a Bidding Item</div>
      </div>
      <div className="mx-[8vw] h-[180px] mb-5 bg-gradient-to-t from-neutral-200 via-slate-50 to-neutral-100 shadow-lg px-10 border-x-2 py-4 overflow-y-scroll scrollbar
      dark:bg-gradient-to-t dark:from-neutral-900 dark:via-gray-900 dark:to-neutral-900 dark:border-neutral-900">
        { 
          activityChoice === "recent activity" && WS_recentActivity ?
          <div className="">
            {WS_recentActivity.map((eachActivity) => {
              return(
                <div className="flex gap-1 items-end" key={eachActivity.timestamp}>
                  <div className="font-family_body4 text-[1.1rem]">{convertRawTimeToFormatV3(eachActivity.timestamp)} (HKT)</div>
                  <img src={eachActivity.user_data.iconURL} className="w-[50px] h-[46px] border-2 mx-1"/>
                  <div className="text-[1.05rem]">{eachActivity.user_data.firstname} {eachActivity.user_data.lastname}</div>
                  <div className="text-[1.05rem]">{eachActivity.action}</div>
                  <img src={eachActivity.item_iconURL} className="w-[50px] h-[46px] border-2 mx-1" />
                  <div className="cursor-pointer text-[1.05rem] underline hover:text-emerald-500 dark:hover:text-sky-400" onClick={() => window.location.replace(`market/${eachActivity.item_id}`)}>{eachActivity.item_name}</div>
                  {
                    eachActivity.action === "bidded" || eachActivity.action === "won" ?
                    <div className="mx-1">by $ {eachActivity.bid_price}</div>  : ""
                  }
                </div>
              )
            })}
          </div>
          :
          activityChoice === "recent activity" && !WS_recentActivity ?
          <div className="flex flex-col text-center font-family_body1 items-center">
            <BellIcon className="w-[50px] h-[50px] mt-2"/>
            <div className="mt-2 text-lg">There is no activities so far.</div>
          </div>
          :
          activityChoice === "my activity" && userActivity[0] ?
          <div className="flex flex-col gap-2">
          {
            userActivity.slice().reverse().map((eachActivity) => {
              return(
                <div key={eachActivity._id} className="flex items-end gap-2">
                  <div className="font-family_body4 text-[1.1rem]">{convertRawTimeToFormatV3(eachActivity.timestamp)} (HKT)</div>
                  <img src={eachActivity.user_data.iconURL} className="w-[50px] h-[46px] border-2"/>
                  <div className="items-end text-[1.05rem]">{eachActivity.user_data.firstname} {eachActivity.user_data.lastname} {eachActivity.action}</div>
                  <img src={eachActivity.item_data.photo_URL} className="w-[50px] h-[46px] border-2" />
                  <div className="cursor-pointer text-[1.05rem] underline hover:text-emerald-500 dark:hover:text-sky-400" onClick={() => window.location.replace(`market/${eachActivity.item_data._id}`)}>{eachActivity.item_data.name}</div>
                  {
                    eachActivity.action === "bidded" || eachActivity.action === "won" ?
                    <div>by $ {eachActivity.bid_price}</div>  : ""
                  }
                </div>
              )
            })
          }
          </div>
          :
          activityChoice === "my activity" && userID ?
          <div className="flex flex-col text-center font-family_body1 items-center">
            <ClockIcon className="w-[50px] h-[50px] mt-2"/>
            <div className="mt-2 text-lg">You have no activities so far.</div>
          </div> 
          :
          activityChoice === "my activity" && !loginStatus?.isLoggedIn ?
          <div className="flex flex-col text-center font-family_body1 items-center">
            <LockClosedIcon className="w-[50px] h-[50px] mt-2"/>
            <div className="mt-2 text-lg">You have to login in order to check your activity.</div>
          </div>
          :
          ""
        }
      </div>
      <div className="flex mx-[8vw] justify-between mb-2 ">
        <div className="flex gap-2 items-end font-family_header3 text-lg scrollbar overflow-x-scroll">
          <div className={isDefaultSorting ? "cursor-pointer p-1 px-4 bg-gradient-to-t from-neutral-100 via-slate-50 to-neutral-100 border-2 border-neutral-300 dark:bg-gradient-to-t dark:from-neutral-800 dark:via-gray-800 dark:to-neutral-800 dark:border-neutral-400" : sortingChoices_inactive} onClick={() => switchSortingChoice("latest")}> Latest Created</div>
          <div className={sortingChoice === "lowest price" ? sortingChoices_active : sortingChoices_inactive} onClick={() => switchSortingChoice("lowest price")}> Lowest Price </div>
          <div className={sortingChoice === "highest price" ? sortingChoices_active : sortingChoices_inactive} onClick={() => switchSortingChoice("highest price")}> Highest Price </div>
          <div className={sortingChoice === "ending soon" ? sortingChoices_active : sortingChoices_inactive} onClick={() => switchSortingChoice("ending soon")}> Ending Soon </div>
        </div>
      </div>
      <div className="flex flex-col mx-[8vw] gap-20">
        {isDefaultSorting ?
        props?.defaultSortedItems.slice(4*currentPage-4,4*currentPage).map((eachItems) => {
          return (
          <div key={eachItems._id} className="flex flex-col items-center py-2 px-0 bg-gradient-to-t from-neutral-100 via-slate-50 to-neutral-200 shadow-lg border-x-2
          dark:bg-gradient-to-t dark:from-neutral-900 dark:via-gray-900 dark:to-neutral-900 dark:border-neutral-900 lg:flex-row lg:px-12 lg:py-6">
            <img src={eachItems.photo_URL} className="w-[200px] h-[200px]" />
            <div className="flex flex-col mx-[6vw] grow">
              <div className="font-family_header3 text-center font-semibold text-xl lg:text-left">{eachItems.name}</div>
              <div className="font-family_header2 text-[1.1rem]">
                <div className="block gap-1 text-center md:flex md:text-left">
                  <div className="flex gap-1 justify-center">
                    Created at 
                    <div className="text-emerald-500 dark:text-sky-400">
                    {convertRawTimeToFormatV2(eachItems.start_time)} (HKT)</div>
                  </div>
                  <div className="flex gap-1 justify-center">
                    By 
                    <div className="text-emerald-500 dark:text-sky-400">
                      {eachItems.owner_data.firstname} {eachItems.owner_data.lastname}
                    </div>
                  </div>
                </div>
              </div>
              <div className="scrollbar pr-2 my-2 text-base h-[50px] overflow-y-scroll snap-none lg:h-[75px] lg:text-justify">{eachItems.description}</div>
              <div className="flex flex-col mt-1 items-center justify-around text-lg font-family_body2 lg:flex-row">
                <div className="">Start Price: {eachItems.start_price}</div>
                <div className="flex gap-1 font-family_header3">
                  Current Price: <div className="text-yellow-400 dark:text-amber-300">{eachItems.current_price ? eachItems.current_price : eachItems.start_price}</div>
                </div>
                <div className="">Bid Increment: {eachItems.per_price}</div>
              </div>
              <div className="flex flex-col mt-1 items-center justify-around text-lg font-family_body2 md:flex-row">
                <div className="flex gap-1">
                    Top Bidder: <div className="text-emerald-500 dark:text-cyan-300">{eachItems.bidder_data ? `${eachItems.bidder_data.firstname} ${eachItems.bidder_data.lastname}` : " --"}</div>
                </div>
                <div className="flex gap-1">
                  Time Left: <div className={eachItems.time_left === "less than a minute" ? "text-red-600" : "text-emerald-500 dark:text-cyan-300"}>{eachItems.time_left}
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
        sortedItems.slice(4*currentPage-4,4*currentPage).map((eachItems) => {
          return (
            <div key={eachItems._id} className="flex flex-col items-center py-2 px-0 bg-gradient-to-t from-neutral-100 via-slate-50 to-neutral-200 shadow-lg border-x-2
            dark:bg-gradient-to-t dark:from-neutral-900 dark:via-gray-900 dark:to-neutral-900 dark:border-neutral-900 lg:flex-row lg:px-12 lg:py-6">
              <img src={eachItems.photo_URL} className="w-[200px] h-[200px]" />
              <div className="flex flex-col mx-[6vw] grow">
                <div className="font-family_header3 text-center font-semibold text-xl lg:text-left">{eachItems.name}</div>
                <div className="font-family_header2 text-[1.1rem]">
                  <div className="block gap-1 text-center md:flex md:text-left">
                    <div className="flex gap-1 justify-center">
                      Created at 
                      <div className="text-emerald-500 dark:text-sky-400">
                      {convertRawTimeToFormatV2(eachItems.start_time)} (HKT)</div>
                    </div>
                    <div className="flex gap-1 justify-center">
                      By 
                      <div className="text-emerald-500 dark:text-sky-400">
                        {eachItems.owner_data.firstname} {eachItems.owner_data.lastname}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="scrollbar pr-2 my-2 text-base h-[50px] overflow-y-scroll text-left snap-none lg:h-[75px] lg:text-justify">{eachItems.description}</div>
                <div className="flex flex-col mt-1 items-center justify-around text-lg font-family_body2 lg:flex-row">
                  <div className="">Start Price: {eachItems.start_price}</div>
                  <div className="flex gap-1 font-family_header3">
                    Current Price: <div className="text-yellow-400 dark:text-amber-300">{eachItems.current_price ? eachItems.current_price : eachItems.start_price}</div>
                  </div>
                  <div className="">Bid Increment: {eachItems.per_price}</div>
                </div>
                <div className="flex flex-col mt-1 items-center justify-around text-lg font-family_body2 md:flex-row">
                  <div className="flex gap-1">
                      Top Bidder: <div className="text-emerald-500 dark:text-cyan-300">{eachItems.bidder_data ? `${eachItems.bidder_data.firstname} ${eachItems.bidder_data.lastname}` : " --"}</div>
                  </div>
                  <div className="flex gap-1">
                    Time Left: <div className={eachItems.time_left === "less than a minute" ? "text-red-600" : "text-emerald-500 dark:text-cyan-300"}>{eachItems.time_left}
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
    </div>
    <Footer/>
    </>
  )
  }
  
  export default Market
  