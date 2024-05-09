import React, { useState } from 'react'


export default function ChannelForm({channelName, url, platform, addingChannel, channel, setCurrChannel, setEditing, setAdding}) {
    
    const [editName, setEditName] = useState(channelName);
    const [editUrl, setEditUrl] = useState(url);
    const [editPlatform, setEditPlatform] = useState(platform);
    
    const platforms = ["YouTube", "Twitch"];

    let updateChannel = async(event) => {

        // avoid submitting form
        event.preventDefault()

        
        let newChannel = {...channel, url: editUrl, name: editName, platform: editPlatform}
        fetch(`/api/channel/${channel.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            
            body: JSON.stringify(newChannel)
        })
        
        // show new updated channel
        setCurrChannel(newChannel)

        // done with editing, remove form and revert back to channel display
        setEditing(false)
    }


    let createChannel = async(event) => {

        event.preventDefault()

        let newChannel = {url: editUrl, name: editName, platform: editPlatform}
        let response = await fetch(`/api/channel-list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            
            body: JSON.stringify(newChannel)
        })

        let response_data = await response.json()
        let channelID = response_data.id

        newChannel = {...newChannel, "id": channelID}
        
        setCurrChannel(newChannel)

        setAdding(false);
    }

    return (
        <form onSubmit = {addingChannel ? createChannel: updateChannel}>
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

            <input type = "submit" value = {addingChannel ? "add" : "update"} />
        </form>
    )
}