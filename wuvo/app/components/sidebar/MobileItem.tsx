'use client'
import Link from "next/link"
import clsx from "clsx"
//define the interface:
interface MobileItemProps{
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon:Icon,
    active,
    onClick
}) => {

    //handle click function:
    const handleClick = () => {
        if(onClick) {
            return onClick();
        }
    }
  return (

    <Link href={href}
    onClick={handleClick}
    className={clsx(
        `
        group 
        flex 
        gap-x-3 
        text-sm 
        leading-6 
        font-semibold 
        w-full 
        justify-center 
        p-4 
        text-stone-500 
        hover:text-red-900 
        hover:bg-stone-200
        `,active && "bg-stone-200 text-red-900"
    )}
    >
        <Icon className="h-6 w-6"/>
    </Link>

  )
}

export default MobileItem