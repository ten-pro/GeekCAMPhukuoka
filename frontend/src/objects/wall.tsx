import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Engine, Render, World, Bodies, Composite, Mouse, Body, Events } from 'matter-js';


export default function Wall() {
  const [points, setPoints] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false); 
  const isColliding = useRef<boolean>(false); 
    useEffect(() => {
        const engine = Engine.create();
        engine.timing.timeScale = 0.5;//重力
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
        });//Matterjsの描画範囲
    const wallTop = Bodies.rectangle(500, -30, 1000, 100, {
      isStatic: true,
      restitution: 0
    });//上の壁
    
    const wallLeft = Bodies.rectangle(-30, 405, 780, 100, {
      isStatic: true,
      angle: Math.PI / 2,
      restitution: 0
    });//左の壁
    const wallRight = Bodies.rectangle(1030, 400, 765, 100, {
      isStatic: true,
      angle: Math.PI / 2,
      restitution: 0
    });//右の壁
    const wallBottom = Bodies.rectangle(500, 830, 1100, 100, {
      isStatic: true,
      restitution: 0
    });//地面
    const ball = Bodies.circle(960, 520, 20, { restitution: 1.3}); //ボール

    const patation = Bodies.rectangle(910, 470, 630, 20, {
      isStatic: true,
      angle: Math.PI / 2,
      restitution: 0
    });//発射台の左の壁
    const launcher = Bodies.rectangle(950, 750, 70, 70, {
      isStatic: true,
      restitution: 2
    });//発射台、真四角の図形
    const diagonal = Bodies.rectangle(950, 70, 150, 20, {
      isStatic: true,
      angle: 4,
      restitution: 1
    });//右上の斜めの図形
    const object1 = Bodies.rectangle(750, 750, 70, 70, {
      isStatic: true,
      restitution: 1
    });
    const object2 = Bodies.rectangle(650, 750, 70, 70, {
      isStatic: true,
      restitution: 1
    });
    Composite.add(engine.world, [object2, object1, wallTop, ball, wallLeft,wallRight, wallBottom,patation, diagonal, launcher]);//オブジェクトを追加したら編集
    World.add(engine.world, [object2, object1, wallTop, ball, wallLeft,wallRight, wallBottom, patation, diagonal, launcher]);//オブジェクトを追加したら編集

    Engine.run(engine);
    Render.run(render);

    Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        if (!isColliding.current && ((pair.bodyA === ball && pair.bodyB === object1) || (pair.bodyA === object1 && pair.bodyB === ball))) {
          // Collision detected, increase points
          setPoints(prevPoints => prevPoints + 10);
          // Set isColliding to true to avoid adding points again until collision ends
          isColliding.current = true;
        }
        if (!isColliding.current && ((pair.bodyA === ball && pair.bodyB === object2) || (pair.bodyA === object2 && pair.bodyB === ball))) {
          // Collision detected, increase points
          setPoints(prevPoints => prevPoints + 10);
          // Set isColliding to true to avoid adding points again until collision ends
          isColliding.current = true;
        }
      });
    });//オブジェクトが衝突した時の処理

    Events.on(engine, 'collisionEnd', (event) => {
      event.pairs.forEach((pair) => {
        if (isColliding.current && ((pair.bodyA === ball && pair.bodyB === object1) || (pair.bodyA === object1 && pair.bodyB === ball))) {
          // Set isColliding back to false
          isColliding.current = false;
        }
        if (isColliding.current && ((pair.bodyA === ball && pair.bodyB === object2) || (pair.bodyA === object2 && pair.bodyB === ball))) {
          // Set isColliding back to false
          isColliding.current = false;
        }
      });
    });//オブジェクトが衝突し終わった時の処理
    Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        if ((pair.bodyA === ball && pair.bodyB === wallBottom) || (pair.bodyA === wallBottom && pair.bodyB === ball)) {
          setGameOver(true);
        }
      });
    });//地面と接触した時のゲームオーバー処理
const mouse = Mouse.create(render.canvas);//発射台のクリック検知

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
});//発射台のクリックイベント、アニメーション

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
          <div style={{ display: 'flex' }}>
            {gameOver && <div>終了</div>}
            <div>Points: {points}</div>
          </div>
      </div>
    );
  }