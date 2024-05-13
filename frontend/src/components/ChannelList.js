import React, { useState, useEffect, useContext } from 'react'
import Channel from './Channel.js'
import ChannelHeader from './ChannelHeader.js'
import ChannelAdd from './ChannelAdd.js'

import '../styles/channelList.css'

import { ChannelContext } from "../App"

export default function ChannelList({ id }) {

    let [channels, setChannels] = useState([])

    const { currChannel, setCurrChannel } = useContext(ChannelContext);

    useEffect(() => {
        getChannels()
    }, [currChannel])

    let getChannels = async () => {
        let response = await fetch("/api/channel-list")
        console.log(response)
        let data = await response.json()
        setChannels(data)
        console.log(data)
    }

    return (
        <div id = {id}>
            <ChannelHeader />

            {channels.map((channel) => (
                <Channel key = {channel.id} channel = {channel} setCurrChannel = {setCurrChannel} />
            ))}

            <ChannelAdd setCurrChannel = {setCurrChannel} />
        </div>
    )
}