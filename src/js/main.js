let state = initState();
    let game = initGameObjects();

    const avalibleKeys = [
        'KeyA',
        'KeyS',
        'KeyD',
        'KeyW',
    ];

    document.addEventListener('keydown', (e) => {
        if(avalibleKeys.includes(e.code)) {
            state.keys[e.code] = true;
        }
        
    });
    document.addEventListener('keyup', (e) => {
        if(avalibleKeys.includes(e.code)) {
            state.keys[e.code] = false;
        }
        
    });

game.startScreen.addEventListener('click', (e) => {
    game.startScreen.classList.add('hidden');
    game.gameScreen.classList.remove('hidden');

    //start game
    start(state, game);
})