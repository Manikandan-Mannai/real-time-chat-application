import { useRef, useState } from 'react';
import './App.css';
import Auth from './component/Auth';
import Cookies from 'universal-cookie';
import Chat from './component/Chat';
import styled from 'styled-components';
const cookies = new Cookies();

function App() {
  const [isAuth, setAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);

  const roomNameref = useRef(null);

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setAuth={setAuth} />
      </div>
    );
  }

  return (
    <div className="App">
      {room ? (
        <Chat room={room} />
      ) : (
        <Container>
          <Room>
            <h3>Enter the Room Name</h3>
            <MessageInput type="text" ref={roomNameref} />
            <SendMessageButton onClick={() => setRoom(roomNameref.current.value)}>Enter Room</SendMessageButton>
          </Room>
        </Container>
      )}
    </div>
  );
}


export default App;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center ;
  margin: auto;
  `;

const Room = styled.div`
    width: 350px;
    background-color: #101223;
    color: #fff;
    border-radius: 10px;
    padding: 50px;
    text-align: center;

      @media (max-width: 767px) { /* Adjust the breakpoint as needed */
    width: 100%; /* Make it full width on mobile screens */
    max-width: 350px; /* Set a max width for readability */
  }
  `;

const MessageInput = styled.input`
    flex: 1;
    padding: 5px;
    background-color: #252738;
    border-radius: 5px;
    margin-right: 10px;
    color: #fff;
    border: none;
  `;

const SendMessageButton = styled.button`
    background-color: #379FFF;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  `;
