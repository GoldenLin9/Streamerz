import React, { useState } from 'react'


export default function ChannelForm({channelName, url, platform, addingChannel, channel, setCurrChannel, setEditing}) {
    
    const [editName, setEditName] = useState(channelName);
    const [editUrl, setEditUrl] = useState(url);
    const [editPlatform, setEditPlatform] = useState(platform);
    
    const platforms = ["YouTube", "Twitch"];

    let updateChannelList = async(event) => {
        event.preventDefault();

        let newChannel = {...channel, url: editUrl, name: editName, platform: editPlatform}
        setCurrChannel(newChannel);

        fetch(`/api/channel-update/${channel.id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newChannel)
        })

        /* done with editing, remove form and revert back to channel display */
        setEditing(false);

    }

    return (
        <form onSubmit = {updateChannelList}>
            <label>Streamer Name: </label>
            <input type = "text" value = {editName} onChange = {(e) => setEditName(e.target.value)}/>
            <br></br>

            <label>Link: </label>
            <input type = "url" value = {editUrl} onChange = {(e) => setEditUrl(e.target.value)} ></input>
            <br></br>

            <label>Platform: </label>
            <select onChange = {(e) => setEditPlatform(e.target.value)}>
                {addingChannel && <option> -- select an option -- </option>}
                {platforms.map(option => {
                    return option === platform ? <option value = {option} selected >{option}</option> : <option value = {option} >{option}</option>
                })}
            </select>
            <br></br>

            <input type = "submit" value = {addingChannel ? "Add": "Save"} />
        </form>
    )
}