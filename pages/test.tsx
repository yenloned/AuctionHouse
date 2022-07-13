import { useState } from "react";
import { imageProps } from "../interface/cloudinary";

const Test: React.FC<imageProps> = ({images}) => {

    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();
  /*
    function handleOnChange(changeEvent: any) {

      const reader = new FileReader();
  
      reader.onload = function(onLoadEvent) {
        setImageSrc(onLoadEvent.target.result);
        setUploadData(undefined);
      }
  
      reader.readAsDataURL(changeEvent.target.files[0]);
    }
  
    async function handleOnSubmit(event: any) {
      event.preventDefault();
  
      const form = event.currentTarget;
      const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
  
      const formData = new FormData();
  
      for ( const file of fileInput.files ) {
        formData.append('file', file);
      }
      
      formData.append('upload_preset', 'auction-house-icons');
  
      const data = await fetch('https://api.cloudinary.com/v1_1/auction-house/image/upload', {
        method: 'POST',
        body: formData
      }).then(r => r.json());

      console.log(data)
  
      setImageSrc(data.secure_url);
      setUploadData(data);
    }
    <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <p>
            <input type="file" name="file" />
        </p>
        
        <img src={imageSrc} />
        
        {imageSrc && !uploadData && (
            <p>
            <button>Upload Files</button>
            </p>
        )}
        {uploadData && (
            <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
        )}
    </form>
*/

    return(
        <>
        <div>

            {images.map((data: any) => {
                return (
                    <>
                    
                        
                        <img src={data.image}></img>
                    </>
                )
                }
            )}
        </div>
        
        </>
    )
}

export async function getServerSideProps() {
    const results = await fetch(`https://${process.env.CLOUDINARY_KEY}:${process.env.CLOUDINARY_SECRET}@api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/resources/image`, {
    }).then((r) => r.json());

    const { resources } = results;

    const images = resources.map((resource: { asset_id?: any; public_id?: any; secure_url?: any; width?: any; height?: any; }) => {
        const { width, height } = resource;
        return {
            id: resource.asset_id,
            title: resource.public_id,
            image: resource.secure_url,
            width,
            height
        }
    })

    return{
        props:{
            images
        }
    }
}

export default Test;