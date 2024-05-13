import './App.css';
import ChannelList from './components/ChannelList.js'
import Media from './components/Media.js'
import Chat from './components/Chat.js'

import React, { useState } from 'react' 

export const ChannelContext = React.createContext();

function App() {
  let [currChannel, setCurrChannel] = useState({})

  const value = {
    currChannel,
    setCurrChannel
  }

  return (

    <ChannelContext.Provider value = {value}>

      <div className="App">

        <ChannelList id = "ChannelList" currChannel = {currChannel} setCurrChannel = {setCurrChannel}/>
        <Media id = "Media" currChannel = {currChannel}/>
        <Chat id = "Chat" />

      </div>

    </ChannelContext.Provider>

  );
}

export default App;
