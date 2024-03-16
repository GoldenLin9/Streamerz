import React, { useState, useEffect } from 'react';


function getDimensions(multiplier, units) {
    let widthRatio = 16
    let heightRatio = 9

    let newWidth = widthRatio * multiplier;
    let newHeight = heightRatio * multiplier;

    newWidth = newWidth.toString() + units
    newHeight = newHeight.toString() + units

    return [newWidth, newHeight]
}

// change parent from local host
function Twitch({ url }) {
    let parts = url.split("/")
    console.log(parts)
    let channelName = parts[parts.length - 1]
    let parent = "localhost"
    let src = "https://player.twitch.tv/?channel=" + channelName + "&parent=" + parent;
    console.log(src)

    let [newWidth, newHeight] = getDimensions(99, "px")

    return <iframe title = "Twitch" src= {src} frameborder="0" allowfullscreen="true" scrolling="no" height= {newHeight} width= {newWidth}></iframe>

}

function YT(url) {
    return <h1>bye</h1>
}

function Play({ platform, url }) {
    if (platform === "Twitch") {
        return <Twitch url = {url} />
    } else if (platform === "Youtube") {
        return <YT url = {url} />
    }
}


export default function MediaPlayer({ currChannel }) {
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        let getChannel = async () => {
            let response = await fetch(`/api/channel-detail/${currChannel}`);
            let data = await response.json();
            setChannel(data);
        }

        getChannel();
    }, [currChannel]);

    if (!channel) {
        return null;
    } else {
        console.log(channel.url.split("/"))
    }

    return (
        <>
            <Play platform = {channel.platform} url = {channel.url} />
        </>
    );
}