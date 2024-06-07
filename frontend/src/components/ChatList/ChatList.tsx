import { useSelector } from "react-redux";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { type RootState } from "../../store/store";
import ChatItem from "./ChatItem";
import { cn } from "../../lib/utils";
import SearchList from "../SearchList/SearchList";
import { FormEvent, useRef, useState } from "react";

let searchInputTimeout: NodeJS.Timeout | '' = '';

const ChatList = () => {

  const chats = useSelector((state: RootState) => state.chat.chats);
  const userData = useSelector((state: RootState) => state.user.users[0]);

  const [searchVal, setSearchVal] = useState<string>('');

  const handleSearch = (e: FormEvent<HTMLInputElement>) => {
      clearTimeout(searchInputTimeout);
      const value = e.currentTarget.value;
      searchInputTimeout = setTimeout(() => {
        setSearchVal(value.trim())
      }, 1000);
  }

  const searchInputRef = useRef<HTMLInputElement>(null);

  const resetSearch = () => {
    setSearchVal('');
    searchInputRef.current!.value = '';
  }

  return (
    <div className={cn('w-1/4 border-r h-screen p-4 space-y-4')}>
      <div>
        <p className={cn('text-sm')}>Hello, {userData?.username}</p>
        <h1 className={cn('font-extrabold text-3xl pb-2')}>Chats</h1>
        <Input ref={searchInputRef} onChange={handleSearch} placeholder="Search" />
      </div>
      <ScrollArea>
        {searchVal === '' && chats.length > 0 && <div className={cn('space-y-3')}>
          {chats.map(chat => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>}
        {searchVal !== '' && <SearchList searchVal={searchVal} resetSearch={resetSearch} />}
      </ScrollArea>
    </div>
  );
}
 
export default ChatList;