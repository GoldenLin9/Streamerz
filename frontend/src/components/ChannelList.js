import React, { useState, useEffect } from 'react'
import Channel from './Channel.js'
import ChannelHeader from './ChannelHeader.js'
import ChannelAdd from './ChannelAdd.js'

import '../styles/channelList.css'

export default function ChannelList({ id, setcurrChannel }) {

    let [channels, setChannels] = useState([])

    useEffect(() => {
        getChannels()
    }, [])

    let getChannels = async () => {
        let response = await fetch("/api/channel-list/")
        let data = await response.json()
        setChannels(data)
        console.log(data)
    }


    return (
        <div id = {id}>
            <ChannelHeader />

            {channels.map((channel) => (
                <Channel key = {channel.id} channel = {channel} setcurrChannel = {setcurrChannel} />
            ))}

            <ChannelAdd />
        </div>
    )
}