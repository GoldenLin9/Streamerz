import '../styles/channel.css'
import '../styles/shared.css'
import ChannelForm from './ChannelForm.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'


export default function Channel({ channel, setCurrChannel }) {

    
    const [iconVisibility, setIconVisibility] = useState("hidden")
    const [editing, setEditing] = useState(false)


    function changeChannel() {
        setCurrChannel(channel)
    }

    return (
        <>
            {editing ? 
                <ChannelForm channelName = {channel.name} url = {channel.url} platform = {channel.platform} addingChannel = {false} channel = {channel} setCurrChannel = {setCurrChannel} setEditing = {setEditing} />

            :
                <div className = "channel" onMouseLeave = {() => setIconVisibility("hidden")} onMouseEnter = {() => setIconVisibility("visible")} onClick = {changeChannel}>
                    <h1>{channel.name}</h1>
                    <a href = {channel.url} target = "_blank" rel = "noreferrer">Watch</a>

                    <FontAwesomeIcon onClick = {() => setEditing(true)} visibility = {iconVisibility} className = "penIcon" icon= {faPen} />
                    <FontAwesomeIcon visibility = {iconVisibility} className = "trashIcon" icon= {faTrash} />
                </div>
            }

        </>
    )
}