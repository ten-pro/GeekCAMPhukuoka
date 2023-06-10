import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Engine, Render, World, Bodies, Composite, Mouse, Body, Events } from 'matter-js';


export default function Wall() {
  const [points, setPoints] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false); 
  const isColliding = useRef<boolean>(false); 
    useEffect(() => {
        const engine = Engine.create();
        // engine.world.gravity.y = 0.5; // The default is 1

        // Adjust the time scale (e.g. 0.5 to slow down the simulation to half speed)
        engine.timing.timeScale = 0.5;
        const canvasElement = document.getElementById('matter-js-canvas') as HTMLElement | null;
        const render = Render.create({
          element: canvasElement!,
          engine: engine,
          options: {
            width: 1000,
            height: 800,
            wireframes: false,
            background: 'gray' 
          }
        });
        // const wall = Bodies.rectangle(leftMargin, topPadding, width, height, {


    const wallTop = Bodies.rectangle(500, -30, 1000, 100, {
      isStatic: true,
      restitution: 0
    });
    const wallLeft = Bodies.rectangle(-30, 405, 780, 100, {
      isStatic: true,
      angle: Math.PI / 2,
      restitution: 0
    });
    const wallRight = Bodies.rectangle(1030, 400, 765, 100, {
      isStatic: true,
      angle: Math.PI / 2,
      restitution: 0
    });
    const wallBottom = Bodies.rectangle(500, 830, 1100, 100, {
      isStatic: true,
      restitution: 0
    });
    const ball = Bodies.circle(960, 520, 20, { restitution: 0.3}); 

    const patation = Bodies.rectangle(910, 470, 630, 20, {
      isStatic: true,
      angle: Math.PI / 2,
      restitution: 0
    });
    const launcher = Bodies.rectangle(950, 750, 70, 70, {
      isStatic: true,
      restitution: 2
    });
    const diagonal = Bodies.rectangle(950, 70, 150, 20, {
      isStatic: true,
      angle: 4,
      restitution: 1
    });
    const object = Bodies.rectangle(750, 750, 70, 70, {
      isStatic: true,
      restitution: 1
    });
    Composite.add(engine.world, [object, wallTop, ball, wallLeft,wallRight, wallBottom,patation, diagonal, launcher]);

    World.add(engine.world, [object, wallTop, ball, wallLeft,wallRight, wallBottom, patation, diagonal, launcher]);

    Engine.run(engine);
    Render.run(render);
    // ...
    Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        if (!isColliding.current && ((pair.bodyA === ball && pair.bodyB === object) || (pair.bodyA === object && pair.bodyB === ball))) {
          // Collision detected, increase points
          setPoints(prevPoints => prevPoints + 10);
          // Set isColliding to true to avoid adding points again until collision ends
          isColliding.current = true;
        }
      });
    });

    Events.on(engine, 'collisionEnd', (event) => {
      event.pairs.forEach((pair) => {
        if (isColliding.current && ((pair.bodyA === ball && pair.bodyB === object) || (pair.bodyA === object && pair.bodyB === ball))) {
          // Set isColliding back to false
          isColliding.current = false;
        }
      });
    });
    Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        // ... other collision checks ...

        // Step 2: Check for collision with wallBottom
        if ((pair.bodyA === ball && pair.bodyB === wallBottom) || (pair.bodyA === wallBottom && pair.bodyB === ball)) {
          setGameOver(true);
        }
      });
    });
const mouse = Mouse.create(render.canvas);

// Attach mouse down event
render.canvas.addEventListener("mousedown", event => {
  const { x, y } = mouse.position;
  if (
    x >= launcher.position.x - 35 &&
    x <= launcher.position.x + 35 &&
    y >= launcher.position.y - 35 &&
    y <= launcher.position.y + 35
  ) {
    // Animate launcher position
    let startTime = Date.now();
    const duration = 1000; // 2 seconds
    const initialY = launcher.position.y;
    const targetY = 100;

    const animationFrame = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const newY = initialY + (targetY - initialY) * progress;

      // Use Body.setPosition to set the position of launcher
      Body.setPosition(launcher, { x: launcher.position.x, y: newY });

      if (progress === 1) {
        // Start the reverse animation
        reverseAnimation();
      } else {
        requestAnimationFrame(animationFrame);
      }
    };

    const reverseAnimation = () => {
      startTime = Date.now();

      const reverseAnimationFrame = () => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        const newY = targetY + (initialY - targetY) * progress;

        // Use Body.setPosition to set the position of launcher
        Body.setPosition(launcher, { x: launcher.position.x, y: newY });

        if (progress < 1) {
          requestAnimationFrame(reverseAnimationFrame);
        }
      };

      requestAnimationFrame(reverseAnimationFrame);
    };

    requestAnimationFrame(animationFrame);
  }
});

    return () => {
        Engine.clear(engine);
  
        if (render.canvas && render.canvas.parentNode) {
          render.canvas.parentNode.removeChild(render.canvas);
        }
      };
    }, []);
  
    return (
      <div>
        <div id="matter-js-canvas"></div>
        {gameOver && <div>終了</div>}
        <div>Points: {points}</div>
        
      </div>
    );
  }