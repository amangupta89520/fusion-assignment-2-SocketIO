import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import type { User } from "../../store/slices/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { cn } from "../../lib/utils";
import { chatActions } from "../../store/slices/chat";

type SearchListProps = {
  searchVal: string;
  resetSearch: () => void;
}

const SearchList = (props: SearchListProps) => {

  const dispatch = useDispatch<AppDispatch>();
  const [usersToShow, setUsersToShow] = useState<User[] | null>(null);

  const currentUser = useSelector((state: RootState) => state.user.users[0]);
  const allUsers = useSelector((state: RootState) => state.user.users.slice(1));
  const allChats = useSelector((state: RootState) => state.chat.chats);

  const { searchVal, resetSearch } = props;

  useEffect(() => {
    if(allUsers.length > 0 && searchVal) {
      setUsersToShow(allUsers.filter(user => user.username.includes(searchVal)));
    }
  }, [searchVal]);

  const handleClick = (user: User) => {
    const isExistingChat = allChats.find(chat => chat.id === `${allUsers[0].id}-${user.id}-chat`);
    if(!isExistingChat) {
      dispatch(chatActions.startNewChat({
        id: `${currentUser.id}-${user.id}-chat`,
        messages: [],
        participants: [
          {
            id: user.id,
            username: user.username
          },
          {
            id: currentUser.id,
            username: currentUser.username
          }
        ]
      }));
    } else {
      dispatch(chatActions.startChat(isExistingChat.id));
    }
    resetSearch();
  }

  return (
    <div className={cn('space-y-3')}>
      {usersToShow && usersToShow.length > 0 && usersToShow.map(user => (
        <div key={user.id} onClick={() => handleClick(user)} className={cn('bg-gray-50 p-2 rounded-md border cursor-pointer flex items-center space-x-4')}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{ user.username }</span>
        </div>
      ))}
      {!usersToShow || usersToShow.length === 0 && <span>No Users found</span>}
    </div>
  );
}
 
export default SearchList;