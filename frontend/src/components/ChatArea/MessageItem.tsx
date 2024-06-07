import { useSelector } from "react-redux";
import { cn } from "../../lib/utils";
import type { Message } from "../../store/slices/chat";
import { formatRelative } from "date-fns";
import { RootState } from "../../store/store";

type MessageItemProps = {
  message: Message;
}

const MessageItem = (props: MessageItemProps) => {

  const currentUser = useSelector((state: RootState) => state.user.users[0]);

  const { message } = props;

  return (
    <div className={cn(message.sent_by === currentUser.id? 'text-right' : '')}>
      <div className={cn('bg-gray-100 w-fit py-1 px-2 rounded-xl', message.sent_by === currentUser.id? 'ml-auto bg-black text-white' : 'mr-auto')}>
        {message.content}
      </div>
      <span className={cn('text-xs')}>{formatRelative(new Date(message.arrival_time), new Date())}</span>
    </div>
  );
}
 
export default MessageItem;