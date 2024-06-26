'use client'

import Avatar from "@/app/components/Avatar"
import useOtherUser from "@/app/hooks/useOtherUser"
import { Conversation, User } from "@prisma/client"
import Link from "next/link"
import { useMemo } from "react"
import { HiChevronLeft, HiOutlineEllipsisHorizontalCircle } from "react-icons/hi2"

interface HeaderProps {
    conversation: Conversation & {
      users: User[]
    }
  }

const Header: React.FC<HeaderProps> = ({conversation}) => {
    const otherUser = useOtherUser(conversation);
    const statusText = useMemo(()=>{
        if(conversation.isGroup){
            return `${conversation.users.length} members`
        }

        return "Active"
    },[conversation])
  return (
    <div className="bg-orange-50 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm">

        <div className="flex gap-3 items-center">
        <Link
          href="/conversations" 
          className="
            lg:hidden 
            block 
            text-orange-500 
            hover:text-orange-700 
            transition 
            cursor-pointer
          "
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user ={otherUser}/>
        <div className="flex flex-col">
          <div>
            {conversation.name || otherUser.name}
          </div>
          <div className="text-sm font-light text-stone-500">
            {statusText}
          </div>
        </div>
        </div>
        <HiOutlineEllipsisHorizontalCircle size={32} onClick={() => {}} className="text-orange-500 hover:text-orange-600 cursor-pointer transition"/>
    </div>
  )
}

export default Header