// import Game from '@/Game.js'
// import Game from './src/Game/Game.js';
import Game from '@/Game/Game.js'; // Adjust the path to the correct folder structure


const game = new game()
if(game.view)
    document.querySelector('.game').append(game.view.renderer.instance.domElement)
