
import { useEffect, useRef, useState } from 'react';
import { botSrc, userSrc } from '../../schema/ImageSchema';


export const Messages = ({
  messagesList = []
}) => {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages(messagesList)
    scrollToBottom()
  }, [messagesList])

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100);
  }


  return (
    <div className="rcb-content" height="">
      {messages.map((message, index) => (
        !message.self ?
          <div className="rcb-ts rcb-ts-bot" key={'msg_' + index}>
            <div className="rcb-ts-image-container">
              <img className="rcb-ts-image" src={botSrc} alt="avatar" />
            </div>
            <div className="rcb-ts-bubble">{message.text}</div>
          </div>
          :
          <div className="rcb-ts rcb-ts-user" key={'msg_' + index}>
            <div className="rcb-ts-bubble">{message.text}</div>
            <div className="rcb-ts-image-container">
              <img className="rcb-ts-image" src={userSrc} alt="avatar" />
            </div>
          </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
