'use client'
import { IconType } from "react-icons";
//define interface for Auth:
interface AuthSocialButtonProps {
    icon: IconType
    onClick: () => void;
  }

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    onClick
}) => {
  return (
    <button onClick={onClick} type="button"
        className="inline-flex
        w-full 
        justify-center 
        rounded-md 
        bg-white 
        px-4 
        py-2 
        text-orange-500 
        shadow-sm 
        ring-1 
        ring-inset 
        ring-stone-300 
        hover:bg-stone-50 
        focus:outline-offset-0"
    >
        <Icon/>
    </button>
  )
}

export default AuthSocialButton