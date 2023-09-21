import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

const Chat = ({ room }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, where('room', '==', room), orderBy("createdAt"));
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = []
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id })
      })
      setMessages(messages)
    })
    return () => unsuscribe();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    try {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  return (
    <MobileFrame>
      <HeadFrame>
        <b>Chat App</b>
        <p>Welcome to Room: {room}</p>
      </HeadFrame>
      <ChatContent>
        {messages.map((message) => (
          <MessageContainer key={message.id}>
            <MessageUser>{message.user}</MessageUser>
            <MessageText>{message.text}</MessageText>
          </MessageContainer>
        ))}
      </ChatContent>
      <MessageInputForm onSubmit={handleSubmit}>
        <MessageInput
          type="text"
          placeholder="Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <SendMessageButton type="submit">Send</SendMessageButton>
      </MessageInputForm>
    </MobileFrame>
  );
}

export default Chat;

const MobileFrame = styled.div`
position: relative;
  width: 375px;
  min-height: 90vh;
  margin: 0 auto;
  background-color: #101223;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #fff;
`;

const HeadFrame = styled.div`
  background-color: #252738;
  color: white;
  padding: 5px;
  width: 100%;
  text-align: center;
  border-radius: 10px;
`

const ChatContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  width: 100%;
`;

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding: 10px 0px;
  border-bottom: 1px solid #333;
`;

const MessageUser = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const MessageText = styled.div``;

const MessageInputForm = styled.form`
  background-color: #252738;
  padding: 5px;
  width: 100%;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
