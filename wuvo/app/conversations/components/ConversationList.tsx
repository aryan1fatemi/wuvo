'use client'

import { Conversation } from "@prisma/client"
import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "@/app/components/modals/GroupChatModal";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";


// defining interfaces:
interface ConversationListProps{
    initialItems: FullConversationType[];
    users: User[];
}

const ConversationList:React.FC<ConversationListProps> = ({initialItems,users}) => {
    const [items, setItems] = useState(initialItems);

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const router = useRouter();
    const session = useSession();
  
    const { conversationId, isOpen } = useConversation();

    const pusherKey = useMemo(()=>{return session.data?.user?.email},[session.data?.user?.email])

    useEffect(() => {
      if (!pusherKey) {
        return;
      }
  
      pusherClient.subscribe(pusherKey);
  
      const updateHandler = (conversation: FullConversationType) => {
        setItems((current) => current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages
            };
          }
  
          return currentConversation;
        }));
      }
  
      const newHandler = (conversation: FullConversationType) => {
        setItems((current) => {
          if (find(current, { id: conversation.id })) {
            return current;
          }
  
          return [conversation, ...current]
        });
      }
  
      const removeHandler = (conversation: FullConversationType) => {
        setItems((current) => {
          return [...current.filter((convo) => convo.id !== conversation.id)]
        });
        if (conversationId === conversation.id) {
          router.push('/conversations');
        }
      }
  
      pusherClient.bind('conversation:update', updateHandler)
      pusherClient.bind('conversation:new', newHandler)
      pusherClient.bind('conversation:remove', removeHandler)
    }, [pusherKey, router,conversationId]);

  return (
    <>
      <GroupChatModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} users={users}/>
      <aside className={clsx(`
          fixed 
          inset-y-0 
          pb-20
          lg:pb-0
          lg:left-20 
          lg:w-80 
          lg:block
          overflow-y-auto 
          border-r 
          border-stone-200 
        `, isOpen ? 'hidden' : 'block w-full left-0')}>
          <div className="px-5">
              <div className="flex justify-between mb-4 pt-4">
                  <div className="text-2xl font-bold text-red-900">
                    Messages
                  </div>
                  <div className="text-red-900 rounded-full p-2 bg-stone-50 cursor-pointer hover:opacity-75 transition" onClick={()=>setIsModalOpen(true)}>
                    <MdOutlineGroupAdd size={20}/>
                  </div>
              </div>
              {items.map((item) => (<ConversationBox key ={item.id} data={item} selected={conversationId===item.id}/>))}
          </div>
      </aside>
    </>
  )
}

export default ConversationList