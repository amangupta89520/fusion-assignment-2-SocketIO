import { FormEvent, useRef, useState } from "react";
import Modal from 'react-modal';
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { userActions } from "../../store/slices/user";
import { chatActions } from "../../store/slices/chat";
import { sc } from "../../App";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const GetStartedModal = () => {

  const [modalIsOpen, setIsOpen] = useState(true);
  const formRef = useRef<null | HTMLFormElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const enteredValue = formRef.current?.username?.value?.trim();
    if(enteredValue.length >= 2) {
      dispatch(userActions.setCurrentUser({
        id: Date.now(),
        username: enteredValue,
        chats: [`${enteredValue}-demo-chat`],
        socketId: sc.id
      }));
      dispatch(chatActions.startNewChat({
        id: `${enteredValue}-demo-chat`,
        participants: [
          {
            id: 0,
            username: 'demo'
          }
        ],
        messages: [
          {
            sent_by: 0,
            arrival_time: Date.now(),
            content: `Hi, ${enteredValue}, welcome to the application`
          }
        ]
      }))
      closeModal();
    }
  }

  return (
    <div>
      <Modal isOpen={modalIsOpen} style={customStyles} contentLabel="Example Modal">
        <h2 className={cn('pb-2 font-bold text-2xl')}>Let's Get Started</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <Input name="username" placeholder="Username" />
        </form>
      </Modal>
    </div>
  );
};

export default GetStartedModal;
