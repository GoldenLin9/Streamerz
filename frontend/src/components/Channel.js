import '../styles/channel.css'
import '../styles/shared.css'
import ChannelForm from './ChannelForm.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'


export default function Channel({ channel, setCurrChannel, channelIndx }) {

    
    const [iconVisibility, setIconVisibility] = useState("hidden")
    const [editing, setEditing] = useState(false)


    function changeChannel() {
        setCurrChannel(channel)
    }

    console.log("HERERERE: " + JSON.stringify(channel))
    let deleteChannel = async() => {
        fetch(`/api/channel/${channel.id}`, {
            method: "DELETE",
            "headers": {
                "Content-Type": "application/json"
            }
        })
    }

    let mapping = {
        "YouTube": "YT",
        "Twitch": "TW",
    }

    return (
        <>
            {editing ? 
                <ChannelForm channelName = {channel.name} url = {channel.url} platform = {channel.platform} addingChannel = {false} 
                                channel = {channel} setCurrChannel = {setCurrChannel} setEditing = {setEditing} setAdding = {null} />

            :
                <div className = {`channel ${mapping[channel.platform]}`} onMouseLeave = {() => setIconVisibility("hidden")} 
                    onMouseEnter = {() => setIconVisibility("visible")} onClick = {changeChannel}>

                    <h1>{channel.name}</h1>
                    <a href = {channel.url} target = "_blank" rel = "noreferrer">Watch</a>

                    <FontAwesomeIcon onClick = {() => setEditing(true)} visibility = {iconVisibility} className = "penIcon" icon= {faPen} />
                    <FontAwesomeIcon visibility = {iconVisibility} className = "trashIcon" icon= {faTrash} onClick = {deleteChannel} />
                </div>
            }

        </>
    )
}