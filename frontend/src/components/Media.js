
import MediaPlayer from './MediaPlayer.js'
import '../styles/media.css'

import { ChannelContext } from "../App"
import React, { useContext } from "react"

export default function Media({ id }) {

    const currChannel = useContext(ChannelContext)

    return(
        <div id = {id}>
            <h1>Watching {currChannel == null ? "Nothing": currChannel.name}</h1>

            <MediaPlayer currChannel = {currChannel} />
        </div>
    )
}