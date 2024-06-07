import type { ThunkAction, UnknownAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import { type Message, chatActions, type Participant } from "../slices/chat";

type CustomData = {
  message: Message,
  from: Participant
  to: Participant
}

export function onMessageRecived(data: CustomData): ThunkAction<void, RootState, unknown, UnknownAction> {
  return (dispatch, getState) => {
    const isCurrentChat = getState().chat.chats.find(chat => chat.id === `${data?.to?.id}-${data?.from?.id}-chat`);
    if(isCurrentChat) {
      dispatch(chatActions.startChat(isCurrentChat.id));
      dispatch(chatActions.receiveMessage({
        id: isCurrentChat.id,
        message: data.message
      }));
    } else {
      dispatch(chatActions.startNewChat({
        id: `${data?.to?.id}-${data?.from?.id}-chat`,
        participants: [data.from, data.to],
        messages: [data.message]
      }))
    }
  }
}