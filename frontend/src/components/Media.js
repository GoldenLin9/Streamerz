
import MediaPlayer from './MediaPlayer.js'
import '../styles/media.css'

export default function Media({ id, currChannel }) {

    return(
        <div id = {id}>
            <h1>Watching {currChannel == null ? "Nothing": currChannel.name}</h1>

            <MediaPlayer currChannel = {currChannel} />
        </div>
    )
}