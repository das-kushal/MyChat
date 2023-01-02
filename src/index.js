import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css'
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from './context/ChatContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

