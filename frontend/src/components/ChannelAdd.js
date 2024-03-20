import '../styles/channelAdd.css'
import ChannelForm from './ChannelForm.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import React, { useState } from 'react'



export default function ChannelHeader() {
    
    const [adding, setAdding] = useState(false);

    return (
        <>
            {adding ?
                <ChannelForm channelName = "" link = "" platform = "" addingChannel= {true} channel = {null} setCurrChannel={null} setEditing = {null}/>
            :
            <div id = "channelAdd" onClick = {()=> setAdding(true)}>
                <FontAwesomeIcon icon= {faPlus} />
            </div>
            }

        </>
    )
}