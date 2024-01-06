import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ChatComponent = ({savedChatMessages = [], saveMessageCallback}) => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState(savedChatMessages ?? []);

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const currentTimestamp = new Date().toLocaleTimeString();
      setMessages([...messages, { content: userInput.trim(), time: currentTimestamp }]);
      setUserInput('');
      saveMessageCallback(userInput.trim(), currentTimestamp)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDeleteChat = () => {
    setMessages([]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Paper sx={{ p: 2, flexGrow: 1, overflowY: 'auto', position: 'relative' }}>
        <IconButton
          aria-label="delete-chat"
          onClick={handleDeleteChat}
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            zIndex: 1,
          }}
        >
          <DeleteIcon />
        </IconButton>

        <List>
          {messages?.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                py: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}
            >
              <ListItemAvatar>
                <Avatar>A</Avatar>
              </ListItemAvatar>
              <div
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 2,
                }}
              >
                <ListItemText
                  primary={message.content}
                  sx={{
                    borderRadius: 8,
                    backgroundColor: '#e0e0e0',
                    padding: 2,
                    marginBottom: 1,
                  }}
                />
                <ListItemText
                  primary={message.time}
                  sx={{
                    fontSize: '0.8rem',
                    color: '#757575',
                  }}
                />
              </div>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
        <TextField
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          fullWidth
          sx={{ flex: 1 }}
        />
        <Button variant="contained" onClick={handleSendMessage} sx={{ ml: 2 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatComponent;
