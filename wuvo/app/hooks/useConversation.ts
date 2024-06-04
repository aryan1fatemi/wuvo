import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
//params gets the current URL parameters, which include conversationId if it's present in the URL.
  const params = useParams();
//The useMemo Hook only runs when one of its dependencies update. in this case, it only runs when params updates.
//this will prevent unnecessary rerenders of functions that depend on params.
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return '';
    }
    //The dependency array [params?.conversationId] ensures this computation only runs when params.conversationId changes.
    return params.conversationId as string;
  }, [params?.conversationId]);
//isOpen is a boolean that indicates whether a conversation is open.
  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(() => ({
    isOpen,
    conversationId
  }), [isOpen, conversationId]);
};

export default useConversation;