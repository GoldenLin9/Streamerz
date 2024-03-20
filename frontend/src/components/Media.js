
import MediaPlayer from './MediaPlayer.js'

export default function Media({ id, currChannel }) {

    return(
        <div id = {id}>
            <h1>Watching {currChannel == null ? "Nothing": currChannel.id}</h1>

            <MediaPlayer currChannel = {currChannel} />
        </div>
    )
}