function start(state, game) {
    game.createWizard(state.wizard);

    
    window.requestAnimationFrame(timestamp => gameLoop(state, game, timestamp))
}

function gameLoop(state, game, timestamp) {
    const { wizard } = state;
    const { wizardElement } = game;

    modifyWizardPosition(state, game);

    // Spawn bugs
  
    if(timestamp > state.bugStats.nextSpawnTimestamp) {
        game.createBug(state.bugStats);
        state.bugStats.nextSpawnTimestamp = timestamp + Math.random() * state.bugStats.maxSpawnInterval
    }

    // Render  bugs
    document.querySelectorAll('.bug').forEach(bug => {
        let positionX = parseInt(bug.style.left);

        bug.style.left = positionX - state.bugStats.speed + 'px';
    })
    
    
    // Render wizard
    wizardElement.style.left = wizard.positionX + 'px';
    wizardElement.style.top = wizard.positionY + 'px';
    


    window.requestAnimationFrame(gameLoop.bind(null, state, game))
}

function modifyWizardPosition(state, game) {
        const { wizard } = state;
        // Move wizard
        if(state.keys.KeyA) {
            wizard.positionX = Math.max(wizard.positionX - wizard.speed, 0);
        }
        if(state.keys.KeyS) {
            wizard.positionY = Math.min(wizard.positionY + wizard.speed, game.gameScreen.offsetHeight - wizard.height);
        }
    
        if(state.keys.KeyD) {
            wizard.positionX = Math.min(wizard.positionX + wizard.speed, game.gameScreen.offsetHeight - wizard.width);
        }
    
        if(state.keys.KeyW) {
            wizard.positionY = Math.max(wizard.positionY - wizard.speed, 0);
        }
}