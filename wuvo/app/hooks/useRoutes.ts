import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { BsChatTextFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
const useRoutes = () => {
    const pathname = usePathname();
    const { conversationId } = useConversation();
  //The array of route objects is memoized, meaning it will only be recalculated when the dependencies (pathname and conversationId) change.
    const routes = useMemo(() => [
      { 
        label: 'Chat', 
        href: '/conversations', 
        icon: BsChatTextFill,
        active: pathname === '/conversations' || !!conversationId
      },
      { 
        label: 'Users', 
        href: '/users', 
        icon: FaUsers , 
        active: pathname === '/users'
      },
      {
        label: 'Logout', 
        onClick: () => signOut(),
        href: '#',
        icon: FaSignOutAlt, 
      }
    ], [pathname, conversationId]);
  
    return routes;
  };
  
  export default useRoutes;