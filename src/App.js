import React, { useState } from 'react';
import { Box, Button, List, ListItem, Divider } from '@mui/material';
import ChatComponent from './components/ChatWindow';

function App() {
  const [chats, setChats] = useState([{ id: 1, title: 'Chat 1', savedMessages: [] }]);
  const [activeChat, setActiveChat] = useState(1);

  const handleNewChat = () => {
    const newChatId = chats.length + 1;
    const newChat = { id: newChatId, title: `Chat ${newChatId}`, savedMessages: [] };

    setChats([...chats, newChat]);
    setActiveChat(newChatId);
  };

  const handleSwitchChat = (chatId) => {
    setActiveChat(chatId);
  };

  const handleSaveMessage = (content, time) => {
    const chatIndex = chats.findIndex((chat) => chat.id  === activeChat);
    if (chatIndex !== -1) {
      setChats((prevChats) => {
        let updatedChats = [...prevChats];
        updatedChats[chatIndex] = {
          ...updatedChats[chatIndex],
          savedMessages: [...updatedChats[chatIndex].savedMessages, {content, time}],
        };
        return updatedChats;
      });
    }
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: '10%', padding: 2, borderRight: '1px solid #ccc' }}>
        <Button variant="contained" onClick={handleNewChat} sx={{ mb: 2 }}>
          + New Chat
        </Button>

        <List>
          {chats.map((chat) => (
            <div key={chat.id}>
              <ListItem  onClick={() => handleSwitchChat(chat.id)}>
                {chat.title}
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ChatComponent key={activeChat} saveMessageCallback={handleSaveMessage} savedChatMessages={chats[activeChat-1]?.savedMessages}/>
      </Box>
    </Box>
  );
}

export default App;
