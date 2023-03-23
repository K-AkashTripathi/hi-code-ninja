import { useEffect, useState } from 'react';
import { Mic, Send } from '@mui/icons-material';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const InputForm = ({
  sendMessage = () => { },
  disabled = true
}) => {

  const [message, setMessage] = useState("")

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [recording, setRecording] = useState(false)
  const [recordingPause, setRecordingPause] = useState(false)

  const startRecording = () => {
    SpeechRecognition.startListening()
    setRecording(true)
    setRecordingPause(false)
  }

  const stopRecording = () => {
    if (recordingPause) {
      SpeechRecognition.startListening()
      setRecordingPause(false)
    } else {
      SpeechRecognition.stopListening()
      setRecordingPause(true)
      setMessage((message || "") + " " + transcript)
    }
  }

  const onChangeMessgae = (ev) => {
    setMessage(ev.target.value)
  }

  const handelSendMessage = (ev) => {
    ev.preventDefault()
    let messageCopy = JSON.parse(JSON.stringify(message.trim()))
    if (recording) {
      if (listening) {
        SpeechRecognition.stopListening()
        messageCopy = (messageCopy || "") + " " + transcript || ""
      }
      setRecording(false)
      setRecordingPause(false)
    }

    if (messageCopy.length) {
      sendMessage(messageCopy)
      setMessage("")
    } else {
      setMessage("")
    }
  }

  return (
    <form className="rcb-footer" onSubmit={handelSendMessage}>
      {!recording ?
        <>
          <input type="textarea" className="rcb-input" placeholder="Type the message ..." value={message} onChange={onChangeMessgae} />
          {
            message.trim().length || !browserSupportsSpeechRecognition ?
              <button className="rcb-submit-button" type='submit' disabled={disabled}>
                <Send />
              </button>
              :
              <button className="rcb-submit-button" type='button' disabled={disabled} onClick={startRecording}>
                <Mic />
              </button>
          }
        </>
        :
        <>
          <input type="textarea" className="rcb-input rcb-input-rec" placeholder={`Recording ${recordingPause ? 'Paused' : ''} ...`} value="" disabled={true} />
          <button className="rcb-submit-button rcb-submit-rec-button" type='button' disabled={disabled} onClick={stopRecording}>
            <Mic />
          </button>
          <button className="rcb-submit-button" type='submit' disabled={disabled}>
            <Send />
          </button>
        </>
      }
    </form>
  );
}
