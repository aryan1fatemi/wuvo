import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams{
    conversationId: string;

}

const ConversationId = async ({params}:{params:IParams}) => {

    //fetch conversation:
    const conversation = await getConversationById(params.conversationId)
    //getting messages from conversation:
    const messages = await getMessages(params.conversationId)
    //handling no conversation:
    if(!conversation){
        return(
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        )

    }
    return(
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={conversation} />
                <Body initialMessages = {messages}/>
                <Form />
            </div>
        </div>
    )
}

export default ConversationId;