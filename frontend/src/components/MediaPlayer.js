
function getDimensions(multiplier, units) {
    const widthRatio = 16
    const heightRatio = 9

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

    let [newWidth, newHeight] = getDimensions(65, "px")

    return <iframe class = "MediaPlayer" title = "Twitch" src= {src} frameborder="0" allowfullscreen="true" scrolling="no" height= {newHeight} width= {newWidth}></iframe>

}

function YT(url) {
    return <h1>bye</h1>
}


function Error() {
    return <h1>Click Channel/ Error</h1>
}

function Play({ platform, url }) {

    switch (platform) {
        case "Twitch":
            return <Twitch url = {url} />

        case "Youtube":
            return <YT url = {url} />

        default:
            return <Error />
    }
}


export default function MediaPlayer({ currChannel }) {

    console.log(currChannel);
    return (
        <>
            <Play platform = {currChannel.platform} url = {currChannel.url} />
        </>
    );
}