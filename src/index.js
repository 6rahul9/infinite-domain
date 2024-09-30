import Game from '@/Game.js'
// import Game from './src/Game/Game.js';


const game = new game()
if(game.view)
    document.querySelector('.game').append(game.view.renderer.instance.domElement)
