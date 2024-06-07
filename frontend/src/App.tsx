import { useDispatch, useSelector } from "react-redux";
import ChatList from "./components/ChatList/ChatList";
import GetStartedModal from "./components/GetStartedModal/GetStartedModal";
import Modal from "react-modal";
import type { AppDispatch, RootState } from "./store/store";
import ChatArea from "./components/ChatArea/ChatArea";
import { cn } from "./lib/utils";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userActions } from "./store/slices/user";
import { onMessageRecived } from "./store/middlewares/chat";
import { io } from "socket.io-client";

export const sc = io(import.meta.env.VITE_SOCKET_URI ?? '');

Modal.setAppElement('#root');

let joinTimeoutId: NodeJS.Timeout | string = '';

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.user.users[0]);
  const currentChat = useSelector((state: RootState) => state.chat.currentChat);

  useEffect(() => {
    sc.on('connect', () => {
      console.log('connected to socket io');
    });
    sc.on('joined', (data) => {
      toast(`${data.username} joined the chat ${data.socketId}`);
      dispatch(userActions.addNewUser(data));
    });
    sc.on('message', (data) => {
      dispatch(onMessageRecived(data));
    });
    () => {
      sc.disconnect();
      sc.off('connect');
      sc.off('joined');
    }
  }, [dispatch]);

  useEffect(() => {
    if(currentUser) {
      clearTimeout(joinTimeoutId);
      joinTimeoutId = setTimeout(() => {
        sc.emit('joined', {...currentUser, socketId: sc?.id});
      }, 1000);
    }
  }, [currentUser, dispatch]);
  return (
    <>
      <div className={cn('flex')}>
        {!currentUser && <GetStartedModal />}
        {currentUser && <ChatList />}
        {currentChat? <ChatArea /> : <div className="w-full flex items-center justify-center text-4xl font-bold">Welcome to our app</div>}
      </div>
      <ToastContainer />
    </>
  )
}

export default App
