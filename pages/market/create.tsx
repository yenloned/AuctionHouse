import { useEffect, useState } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import { checkIfJWTexpired, checkJWTandID, getJWT, getUserIdFromJWT } from "../../functions/checkJWT";
import not_login_block from "../../media/png/not_login_block.png"
import NextImage from "next/image"
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { createItem } from "../../functions/api/createItem";

const Create = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [userID, setUserID] = useState("")

    useEffect(() => {
        const jwt_token = getJWT();
        if(checkIfJWTexpired(jwt_token) || !jwt_token || !checkJWTandID(jwt_token, getUserIdFromJWT(jwt_token))){
            setIsLoggedIn(false)
        }else{
            setUserID(getUserIdFromJWT(jwt_token))
        }
    }, [])

    const [imageSrc, setImageSrc] = useState<any>();
    const [imageErrorMsg, setImageErrorMsg] = useState("")
    const [uploadData, setUploadData] = useState();

    const [item_name, setItem_name] = useState("");
    const [item_description, setItem_description] = useState("");
    const [item_startprice, setItem_startprice] = useState(0);
    const [item_perprice, setItem_perprice] = useState(0);
    const [item_endtime, setItem_endtime] = useState("");



    function uploadImgChange(changeEvent: any) {

        const reader = new FileReader();
        const image: any = new Image();
  
        reader.onload = function(onLoadEvent) {
  
          if(onLoadEvent.target){
              image.src = onLoadEvent.target.result;
              setImageSrc(onLoadEvent.target.result);
              setImageErrorMsg("")
              image.onload = function(){
                  if(image.height < 200 || image.width < 200){
                      setImageSrc(undefined);
                      setUploadData(undefined);
                      setImageErrorMsg("Your Avatar should be at least 200*200 pixels");
                  }
              }
          }
          setUploadData(image.src);
        }
        reader.readAsDataURL(changeEvent.target.files[0]);
      }
      
      //submit image into Cloudinary after saving item data
      async function uploadImgSubmit(event: any) {
          event.preventDefault();
          const form = event.currentTarget;
          const fileInput: any = Array.from(form.elements).find(({ name }: any) => name === 'avatar_upload');
          const jwt_token = localStorage.getItem("jwt_token")
          if(!(/^image\/.*/.test(fileInput.files[0].type))){
              return setImageErrorMsg("Invalid File Type. Please try again.")
          }
          const formData = new FormData();
  
        formData.append("file", fileInput.files[0])
        const uploadResult = await fetch(`http://localhost:5000/cloudinary/uploadIcon`, {
          method: 'POST',
          body: JSON.stringify({data:imageSrc, public_id: "find_profile._id", upload_preset: "auction-house-icons"}),
          headers: {
              'Content-type': 'application/json',
              authorization: jwt_token ? `Bearer ${jwt_token}` : ""
          }
        }).then(r => r.json());
    
        if(uploadResult.secure_url){
          setImageSrc(uploadResult.secure_url);
          setUploadData(uploadResult);
        }
      }

    if(!isLoggedIn){
        setTimeout(() =>{
            window.location.replace("/account/login")
        }, 3000)
        return(
            <div className="flex flex-col h-[80vh] justify-center items-center text-lg">
                <NextImage src={not_login_block} width={150} height={150} className="w-[150px] h-[150px]" />
                <div>
                    You are required to login in order to create items.
                </div>
                <div className="flex gap-1">
                    You will be redirected to Login Page after <div className="text-cyan-600 dark:text-teal-400">3 seconds.</div>
                </div>
            </div>
        )
    }

    const create_item = async () => {
        const input = {
            name: item_name,
            description: item_description,
            owner_id: userID,
            start_price: item_startprice,
            per_price: item_perprice,
            start_time: new Date().toString(),
            end_time: item_endtime,
            photo_URL: "https://res.cloudinary.com/auction-house/image/upload/v1658996245/items/pokemoncard_xivkpc.jpg" //temp string
        }
        const data = await createItem(input)
        if(data.props.data.message === ""){
            //send image into backend
            //then change photoURL
        }

        console.log(data)
    }

    return(
        <div className="m-8">
            <div className="flex justify-around my-5">
                <div className="flex flex-col justify-center items-center">
                    <div className="font-family_header3 text-lg mb-2 ">Upload the Item Image here</div>
                    <div className="w-[500px] h-[420px] border-4 rounded-lg border-dashed">
                        <form method="post" onChange={uploadImgChange} onSubmit={uploadImgSubmit}>
                            {uploadData?
                            <div className="flex h-[400px] justify-center items-center text-center">
                                <img className="w-[380px] h-[350px]" width="128" height="128" src={imageSrc}/>
                            </div>
                            :
                            <label className="cursor-pointer text-sm underline" htmlFor="avatar_upload">
                                <div className="flex h-[400px] justify-center items-center text-center">
                                    <input type="file" className="hidden" name="avatar_upload" id="avatar_upload" accept="image/*"/>
                                    <PlusIcon width="120px" height="120px" className="cursor-pointer"/>
                                </div>
                            </label>
                            }
                        </form>
                    </div>
                    {uploadData?
                    <div className="flex cursor-pointer underline text-red-400 hover:text-red-600 dark:text-red-600 dark:hover:text-red-500" onClick={() => {setUploadData(undefined)}}>
                        <XIcon width="15px" height="25px" className=""/>
                        <div>Dismiss Image</div>
                    </div>
                    :
                    ""
                    }
                </div>
                

                <div className="flex flex-col gap-2">
                    <div className="">
                        Name
                    </div>
                    <input type="text" placeholder="" className="w-[500px] h-[40px] p-2 bg-neutral-100 dark:bg-neutral-700 rounded-md mb-3" onChange={(e) => {setItem_name(e.target.value)}}/>
                    
                    <div className="">
                        Description
                    </div>
                    <textarea placeholder="(Not more than 200words)" className="w-[500px] h-[100px] p-2 mb-3 bg-neutral-100 dark:bg-neutral-700 rounded-md" onChange={(e) => {setItem_description(e.target.value)}}/>

                    <div className="">
                        Starting Price
                    </div>
                    <input type="number" placeholder="(Not less than $1,000)" className="w-[500px] h-[40px] p-2 mb-3 bg-neutral-100 dark:bg-neutral-700 rounded-md" onChange={(e) => {setItem_startprice(parseInt(e.target.value))}}/>

                    <div className="">
                        Bid Increment Price
                    </div>
                    <input type="number" placeholder="(Not less than $100)" className="w-[500px] h-[40px] p-2 mb-3 bg-neutral-100 dark:bg-neutral-700 rounded-md" onChange={(e) => {setItem_perprice(parseInt(e.target.value))}}/>

                    <div className="">
                        Bid End Time
                    </div>
                    <input type="datetime-local" className="w-[500px] h-[40px] p-2 mb-3 bg-neutral-100 dark:bg-neutral-700 rounded-md" onChange={(e) => {setItem_endtime(new Date(e.target.value).toString())}}/>
                </div>
            </div>
            
            <div className="flex justify-center">
                <div className="w-32 p-1 mt-3 text-center cursor-pointer rounded-md text-lg bg-gradient-to-t from-emerald-100 via-green-400 to-teal-300 shadow-lg shadow-emerald-300/60 first-letter:dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500 dark:shadow-lg dark:shadow-cyan-500/60" onClick={() => {create_item()}}> Create Item </div>
            </div>
        </div>
    )
}

export default Create