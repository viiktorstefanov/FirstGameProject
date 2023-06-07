function initState() {
    let startX = 50;
    let startY = 400;

    const state = {
        player: 'Viktor',
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
            
        },
        keys: {
            KeyA: false,
            KeyS: false,
            KeyD: false,
            KeyW: false,
        },
        
    }

    return state;
}