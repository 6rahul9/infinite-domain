import Game from '@Game/Game.js'

import State from '@State/State.js'
import ChunkHelper from 'ChunkHelper.js'

export default class Chunk {
    constructor (chunkState){
        this.game = this.getInstance()
        this.state = this.getInstance()
        this.scene = this.game.scene
        this.chunkState = this.chunkState

        this.helper = new ChunkHelper(this.chunkState)
    }

    update(){

    }

    destroy(){
        
    }
}