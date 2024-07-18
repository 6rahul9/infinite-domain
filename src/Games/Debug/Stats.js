import StatsJs from 'stats.js'

export default class stats {
    constructor(){
        this.instance = new StatsJS()
        this.instance.showPanel(3)
        this.active = false
        this.max = 40
        this.igonoreMaxed = true
        this.activate()
    }

    activate(){
        this.activate =  true
        document.body.appendChild(this.instance.dom)
    }
    deactivate(){
        this.activate =  false
        document.body.removeChild(this.instance.dom)
    }
    
    setRenderPanel(_context){
        this.render = {}
        this.render.context = _context
        this.render.extension = this.render.context.getExtension('EXT_disjoint_timer_query_webgl2')
        this.render.panel= this.instance.addPanel(new StatsJs.Panel('Render (ms)', '#f8f', '#212'))
         
        const webGL2 = typeof WebGL2RenderingContext != 'undefined' && _context instanceof
        WebGL2RenderingContext

        if(!webGL2 || !this.render.extension){
            this.deactivate()
        }
    }

    beforeRender(){
        if(!this.active){
            return
        }

        //setup
        this.queryCreated = false
        let queryResultAvailable = false

        //test if query result availbale 
        if(this.render.query){
            queryResultAvailable = this.render.context.getQueryParamater(this.render.query, this.render.context.QUERY_ESULT_AVAILABLE)

            const disjoint = this.render.context.getParamater(this.render.extension.GPU_DISJOINT_EXT)

            if (queryResultAvailable && disjoint){
                const elapsedNanos =  this.render.context.getQueryParamater(this.render.query, this.render.context.QUERY_RESULT)
                const panelValue = Math.min(elapsedNanos / 1000 / 1000, this.max)

                if(panelValue === this.max && this.ignoreMaxed){

                }
                else{
                    this.render.panel.update(panelValue, this.max)
                }
            }
        }

        //if query reult availbale or result yet 
        if(queryResultAvailable || !this.render.query){
            //create new query 
            this.queryCreated = true 
        }

    }
}