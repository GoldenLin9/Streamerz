import '../styles/channel.css'

export default function Channel({ channel, setcurrChannel }) {

    function changeChannel() {
        setcurrChannel(channel.id);
    }

    return (
        <>
            <div onClick = {changeChannel} className = "channel">
                <h1>{channel.name}</h1>
                <a href = {channel.url} target = "_blank" rel = "noreferrer">Watch</a>
            </div>
        </>
    )
}