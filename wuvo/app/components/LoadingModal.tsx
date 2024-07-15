'use client'
import React, { Fragment } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { HashLoader } from 'react-spinners';

const LoadingModal = () => {
  return (
    <Transition show as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={() => {}}>
      <TransitionChild
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div 
          className="
            fixed 
            inset-0 
            bg-stone-100 
            bg-opacity-50 
            transition-opacity
          "
        />
      </TransitionChild>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div 
          className="
            flex 
            min-h-full 
            items-center 
            justify-center 
            p-4 
            text-center 
          "
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel>
              <HashLoader size={45} color="#CC5500" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}

export default LoadingModal