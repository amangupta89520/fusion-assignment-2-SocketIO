import { useDispatch, useSelector } from "react-redux";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { AppDispatch, RootState } from "../../store/store";
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";
import { TrashIcon } from "@radix-ui/react-icons";
import { chatActions } from "../../store/slices/chat";

const ChatArea = () => {

  const dispatch = useDispatch<AppDispatch>();

  const currentChat = useSelector((state: RootState) => state.chat.currentChat)!;

  const handleClearChat = () => {
    if(currentChat.messages.length > 0) {
      dispatch(chatActions.clearChatHistory());
    }
  }

  return (
    <div className={cn("w-3/4 h-screen flex flex-col")}>
      <div className={cn("bg-gray-50 p-2 px-4 border-b cursor-pointer flex items-center space-x-4 justify-between")}>
        <div className={cn('flex items-center space-x-4')}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{currentChat.participants[0].username}</span>
        </div>
        <div className={cn('ml-auto')}>
          <button title="clear chat" onClick={handleClearChat}><TrashIcon className={cn('cursor-pointer bg-gray-200 rounded-full size-6 p-1 box-content')} /></button>
        </div>
      </div>
      <MessageList />
      <SendMessage />
    </div>
  );
};

export default ChatArea;
