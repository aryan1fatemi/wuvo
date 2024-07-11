'use client'

interface ConfirmModalProps {
    isOpen?: boolean;
    onClose: () => void;
    children?: React.ReactNode; 
  }

const Modal:React.FC<ConfirmModalProps> = ({isOpen,onClose,children}) => {
  return (
    <div>Modal</div>
  )
}

export default Modal