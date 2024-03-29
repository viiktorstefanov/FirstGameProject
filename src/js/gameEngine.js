function start(state, game) {
    game.createWizard(state.wizard);

    
    window.requestAnimationFrame(gameLoop.bind(null, state, game))
}

function gameLoop(state, game, timestamp) {
    const { wizard } = state;
    const { wizardElement } = game;

    game.scoreElement.textContent = `current points: ${state.score}`

    modifyWizardPosition(state, game);

    if(state.keys.Space) {
        game.wizardElement.style.backgroundImage = 'url("./images/wizard-fire.png")'

        if(timestamp > state.fireball.nextSpawnTimestamp) {
            game.createFireball(wizard, state.fireball);
            state.fireball.nextSpawnTimestamp = timestamp + state.fireball.fireRate;
        }

        
    } else {
        game.wizardElement.style.backgroundImage = 'url("./images/wizard.png")'
    }
    
    // Spawn cloud

    if(timestamp - state.scene.lastCloudSpawn > state.scene.cloudSpawnInterval + 20000 * Math.random()) {
        game.createCloud(state.scene);
        state.scene.lastCloudSpawn = timestamp;
    }
        
       
    


    // Spawn bugs
  
    if(timestamp > state.bugStats.nextSpawnTimestamp) {
        game.createBug(state.bugStats);
        state.bugStats.nextSpawnTimestamp = timestamp + state.fireball.fireRate;
    }
    
    // Render clouds
    let cloudsElement = document.querySelectorAll('.cloud');
    cloudsElement.forEach(cloud => {
        cloud.x -= wizard.speed;
        cloud.style.left = cloud.x + 'px';

        if(cloud.x + cloudsElement.offsetWidth <= 0) {
            cloud.parentElement.removeChild(cloud);
        }
    })

    // Render  bugs
    let bugElements = document.querySelectorAll('.bug');
    bugElements.forEach(bug => {
        let positionX = parseInt(bug.style.left);

        // Detect collison with wizard
        if(detectCollision(wizardElement, bug)) {
            state.gameOver = true;
        }

        if(positionX > 0) {
            bug.style.left = positionX - state.bugStats.speed + 'px';
        }else {
            bug.remove();
        }

        
    })
    // Render fireballs
    document.querySelectorAll('.fireball').forEach(fireball => {
        let positionX = parseInt(fireball.style.left);

        // Detect collision
        bugElements.forEach(bug => {
            if(detectCollision(bug,fireball)) {
                state.score += state.killScore;
                bug.remove();
                fireball.remove();
                if(state.score > 200) {
                    state.bugStats.speed = 6.1;
                    state.fireball.fireRate = 330;
                }
                if(state.score > 400) {
                    state.bugStats.speed = 6.9;
                    state.fireball.fireRate = 310;
                }
                if(state.score > 600) {
                    state.bugStats.speed = 7.5;
                    state.fireball.fireRate = 300;
                }
                if(state.score > 800) {
                    state.bugStats.speed = 8;
                    state.fireball.fireRate = 290;
                }
                if(state.score > 1000) {
                    state.bugStats.speed = 9;
                    state.fireball.fireRate = 280;
                }
                if(state.score > 1200) {
                    state.bugStats.speed = 10;
                    state.fireball.fireRate = 270;
                }
                if(state.score > 1500) {
                    state.bugStats.speed = 11;
                    state.fireball.fireRate = 250;
                }
                if(state.score > 2000) {
                    state.bugStats.speed = 12;
                    state.fireball.fireRate = 200;
                }
            }
        });

        if(positionX > game.gameScreen.offsetWidth) {
            fireball.remove();
        } else {
            fireball.style.left = positionX + state.fireball.speed + 'px';
        }

        
    })

    
    // Render wizard
    wizardElement.style.left = wizard.positionX + 'px';
    wizardElement.style.top = wizard.positionY + 'px';
    

    if(state.gameOver) {
        alert(`Game Over - your result is: ${state.score} points!`);
        setTimeout(function() { window.location.reload(); }, 0);
        
        
    } else {
        window.requestAnimationFrame(gameLoop.bind(null, state, game))
    }
    
}

function modifyWizardPosition(state, game) {
        const { wizard } = state;
        // Move wizard

        if(state.keys.KeyA || state.keys.ArrowLeft) {
            wizard.positionX = Math.max(wizard.positionX - wizard.speed, 0);
        }
        if(state.keys.KeyS || state.keys.ArrowDown) {
            wizard.positionY = Math.min(wizard.positionY + wizard.speed, game.gameScreen.offsetHeight - wizard.height);
        }
    
        if(state.keys.KeyD || state.keys.ArrowRight) {
            wizard.positionX = Math.min(wizard.positionX + wizard.speed, game.gameScreen.offsetWidth - wizard.width);
        }
    
        if(state.keys.KeyW || state.keys.ArrowUp) {
            wizard.positionY = Math.max(wizard.positionY - wizard.speed, 0);
        }
}

function detectCollision(objectA, objectB) {
    let first = objectA.getBoundingClientRect();
    let second = objectB.getBoundingClientRect();
    let hasCollision = !(first.top > second.bottom || first.bottom < second.top || first.right < second.left || first.left > second.right);

    return hasCollision;

}