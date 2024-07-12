'use client'
import React, { useCallback, useState } from 'react'
import { Dialog, DialogTitle } from '@headlessui/react'
import { FiAlertTriangle } from 'react-icons/fi'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/modals/Modal';
import Button from '@/app/components/Button';
import useConversation from '@/app/hooks/useConversation';
import { toast } from 'react-hot-toast';

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}


const ConfirmModal:React.FC<ConfirmModalProps> = ({isOpen,onClose}) => {
  //router:
  const router = useRouter()
  //useConversation:
  const {conversationId} = useConversation();
  //loading state:
  const [isLoading, setIsLoading] = useState(false)
  //deleting:
  const onDelete = useCallback(() => {setIsLoading(true)
    axios.delete(`/api/conversations/${conversationId}`)
    .then(()=>{
      onClose();
      router.push('/conversations')
      router.refresh();
      toast.success('Conversation deleted successfully')
    })
    .catch((err)=>{
      toast.error('Something went wrong')
    })
    .finally(()=>{
      setIsLoading(false);})
  },[conversationId,router,onClose])
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full  bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true"/>
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <DialogTitle className="text-base font-bold leading-6 text-red-900" as='h3'>
            Delete Conversation
          </DialogTitle>
          <div className='mt-2'>
            <p className='text-sm text-stone-500'>Are you sure you want to delete this conversation?</p>
          </div>
        </div>
      </div>
      <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button
          disabled={isLoading}
          secondary
          onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmModal