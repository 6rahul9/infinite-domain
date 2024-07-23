import * as THREE from 'three'

import {PoinTextHelper} from '@jniac/three-point-text-helper'

import View from '@View/view.js'
import State from '@State/State.js'

export default class ChunkHelper{
    constructor(chunkSate){
        this.state = State.getInstance()
        this.view = View.getInstance()

        this.scene = this.view.scene()
        this.chunkSate = chunkSate
        this.areaVisible = true 
        this.idVisible = true       
        this.neighboursIdVisible = true


        //this.setGroup()
        // this.setArea()
        // this.setID()
        // this.setNeighboursIds()
    }

    setGroup(){
        this.group = new THREE.Group()
        this.group.position.x = this.chunkSate.x
        this.group.position.z = this.chunkSate.z
        this.scene.add(this.group)
    }

    destroyGroup(){
        if(!this.group)
            return 
        this.scene.remove(this.group)
    }

    setArea(){
        this.destroyArea()
        if(!this.areaVisible)
            return
        this.area = new THREE.Mesh(
            new THREE.PlaneGeometry(this.chunkSate.size, this.chunkSate.size),
            new THREE.MeshBasicMaterial({ wireframe :true})
        )

        this.area.geometry.rotateX(Math.PI * 0.5)
        this.area.material.color.multiplyScalar((this.chunkSate.depth+1) / (this.state.chunk.maxDepth))
    }
}