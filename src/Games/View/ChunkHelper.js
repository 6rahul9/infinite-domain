import * as THREE from 'three'

import {PoinTextHelper} from '@jniac/three-point-text-helper'

import View from '@View/view.js'
import State from '@State/State.js'
import { Return } from 'three/examples/jsm/nodes/Nodes.js'

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
        this.group.add(this.area)
    }

    destroyArea(){
        if(!this.area)
            return
        this.area.geometry.dispose()
        this.area.mterial.dispose()
        this.group.remove()
    }

    setID(){
        this.destroyID()
        if(!this.idVisible)
            return
        this.id = new PoinTextHelper({ charMax:4 })
        this.id.material.depthTest = false
        this.id.material.onBeforeRender = () => {}
        this.id.material.onBuild = () => {}
        this.id.display({
            text: this.chunkSate.id,
            color: '#ffc800',
            size : (this.state.chunks.maxDepth - this.chunkSate.depth + 1) *6, 
            position: new THREE.Vector3(0, (this.state.chunks.maxDepth - this.chunkSate.depth) *10, 0)
        })
        this.group.add(this.id)
    }

    destroyId(){
        if(!this.id)
            return
        this.id.geometry.dispose()
        this.id.material.dispose()
        this.group.remove(this.id)
    }

    setNeighboursIds(){
        this.destroyNeighboursIds()
        if(!this.neighboursIdVisible)
            return
        if(!this.chunkState.neighbour.size === 0)
            return
        this.neighbousIds = new PoinTextHelper({ charMax : 4})
        this.neighbousIds.material.depthTest = false
        this.neighbousIds.material.onBeforeRender = () => {}
        this.neighbousIds.material.onBuild = () => {}
        this.group.add(this.neighbousIds)

        const nChunk = this.chunkSate.neighbour.get('n')
        const eChunk = this.chunkSate.neighbour.get('e')
        const sChunk = this.chunkSate.neighbour.get('s')
        const wChunk = this.chunkSate.neighbour.get('w')

         const size = (this.state.chunk.maxDepth - this.chunkSate.depth +1) * 6
         const y = (this.state.chunk.maxDepth - this.chunkSate.depth) * 10
    }


}