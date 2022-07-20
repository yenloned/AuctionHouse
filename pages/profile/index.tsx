import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"
import useSWR from "swr"
import { CloudUploadIcon, UploadIcon } from "@heroicons/react/solid"

const name = process.env.CLOUDINARY_NAME

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
    return data;
}

const userPage = () => {
    const router = useRouter();

    const [imageSrc, setImageSrc] = useState<ArrayBuffer | string | null>();
    const [imageErrorMsg, setImageErrorMsg] = useState("")
    const [uploadData, setUploadData] = useState();
  
    function uploadImgChange(changeEvent: any) {

      const reader = new FileReader();
      const image: any = new Image();

      reader.onload = function(onLoadEvent) {

        if(onLoadEvent.target){
            image.src = onLoadEvent.target.result;
            setImageSrc(onLoadEvent.target.result);
            setImageErrorMsg("")
            image.onload = function(){
                if(image.height < 128 || image.width < 128){
                    setImageSrc(null);
                    setImageErrorMsg("Your Avatar should be at least 128*128 pixels");
                }
            }
        }
        setUploadData(undefined);
      }
  
      reader.readAsDataURL(changeEvent.target.files[0]);
    }
  
    async function uploadImgSubmit(event: any) {
        event.preventDefault();
        const form = event.currentTarget;
        const fileInput: any = Array.from(form.elements).find(({ name }: any) => name === 'avatar_upload');
        const token = localStorage.getItem("jwt_token")
        if(!(/^image\/.*/.test(fileInput.files[0].type))){
            return setImageErrorMsg("Invalid File Type. Please try again.")
        }

        const imgData = await fetch(`http://localhost:5000/cloudinary/uploadIcon`, {
            method: 'POST',
            body: JSON.stringify({id:find_profile._id}),
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(r => r.json());

        
        const formData = new FormData();
        const imageData = imgData.data

        for ( const fileData of fileInput.files ) {
            formData.append("upload_preset", "auction-house-icons")
            formData.append('public_id', `${find_profile._id}_icon`)
            formData.append("file", fileData)
        }
        console.log(fileInput.files[0])
        for ( const [key, value] of Object.entries(imageData)){
            formData.append(`${key}`, `${value}`)
        }
  
      const uploadResult = await fetch(`https://api.cloudinary.com/v1_1/auction-house/image/upload`, {
        method: 'POST',
        body: formData,
      }).then(r => r.json());
  
      setImageSrc(uploadResult.secure_url);
      setUploadData(uploadResult);
    }

    const {data, error} = useSWR('profile', fetcher);
    if (error) router.push('/account/login')
    if (!data) return "Data loading..."
    const { find_profile } = data;

    return(
        <div className="flex flex-col m-8 ml-[10vw] mr-[10vw] gap-5 text-center">
            <div className="flex flex-row min-h-[180px] gap-5">
                <div className="basis-1/2 text-lg py-8 rounded-xl bg-gray-100 shadow-xl
                dark:bg-neutral-800 dark:shadow-xl dark:shadow-zinc-800/40">
                    <div className="flex flex-row justify-evenly">
                        <div>
                        <form method="post" onChange={uploadImgChange} onSubmit={uploadImgSubmit}>
                            <img className="w-[128px] h-[128px]" width="128" height="128" src={imageSrc}/>
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
                            {imageSrc && !uploadData && (
                                <p>
                                <button className="px-3 text-base font-family_body1 rounded-md bg-gradient-to-t from-emerald-100 via-green-400 to-teal-300 shadow-lg shadow-emerald-300/60
                                dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500 dark:shadow-lg dark:shadow-cyan-500/60">Confirm</button>
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
                dark:bg-neutral-800 dark:shadow-xl dark:shadow-zinc-800/40">{find_profile.balance}</div>
            </div>
            <div className="text-lg py-10 min-h-[180px] rounded-xl bg-gray-100 shadow-xl font-family_header1
            dark:bg-neutral-800 dark:shadow-xl dark:shadow-zinc-800/40">
                {find_profile.currentItem.length ? "there is" : "You have no Items on Bid currently"}
            </div>
            <div className="text-lg py-10 min-h-[180px] rounded-xl bg-gray-100 shadow-xl font-family_header1
            dark:bg-neutral-800 dark:shadow-xl dark:shadow-zinc-800/40">
                {find_profile.currentItem.length ? "there is" : "You have no Bidding Items currently"}
            </div>
            <div className="text-lg py-10 min-h-[180px] rounded-xl bg-gray-100 shadow-xl font-family_header1
            dark:bg-neutral-800 dark:shadow-xl dark:shadow-zinc-800/40">
                {find_profile.currentItem.length ? "there is" : "You have no Winning Items"}</div>
        </div>
    )
}

export default userPage;