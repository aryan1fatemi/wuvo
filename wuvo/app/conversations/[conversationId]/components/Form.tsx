'use client'
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiMiniPhoto, HiMiniPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from 'next-cloudinary';


const Form = () => {
    const { conversationId } = useConversation();
    const {register, handleSubmit, setValue, formState: {errors,}} = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })

    //submit handler:
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });
        axios.post('/api/messages',{...data, conversationId: conversationId})
    }

    //handling uploads:
    const handleUpload = (result: any) => {
        axios.post('/api/messages', {image: result?.info?.secure_url, conversationId})
    }

  return (
    <div className="py-4 px-4 bg-orange-50 border-t items-center gap-2 lg:gap-4 w-full flex flex-row">
        <CldUploadButton options={{ maxFiles:1 }} onSuccess={handleUpload} uploadPreset="phljkxhe">
            <HiMiniPhoto size={30} className="text-orange-500"/>
        </CldUploadButton>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
            <MessageInput id='message' register = {register} errors={errors} placeholder= "Write a message" required/>
            <button 
            type="submit" 
            className="
                rounded-full 
                p-2 
                bg-orange-500 
                cursor-pointer 
                hover:bg-orange-600 
                transition">
                <HiMiniPaperAirplane 
                    size={18}
                    className="text-white"
            />
            </button>
        </form>
    </div>
  )
}

export default Form