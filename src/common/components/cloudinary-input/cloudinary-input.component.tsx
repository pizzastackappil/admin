import { InputProps, useInput, useNotify } from "react-admin";
import { CloudinaryInputUi } from "../cloudinary-input-ui/cloudinary-input-ui.component";
import { FC } from "react";
import {  useCloudinarySignatureQuery } from "@app/core/types";
import axios, { AxiosError } from 'axios'
import { CloudinaryUploadDTO } from "./cloudinary-upload.dto";


export const CloudinaryInput: FC<InputProps> = ( props ) => {
  const { label, source} = props
  const computedLabel = String(label) ?? source;
  
  const notify = useNotify()  
  const { field: {onChange, value} } = useInput(props)

  const { data:cloudSignature, loading} = useCloudinarySignatureQuery({
    fetchPolicy: "network-only"
  })
    const onImageSelected = async(image:File) => {
        if(!cloudSignature?.cloudinarySignature) {
            return
        }
        const { cloudName, apiKey ,publicId,signature,timestamp} = cloudSignature.cloudinarySignature
         const url =`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`
         const formData = new FormData()
         formData.append('file',image)
         formData.append('api_key',apiKey)
         formData.append('public_id',publicId)
         formData.append('signature',signature)
         formData.append('timestamp',String(timestamp))
         formData.append('folder','menu')
     let data:CloudinaryUploadDTO;
     try {
        ( { data} = await axios.post<CloudinaryUploadDTO>(url,formData))
     } catch (error) {
            notify((error as AxiosError).message)
     }
     onChange(data!.public_id)

    }
  return (
    <CloudinaryInputUi
      label={computedLabel}
      value={value}
      disabled={loading}
      onImageSelected={onImageSelected}
    />
  );
};
