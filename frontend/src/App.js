import './App.css';
import ChannelList from './components/ChannelList.js'
import Media from './components/Media.js'
import Chat from './components/Chat.js'

import React, { useState } from 'react' 

function App() {
  let [currChannel, setCurrChannel] = useState({})

  return (

    <div className="App">

      <ChannelList id = "ChannelList" currChannel = {currChannel} setCurrChannel = {setCurrChannel}/>
      <Media id = "Media" currChannel = {currChannel}/>
      <Chat id = "Chat" />

    </div>

  );
}

export default App;
