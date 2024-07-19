import { vec3, quat2 } from 'gl-matrix'
import Debug from '@/Debug/Debug.js'
import State from '@/State/State.js'
import CameraThirdPerson from './CameraThirdPerson.js'
import CameraFly from './CameraFly.js'

export default class Camera{
    static MODE_THIRDPERSON = 1
    static MODE_FLY = 2
    constructor(player){
        this.game = Game.getInstance()
        this.state = State.getInstance()

        this.controls = this.state.controls
        this.player = player
        this.position = vec3.create()
        this.quaternion = quat2.create()
        this.mode = Camera.MODE_THIRDPERSON

        this.thirdperson = new CameraThirdPerson(this.player)
        this.fly = new CameraFly(this.player)

        //activate
        if(this.mode === Camera.MODE_THIRDPERSON)
            this.thirdperson.activate()

        else if(this.mode === Camera.MODE_FLY)
            this.fly.activate()

        this.controls.event.on('camerModeDown', () =>{
            if(this.mode === Camera.MODE_THIRDPERSON){
                this.mode = Camera.MODE_FLY 
                this.fly.activate(this.position, this.quaternion)
                this.thirdperson.deactivate()
            }

            else if(this.mode === Camera.MODE_FLY){
                this.mode = Camera.MODE_THIRDPERSON
                this.fly.deactivate()
                this.thirdperson.activate()
            }
        })
        this.setDebug()
    }

    update(){
        this.thirdPerson.update()
        this.fly.update()
        
        if(this.mode === Camera.MODE_THIRDPERSON)
        {
            vec3.copy(this.position, this.thirdPerson.position)
            quat2.copy(this.quaternion, this.thirdPerson.quaternion)
        }

        else if (this.mode === Camera.MODE_FLY){
            vec3.copy(this.position, this.fly.position)
            quat2.copy(this.quaternion, this.fly.quaternion)
        }
    }
    setDebug(){
        const debug = this.game.debug
        if(!debug.active){
            return
            const folder = debug.uigetFolder('state/player/view')

            folder
            .add()
        }
    }
}
