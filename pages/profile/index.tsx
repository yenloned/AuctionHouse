import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { useState } from "react"
import useSWR from "swr"
import { UploadIcon } from "@heroicons/react/solid"
import LoadingSpinner from "../../comps/LoadingSpinner"
import { currentItemType } from "../../interface/userProfile"

const fetcher = async () =>{
    const jwt_token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null
    const client = new ApolloClient({
        uri: "https://auctionhouse-backend-api.herokuapp.com/graphql/",
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
            currentItem_data{
                _id
                name
                start_price
                current_price
                photo_URL
            }
            biddingItem
            biddingItem_data{
                _id
                name
                start_price
                current_price
                photo_URL
            }
            winningItem
            iconURL
            }
        }`
    })
    return data;
}

const userPage = () => {

    const [imageSrc, setImageSrc] = useState<ArrayBuffer | string | null>();
    const [imageErrorMsg, setImageErrorMsg] = useState("")
    const [imageButton, setImageButton] = useState(false)
    const [imagePending, setImagePending] = useState(false)
    const [uploadData, setUploadData] = useState();
  
    function uploadImgChange(changeEvent: any) {

      const reader = new FileReader();
      const image: any = new Image();

      reader.onload = function(onLoadEvent) {

        setImageButton(!imageButton)

        if(onLoadEvent.target){
            image.src = onLoadEvent.target.result;
            setImageSrc(onLoadEvent.target.result);
            setImageErrorMsg("")
            image.onload = function(){
                if(image.height < 128 || image.width < 128){
                    setImageSrc(undefined);
                    setUploadData(undefined);
                    setImageErrorMsg("Your Avatar should be at least 128*128 pixels");
                }
            }
        }
        setUploadData(image.src);
      }
  
      reader.readAsDataURL(changeEvent.target.files[0]);
    }
  
    async function uploadImgSubmit(event: any) {
        setImagePending(true)
        event.preventDefault();
        const form = event.currentTarget;
        const fileInput: any = Array.from(form.elements).find(({ name }: any) => name === 'avatar_upload');
        const jwt_token = localStorage.getItem("jwt_token")
        if(!(/^image\/.*/.test(fileInput.files[0].type))){
            setImagePending(false);
            return setImageErrorMsg("Invalid File Type. Please try again.")
        }

      const uploadResult = await fetch(`https://auctionhouse-backend-api.herokuapp.com/cloudinary/uploadIcon`, {
        method: 'POST',
        body: JSON.stringify({data:imageSrc, public_id: find_profile._id, upload_preset: "auction-house-icons"}),
        headers: {
            'Content-type': 'application/json',
            authorization: jwt_token ? `Bearer ${jwt_token}` : ""
        }
      }).then(r => r.json());
  
      if(uploadResult.secure_url){
        setImageSrc(uploadResult.secure_url);
        setUploadData(uploadResult);
      }
      setImageButton(!imageButton)
      setImagePending(false)
    }
    
    //check JWT and return the profile data (if valid)
    const {data, error} = useSWR('profile', fetcher);
    if (error) window.location.replace('/account/login')
    if (!data) return LoadingSpinner()
    const { find_profile } = data;

    return(
        <div className="flex flex-col m-8 ml-[10vw] mr-[10vw] gap-5 text-center">
            <div className="flex flex-col min-h-[180px] gap-5 md:flex-row">
                <div className="basis-1/2 text-lg py-8 rounded-xl bg-gray-100 shadow-xl
                dark:bg-neutral-800 dark:shadow-xl dark:shadow-zinc-800/40">
                    <div className="flex flex-col items-center justify-evenly md:flex-row">
                        <div>
                        <form method="post" onChange={uploadImgChange} onSubmit={uploadImgSubmit}>
                            <img className="w-[128px] h-[128px]" width="128" height="128" src={!uploadData ? find_profile.iconURL : imageSrc}/>
                            <div className="flex flex-row justify-center">
                                <label className="cursor-pointer text-sm underline" htmlFor="avatar_upload">
                                    Change Avatar
                                </label>
                                <UploadIcon className="w-4 h-5"/>
                                <input type="file" className="hidden" name="avatar_upload" id="avatar_upload" accept="image/*"/>
                            </div>
                            <div className="text-sm text-rose-600 text-center px-3">
                                {imageErrorMsg}
                            </div>         
                            {uploadData && imageButton && (
                                <p>
                                <button className="px-3 text-base font-family_body1 rounded-md bg-gradient-to-t from-emerald-100 via-green-400 to-teal-300 shadow-lg shadow-emerald-300/60
                                dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500 dark:shadow-lg dark:shadow-cyan-500/60">{imagePending ? "Pending..." : "Confirm"}</button>
                                </p>
                            )}
                        </form>
                        </div>
                        <div className="text-left">
                            <div className="text-xl font-family_header1">{find_profile.firstname} {find_profile.lastname}</div>
                            <div className="text-sm font-family_header2 text-stone-600">{find_profile._id}</div>
                            <div className="text-lg font-family_header2">{find_profile.email}</div>
                        </div>
                    </div>
                </div>
                <div className="basis-1/2 text-lg py-8 rounded-xl bg-gray-100 shadow-xl
                dark:bg-neutral-800 dark:shadow-xl dark:shadow-zinc-800/40">
                    <div className="text-lg font-family_header1">Balance</div>
                    <div className="my-3 text-teal-400 dark:text-sky-400">$ {find_profile.balance}</div>
                </div>
            </div>
            <div className="text-lg py-5 min-h-[180px] rounded-xl bg-gray-100 shadow-xl font-family_header1
            dark:bg-neutral-800 dark:shadow-xl dark:shadow-zinc-800/40">
                {find_profile.currentItem_data?.length ?
                <div className="text-center">
                    <div className="mb-2">
                        Current Item
                    </div>
                    <div className="flex mx-10 gap-10 overflow-x-scroll scrollbar">
                        {find_profile.currentItem_data.map((eachCurrentItem: currentItemType) => {
                            return(
                                <div className="flex flex-col cursor-pointer p-4 shadow-xl bg-stone-200 dark:bg-stone-900" onClick={() => {window.location.replace(`/market/${eachCurrentItem._id}`)}}>
                                    <img src={eachCurrentItem.photo_URL} className="w-[150px] h-[140px]"></img>
                                    <div className="text-ellipsis overflow-hidden w-[140px] hover:text-sky-500 hover:dark:text-sky-300">{eachCurrentItem.name}</div>
                                    <div className="font-family_body2 font-bold text-teal-400 dark:text-sky-400">$ {eachCurrentItem.current_price ? eachCurrentItem.current_price : eachCurrentItem.start_price}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                : "You have no Items on Bid currently"}
            </div>
            <div className="text-lg py-10 min-h-[180px] rounded-xl bg-gray-100 shadow-xl font-family_header1
            dark:bg-neutral-800 dark:shadow-xl dark:shadow-zinc-800/40">
                {find_profile.biddingItem.length ? <div className="text-center">
                    <div className="mb-2">
                        Bidding Item
                    </div>
                    <div className="flex mx-10 gap-10 overflow-x-scroll scrollbar">
                        {find_profile.biddingItem_data.map((eachCurrentItem: currentItemType) => {
                            return(
                                <div className="flex flex-col cursor-pointer p-4 shadow-xl bg-stone-200 dark:bg-stone-900" onClick={() => {window.location.replace(`/market/${eachCurrentItem._id}`)}}>
                                    <img src={eachCurrentItem.photo_URL} className="w-[150px] h-[140px]"></img>
                                    <div className="text-ellipsis overflow-hidden w-[140px] hover:text-sky-500 hover:dark:text-sky-300">{eachCurrentItem.name}</div>
                                    <div className="font-family_body2 font-bold text-teal-400 dark:text-sky-400">$ {eachCurrentItem.current_price}</div>
                                </div>
                            )
                        })}
                    </div>
                </div> : "You have no Bidding Items currently"}
            </div>
        </div>
    )
}

export default userPage;