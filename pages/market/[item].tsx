import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { fetchOneItemType } from "../../interface/marketFetching"
import _ from "lodash"
import { useEffect, useState } from "react"
import { convertItemTimestamp, convertRawTimeToFormat, convertRawTimeToFormatV2, secondsDifference, timeDifference } from "../../functions/dateTime"
import { formatMoney } from "../../functions/displayFormat"
import LoadingSpinner from "../../comps/LoadingSpinner"
import { io, Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { bidItem } from "../../functions/api/bidItem"
import { getUserIdFromJWT } from "../../functions/checkJWT"
import { ActivityForWS, marketItemForWS, TopBidderForWS } from "../../interface/websocket"

const ItemInMarket = (props: fetchOneItemType) => {
    const [timeLeft, setTimeLeft] = useState(0)
    const [bidAmount, setBidAmount] = useState(props.finalData.current_price ? props.finalData.current_price + props.finalData.per_price : props.finalData.start_price + props.finalData.per_price)
    const [userID, setUserID] = useState("")
    const [userToken, setUserToken] = useState<string|null>("")

    const [bidErrorMsg, setBidErrorMsg] = useState("")

    //socketio
    const [test, setTest] = useState("aaaa")
    const [test2, setTest2] = useState("")

    const [websocket, setWebsocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>()
    const [WS_currentprice, setWS_currentprice] = useState<number>()
    const bidder_time = props.finalData.bidder_time
    const [WS_topbidder, setWS_topbidder] = useState<TopBidderForWS | null>({...props.finalData.bidder_data, bidder_time})
    const [WS_activity, setWS_activity] = useState<ActivityForWS[] | null>(props.finalData.bidding_activities)

    useEffect(() => {
        //get userID
        const jwt_token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null
        setUserToken(jwt_token)
        setUserID(getUserIdFromJWT(jwt_token))
        //create websocket
        const client = io("http://localhost:6001", {transports: ["websocket"]})
        //join the item room for that websocket
        client.emit('join-room', props.finalData._id)
        setWebsocket(client)
    }, [])

    //socketio draft
    const tdata = {message: test}

    const handlepost = () => {
        console.log("clicked")
        websocket?.emit('send-message', tdata)
        receive_socket(websocket)
    }

    const receive_socket = async (socket: any) => {
        socket.on('message', (message: any) =>{
            console.log(message)
            setTest2(message)
        })
    }


    useEffect(() => {
        const {end_time} = props.finalData
        setInterval(() =>{
            setTimeLeft(secondsDifference(new Date().getTime(), parseInt(end_time)))
        }, 1000)
    })

    if(_.isEmpty(props)){
        return(
            <div>
                Fail to fetch data. This item might be outdated or not existed.
            </div>
        )
    }

    //socketio listen all bid submit
    websocket?.on('bid_update', (WS_bidItem: marketItemForWS) =>{
        if(WS_bidItem.bidderActivity && WS_bidItem.topBidder){
            setWS_topbidder(WS_bidItem.topBidder)
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
            console.log(result)
            if(result.bid_item.message){
                setBidErrorMsg(result.bid_item.message)
            }else if(!result.bid_item.message && !result.bid_item.item_result){
                setBidErrorMsg(result)
            }else{
                console.log("sending socket")
                const bidItemDto = {
                    ...bid_input,
                    email: result.bid_item.user_result.email,
                    firstname: result.bid_item.user_result.firstname,
                    lastname: result.bid_item.user_result.lastname,
                    user_id: result.bid_item.user_result._id,
                    iconURL: result.bid_item.user_result.iconURL,
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
            <div className="flex justify-evenly gap-5">
                <img src={props.finalData.photo_URL} className="w-[400px] h-[400px]"/>
                <div className="flex flex-col max-w-[750px]">
                    <div className="font-family_header3 text-2xl">
                        {props.finalData.name}
                    </div>
                    <div className="font-family_body3 text-sm text-neutral-600 dark:text-gray-300">
                        {props.finalData._id}
                    </div>
                    <div className="font-family_header2 text-lg">
                        Creator: {props.finalData.owner_data.firstname} {props.finalData.owner_data.lastname}</div>
                    <div className="font-family_header2 text-lg">
                        Create Time: {convertRawTimeToFormat(props.finalData.start_time)}
                    </div>
                    <div className="font-family_header2 text-lg">
                        Last Bid Time: {WS_topbidder?.bidder_time ? WS_topbidder?.bidder_time : "--"}
                    </div>
                    <div className="font-family_body2 pr-2 mt-4 text-justify h-[240px] overflow-y-scroll scrollbar text-neutral-900 dark:text-slate-100">{props.finalData.description}
                    </div>

                </div>
            </div>

            <div className="flex justify-evenly text-center my-8">
                <div className="flex flex-col w-[200px]">
                    <div className="font-family_header4 text-xl font-bold">Start Price</div>
                    <div className="font-family_header3 text-xl text-teal-400 dark:text-cyan-300">
                        $ {formatMoney(props.finalData.start_price)}
                    </div>
                </div>
                <div className="flex flex-col w-[200px]">
                    <div className="font-family_header4 text-xl font-bold">Current Price</div>
                    <div className="font-family_header3 text-xl text-teal-400 dark:text-cyan-300">
                        {props.finalData.current_price ? `$ ${formatMoney(props.finalData.current_price)}` : "--"}
                    </div>
                </div>
                <div className="flex flex-col w-[200px]">
                    <div className="font-family_header4 text-xl font-bold">Bid Increment</div>
                    <div className="font-family_header3 text-xl text-teal-400 dark:text-cyan-300">$ {formatMoney(props.finalData.per_price)}</div>
                </div>
            </div>

            <div className="text-center my-4">
                <div className="font-family_header4 text-xl font-bold">Bidding Time Left</div>
                <div className="font-family_body3 text-xl">
                    <div className={timeDifference(timeLeft).match(/.*hour*/) ? "text-amber-400" : timeDifference(timeLeft).match(/.*second*/) ? "text-red-600 dark:text-red-500" : "text-cyan-400"}>{timeDifference(timeLeft)}
                    </div>
                </div>
            </div>

            <div className="text-center my-4">
                <div className="font-family_header4 text-xl font-bold">Bid Amount</div>
                <div>
                    <input type="number" min={props.finalData.current_price ? props.finalData.current_price + props.finalData.per_price : props.finalData.start_price + props.finalData.per_price} value={bidAmount} step={props.finalData.per_price} className="text-center input_hiddenarrow font-familt_body3 text-lg rounded-md bg-gray-200 dark:bg-slate-800" onChange={(e) => {setBidAmount(parseInt(e.target.value))}}/>
                </div>
                <button className="px-2 mt-2 rounded-md font-family_header3 text-lg bg-gradient-to-t from-green-400 via-emerald-200 to-teal-300 dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500" onClick={() => submit_bid(userID, props.finalData._id, bidAmount, userToken)}>Confirm</button>
                <div className="text-red-500">{bidErrorMsg}</div>
            </div>

            <div className="flex justify-center gap-5 my-8">
                <div className="flex flex-col">
                    <div className="text-center font-family_header4 font-bold text-xl mb-1">Top Bidder</div>
                    <div className="flex py-4 px-6 w-[600px] h-[300px] justify-center items-center bg-gradient-to-t from-neutral-100 via-slate-50 to-neutral-200 shadow-lg border-x-2 dark:bg-gradient-to-t dark:from-neutral-900 dark:via-gray-900 dark:to-neutral-900 dark:border-neutral-900">
                        {WS_topbidder?.bidder_time ?
                        <div className="flex gap-5">
                            <img src={WS_topbidder.iconURL} className="w-[180px] h-[180px]"/>
                            <div>
                                <div className="flex flex-col text-center">
                                    <div className="font-family_header2 text-xl"> Username </div>
                                    <div className="font-family_body1 text-lg">{WS_topbidder.firstname} {WS_topbidder.lastname}</div>
                                </div>
                                <div className="flex flex-col  text-center">
                                    <div className="font-family_header2 text-xl"> User ID </div>
                                    <div className="font-family_body1 text-lg">{WS_topbidder._id}</div>
                                </div>
                                <div className="flex flex-col text-center">
                                    <div className="font-family_header2 text-xl"> Email Address </div>
                                    <div className="font-family_body1 text-lg">{WS_topbidder.email}</div>
                                </div>
                            </div>
                        </div>
                        :
                        "There is no Top Bidder yet. Submit your bid to be the first one."
                        }
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="text-center font-family_header4 font-bold text-xl mb-1">Bidding Activity</div>
                    <div className="flex flex-col py-4 px-6 w-[600px] bg-gradient-to-t from-neutral-100 via-slate-50 to-neutral-200 shadow-lg border-x-2 dark:bg-gradient-to-t dark:from-neutral-900 dark:via-gray-900 dark:to-neutral-900 dark:border-neutral-900">
                    </div>
                </div>
            </div>
            {timeDifference(timeLeft)}
            <button onClick={() => console.log(props)}>check props</button>
            <div>{test2}</div>
            <input onChange={(e) => {setTest(e.target.value)}}></input>
            <button onClick={() => handlepost()}>test socket</button>
        </div>
    )
}

export default ItemInMarket

export async function getServerSideProps(context: any) {
    const {query} = context
    const {item} = query

    const client = new ApolloClient({
        uri: "http://localhost:5000/graphql/",
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
                        lastname
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
            props:{}
        }
    }
}