import logo from './logo.svg';
import './App.css';
import { Fab } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import { useState } from 'react';
import { ChatBot } from './components/chatbot/ChatBot';


function App() {

  const [showChatBot, setShowChatBot] = useState(false)

  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

  return (
    <div className={`rcb` + (showChatBot ? " rcb-active" : '')}>
      <Fab className='rcb-float-btn' sx={fabStyle} color='primary' onClick={() => setShowChatBot(true)}>
        <MessageIcon />
      </Fab>
      <ChatBot setShowChatBot={setShowChatBot} />
    </div>
  );
}

export default App;
