import { useDispatch, useSelector } from "react-redux";
import { cn } from "../../lib/utils";
import { chatActions, type Chat } from "../../store/slices/chat";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import type { AppDispatch, RootState } from "../../store/store";

type ChatItemProps = {
  chat: Chat
}

const ChatItem = (props: ChatItemProps) => {

  const dispatch = useDispatch<AppDispatch>();

  const currentChat = useSelector((state: RootState) => state.chat.currentChat);

  const { chat } = props;

  const handleClick = () => {
    if(currentChat?.id != chat.id) {
      dispatch(chatActions.startChat(chat.id));
    }
  }

  return (
    <div onClick={handleClick} className={cn('bg-gray-50 p-2 rounded-md border cursor-pointer flex items-center space-x-4', chat.id === currentChat?.id? 'border-gray-400' : '')}>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <span>{ chat.participants[0].username }</span>
    </div>
  );
}
 
export default ChatItem;