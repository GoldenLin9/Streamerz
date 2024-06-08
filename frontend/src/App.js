import './App.css';
import ChannelList from './components/ChannelList.js'
import Media from './components/Media.js'
import Chat from './components/Chat.js'

import React, { useState } from 'react' 

import { AuthProvider } from "./context/AuthContext"

export const ChannelContext = React.createContext();

function App() {
  let [currChannel, setCurrChannel] = useState({})
  let [channels, setChannels] = useState([])

  const value = {
    currChannel,
    setCurrChannel,
    channels,
    setChannels
  }

  return (

    <ChannelContext.Provider value = {value}>
      <AuthProvider>


        <div className="App">

          <ChannelList id = "ChannelList" currChannel = {currChannel} setCurrChannel = {setCurrChannel}/>
          <Media id = "Media" currChannel = {currChannel}/>
          <Chat id = "Chat" />

        </div>

      </AuthProvider>
    </ChannelContext.Provider>

  );
}

export default App;
