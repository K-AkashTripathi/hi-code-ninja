import { useState } from 'react';
import { Header } from '../header/Header';
import { Messages } from '../messages/Messages';
import { InputForm } from '../inputForm/InputForm';
import { apiCall, apiEndpoints } from '../../services/api.service';


export const ChatBot = ({
  setShowChatBot = () => { }
}) => {

  const [queryInProgress, setQueryInProgress] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hi! Please type your query.", self: false, image: '', isTyping: false }
  ])

  const sendMessage = (msg) => {
    const messageCopy = [
      ...messages,
      { text: msg.trim(), self: true, image: '', isTyping: false },
      { text: "", self: false, image: '', isTyping: true }
    ]
    setMessages(messageCopy)
    getMessageRes(msg, messageCopy)
  }

  const getMessageRes = async (msg, messageCopy) => {
    try {
      setQueryInProgress(true)
      const res = await apiCall(apiEndpoints.query, { query: msg })
      // console.log("api res==", res)
      if (res.data && res.data.error) {
        setQueryRes(res.data.error, messageCopy)
      } else if (res.data && res.data.responseData) {
        setQueryRes(res.data.responseData, messageCopy)
      }
    } catch (error) {
      // console.log(error)
      setQueryRes("", messageCopy)
    }
  }

  const setQueryRes = (res, messageCopy) => {
    setQueryInProgress(false)
    const messagesCopy = JSON.parse(JSON.stringify(messageCopy))
    const lastIndex = messagesCopy.length - 1
    messagesCopy[lastIndex].isTyping = false
    messagesCopy[lastIndex].text = res || 'Something wents wrong! Please try after sometime.'
    setMessages(messagesCopy)
  }

  return (
    <div className="rcb-container" width="350px" height="520px">
      <Header setShowChatBot={setShowChatBot} />
      <Messages messagesList={messages} />
      <InputForm sendMessage={sendMessage} disabled={queryInProgress} />
    </div>
  );
}
