import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { MovieContextProvider } from './context/movieContext/movieContext';
import { ListContextProvider } from './context/listContext/listContext';
import { UserContextProvider } from './context/userContext/userContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MovieContextProvider>
        <ListContextProvider>
          <UserContextProvider>
    <App />
          </UserContextProvider>
        </ListContextProvider>
      </MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

