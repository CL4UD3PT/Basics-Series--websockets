import './App.css'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://192.168.1.100:3001', { transports: ['websocket'], jsonp:false, forceNew: true, });

function App() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  
  const sendMessage = () => {
    socket.emit('send_message', {message});
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    })
  }, [socket]);

  return (
    <>
      <div>
        <input placeholder='Message...' value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button onClick={sendMessage}>Send message</button>
        <h1>Message:</h1>
        <p>{messageReceived}</p>
      </div>
    </>
  )
}

export default App
