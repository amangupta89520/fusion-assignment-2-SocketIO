import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import MessageItem from "./MessageItem";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../../lib/utils";

const MessageList = () => {

  const currentChat = useSelector((state: RootState) => state.chat.currentChat)!;

  return (
    <ScrollArea className={cn("p-4")}>
      <div className={cn('space-y-1')}>
        {currentChat.messages.map(message => <MessageItem key={message.arrival_time} message={message} />)}
      </div>
    </ScrollArea>
  );
}
 
export default MessageList;