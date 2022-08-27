import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { fetchOneItemType } from "../../interface/marketFetching"
import Image from "next/image"
import emptyBox from "../../media/png/emptyBox.png"
import expired from "../../media/png/expired.png"
import _ from "lodash"
import { useEffect, useState } from "react"
import { convertItemTimestamp, convertRawTimeToFormat, convertRawTimeToFormatV3, secondsDifference, timeDifference } from "../../functions/dateTime"
import { formatMoney } from "../../functions/displayFormat"
import LoadingSpinner from "../../comps/LoadingSpinner"
import { io, Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { bidItem } from "../../functions/api/bidItem"
import { getJWT, getUserIdFromJWT } from "../../functions/checkJWT"
import { ActivityForWS, marketItemForWS, TopBidderForWS } from "../../interface/websocket"

const ItemInMarket = (props: fetchOneItemType) => {
    if(_.isEmpty(props)){
        return(
            <div className="flex flex-col justify-center items-center h-[80vh] gap-3">
                <Image src={expired} width={300} height={300} className="w-[70px] h-[70px]" />
                <div className="font-family_header3 text-xl">
                    Fail to fetch data. This item might be outdated or not existed.
                </div>
                <button className="text-center px-2 rounded-md font-family_header3 text-lg bg-gradient-to-t from-green-400 via-emerald-200 to-teal-300 dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500" onClick={() => window.location.replace(`/market`)}>
                    Go Back to Market
                </button>
            </div>
        )
    }

    const [timeLeft, setTimeLeft] = useState(0)
    const [bidAmount, setBidAmount] = useState(props.finalData.current_price ? props.finalData.current_price + props.finalData.per_price : props.finalData.start_price + props.finalData.per_price)
    const [userID, setUserID] = useState("")
    const [userToken, setUserToken] = useState<string|null>("")

    const [bidErrorMsg, setBidErrorMsg] = useState("")

    //socketio
    const [websocket, setWebsocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>()
    const [WS_currentprice, setWS_currentprice] = useState<number>()
    const bidder_time = props.finalData.bidder_time
    const [WS_topbidder, setWS_topbidder] = useState<TopBidderForWS | null>({...props.finalData.bidder_data, bidder_time})
    const [WS_activity, setWS_activity] = useState<ActivityForWS[] | null>(props.finalData.bidding_activities)

    useEffect(() => {
        //get userID
        const jwt_token = getJWT()
        setUserToken(jwt_token)
        setUserID(getUserIdFromJWT(jwt_token))
        //create websocket
        const client = io("https://auctionhouse-backend-api.herokuapp.com/", {transports: ["websocket"]})
        //join the item room for that websocket
        client.emit('join-room', props.finalData._id)
        setWebsocket(client)
    }, [])

    useEffect(() => {
        const {end_time} = props.finalData
        setInterval(() =>{
            setTimeLeft(secondsDifference(new Date().getTime(), parseInt(end_time)))
        }, 1000)
    })

    //socketio listen all bid submit
    websocket?.on('bid_update', (WS_bidItem: marketItemForWS) =>{
        //console.log(WS_bidItem.bidderActivity)
        if(WS_bidItem.bidderActivity && WS_bidItem.topBidder){
            setWS_topbidder(WS_bidItem.topBidder)
            setWS_currentprice(WS_bidItem.bidderActivity.bid_price)
            if(WS_activity){
                setWS_activity([...WS_activity, WS_bidItem.bidderActivity])
            }else{
                setWS_activity([WS_bidItem.bidderActivity])
            }
        }
    })

    //graphql + socketio submit the bid
    const submit_bid = (userID: string, item_id: string, bidAmount: number, userToken: string|null) => {
        const timestamp = new Date().toString()
        const bid_input = {
            item_id: item_id,
            userID: userID,
            bid_price: bidAmount,
            timestamp: timestamp
        }
        bidItem(userID, item_id, bidAmount, userToken, timestamp).then((result) => {
            //console.log(result)
            if(result.bid_item.message){
                setBidErrorMsg(result.bid_item.message)
            }else if(!result.bid_item.message && !result.bid_item.item_result){
                setBidErrorMsg(result)
            }else{
                const bidItemDto = {
                    ...bid_input,
                    email: result.bid_item.user_result.email,
                    firstname: result.bid_item.user_result.firstname,
                    lastname: result.bid_item.user_result.lastname,
                    user_id: result.bid_item.user_result._id,
                    iconURL: result.bid_item.user_result.iconURL,
                    item_name: result.bid_item.item_result.name,
                    item_icon: result.bid_item.item_result.photo_URL,
                }
                websocket?.emit('bid_item', bidItemDto)
            }
        })
    }

    if(timeLeft == 0){
        return(
            <LoadingSpinner />
        )
    }
    return(
        <div className="bg-neutral-50 dark:bg-gray-900 h-auto my-auto pt-10">
            <div className="flex flex-col items-center justify-evenly gap-5 lg:flex-row">
                <img src={props.finalData.photo_URL} className="w-[400px] h-[400px]"/>
                <div className="flex flex-col max-w-[750px]">
                    <div className="font-family_header3 text-2xl">
                        {props.finalData.name}
                    </div>
                    <div className="font-family_body3 text-sm text-neutral-300 dark:text-gray-500">
                        {props.finalData._id}
                    </div>
                    <div className="flex gap-2 font-family_header2 text-lg">
                        Creator: <div className="text-cyan-600 dark:text-teal-300">{props.finalData.owner_data.firstname} {props.finalData.owner_data.lastname}</div>
                    </div>
                    <div className="flex gap-2 font-family_header2 text-lg">
                        Create Time: <div className="text-cyan-600 dark:text-teal-300">{convertRawTimeToFormat(props.finalData.start_time)}</div>
                    </div>
                    <div className="flex gap-2 font-family_header2 text-lg">
                        Last Bid Time: <div className="text-cyan-600 dark:text-teal-300">{WS_topbidder?.bidder_time ? WS_topbidder?.bidder_time : "--"}</div>
                    </div>
                    <div className="font-family_body2 text-lg pr-2 mt-4 text-justify h-[120px] overflow-y-scroll scrollbar text-neutral-900 dark:text-slate-100 md:h-[240px]">{props.finalData.description}
                    </div>

                </div>
            </div>

            <div className="flex flex-col items-center justify-evenly text-center my-8 sm:flex-row">
                <div className="flex flex-col w-[200px]">
                    <div className="font-family_header4 text-xl font-bold">Start Price</div>
                    <div className="font-family_header3 text-xl text-cyan-600 dark:text-cyan-300">
                        $ {formatMoney(props.finalData.start_price)}
                    </div>
                </div>
                <div className="flex flex-col w-[200px]">
                    <div className="font-family_header4 text-xl font-bold">Current Price</div>
                    <div className="font-family_header3 text-xl text-cyan-600 dark:text-cyan-300">
                        {WS_currentprice ? `$ ${formatMoney(WS_currentprice)}` : 
                        props.finalData.current_price ? `$ ${formatMoney(props.finalData.current_price)}`: 
                        "--"}
                    </div>
                </div>
                <div className="flex flex-col w-[200px]">
                    <div className="font-family_header4 text-xl font-bold">Bid Increment</div>
                    <div className="font-family_header3 text-xl text-cyan-600 dark:text-cyan-300">$ {formatMoney(props.finalData.per_price)}</div>
                </div>
            </div>

            <div className="text-center my-4">
                <div className="font-family_header4 text-xl font-bold">Bidding Time Left</div>
                <div className="font-family_body3 text-xl">
                    {parseInt(props.finalData.end_time) >= new Date().getTime() ?
                        <div className={timeDifference(timeLeft).match(/.*hour*/) ? "text-amber-400" : timeDifference(timeLeft).match(/.*second*/) ? "text-red-600 dark:text-red-500" : "font-bold text-teal-500 dark:text-cyan-400"}>{timeDifference(timeLeft)}
                        </div>
                    :
                        <div className="text-red-600 dark:text-red-500">
                            --Expired--
                        </div>
                    }
                </div>
            </div>

            <div className="text-center my-4">
                {parseInt(props.finalData.end_time) >= new Date().getTime() ?
                    <div>
                        <div className="font-family_header4 text-xl font-bold">Bid Amount</div>
                        <div>
                            <input type="number" min={props.finalData.current_price ? props.finalData.current_price + props.finalData.per_price : props.finalData.start_price + props.finalData.per_price} value={bidAmount} step={props.finalData.per_price} className="text-center input_hiddenarrow font-familt_body3 text-lg rounded-md bg-gray-200 dark:bg-slate-800" onChange={(e) => {setBidAmount(parseInt(e.target.value))}}/>
                        </div>
                        <button className="px-2 mt-2 rounded-md font-family_header3 text-lg bg-gradient-to-t from-green-400 via-emerald-200 to-teal-300 dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500" onClick={() => submit_bid(userID, props.finalData._id, bidAmount, userToken)}>Confirm</button>
                        <div className="text-red-500">{bidErrorMsg}</div>
                    </div>
                    :
                    ""
                }
            </div>

            <div className="flex flex-col items-center justify-center gap-5 my-8 lg:flex">
                <div className="flex flex-col">
                    <div className="text-center font-family_header4 font-bold text-xl mb-1">Top Bidder</div>
                    <div className="flex py-4 px-6 w-[350px] h-[300px] justify-center items-center bg-gradient-to-t from-neutral-100 via-slate-50 to-neutral-200 shadow-lg border-x-2 dark:bg-gradient-to-t dark:from-neutral-900 dark:via-gray-900 dark:to-neutral-900 dark:border-neutral-900 md:w-[600px]">
                        {WS_topbidder?.bidder_time ?
                        <div className="flex gap-5">
                            <img src={WS_topbidder.iconURL} className="w-[180px] h-[180px]"/>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col text-center">
                                    <div className="font-family_header3 text-lg"> Username </div>
                                    <div className="font-family_body2 text-lg">{WS_topbidder.firstname} {WS_topbidder.lastname}</div>
                                </div>
                                <div className="flex flex-col text-center">
                                    <div className="font-family_header3 text-lg"> User ID </div>
                                    <div className="font-family_body2 text-lg">{WS_topbidder._id}</div>
                                </div>
                                <div className="flex flex-col text-center">
                                    <div className="font-family_header3 text-lg"> Email Address </div>
                                    <div className="font-family_body2 text-lg">{WS_topbidder.email}</div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col font-family_body3 justify-center items-center gap-5">
                            <Image src={emptyBox} width={70} height={70} className="w-[70px] h-[70px]" />
                            There is no Top Bidder yet. Submit your bid to be the first one.
                        </div>
                        }
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="text-center font-family_header4 font-bold text-xl mb-1">Bidding Activity</div>
                    <div className="flex flex-col py-4 px-6 w-[350px] h-[300px] overflow-y-scroll scrollbar bg-gradient-to-t from-neutral-100 via-slate-50 to-neutral-200 shadow-lg border-x-2 dark:bg-gradient-to-t dark:from-neutral-900 dark:via-gray-900 dark:to-neutral-900 dark:border-neutral-900 md:w-[600px]">
                        {WS_activity ?
                            <div className="flex flex-col gap-2">
                            {WS_activity.slice().reverse().map(eachActivity => {
                                return(
                                    <div className="flex gap-1 items-center" key={eachActivity.timestamp}>
                                        <div className="font-bold">{convertRawTimeToFormatV3(eachActivity.timestamp)} (HKT)</div>
                                        <img src={eachActivity.user_data.iconURL} className="w-[55px] h-[55px] mx-2"/>
                                        <div>{eachActivity.user_data.firstname} {eachActivity.user_data.lastname}</div>
                                        <div>{eachActivity.action}</div>
                                        <div>
                                            {eachActivity.action === "bidded" ? <div className="flex gap-1">at <div className="text-teal-500 font-bold dark:text-cyan-300">${eachActivity.bid_price}</div></div> : `this item`}
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        :
                        ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemInMarket

export async function getServerSideProps(context: any) {
    const {query} = context
    const {item} = query

    const client = new ApolloClient({
        uri: "https://auctionhouse-backend-api.herokuapp.com/graphql/",
        cache: new InMemoryCache(),
      })
      try{
        const {data} = await client.query({
            query: gql
            `query{
              find_item(id: "${item}"){
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
                bidding_activities{
                    action,
                    bid_price,
                    timestamp
                    user_data{
                        firstname,
                        lastname,
                        iconURL
                    }
                },
                start_time,
                end_time,
                bidder_time,
                time_left,
                photo_URL
              }
            }`
        })
        const finalData = convertItemTimestamp(data.find_item)
        return {
            props: {
                finalData
            }
        }
    }catch(e){
        return {
            props: {
            }
        }
    }
}