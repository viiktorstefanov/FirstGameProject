function initState() {
    let startX = 50;
    let startY = 400;

    const state = {
        player: 'Viktor',
        gameOver: false,
        wizard: {
            width: 82,
            height: 100,
            positionX: startX,
            positionY: startY,
            speed: 8,
        },
        bugStats: {
            width: 50,
            height: 50,
            nextSpawnTimestamp: 0,
            maxSpawnInterval: 1500,
            speed: 5,
        },
        fireball: {
            width: 20,
            height: 20,
            speed: 12,
            nextSpawnTimestamp: 0,
            fireRate: 500,

        },
        keys: {
            KeyA: false,
            KeyS: false,
            KeyD: false,
            KeyW: false,
            Space: false,
            ArrowLeft: false,
            ArrowRight: false,
            ArrowUp: false,
            ArrowDown: false,
            
        },
        
    }

    return state;
}