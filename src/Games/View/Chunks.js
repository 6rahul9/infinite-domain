import State from '@State/State.js'
import Chunk from './Chunk.js'

export default class chunks
{
    constructor(){
        this.state = State.getInstance()

        this.state.chunks.events.on('create', (chunkState) => {
            const chunk = new chunk(chunkState)

            chunkState.events.on('destroy', () => {
                chunk.destroy()
            })
        })
    }

    update(){

    }
}