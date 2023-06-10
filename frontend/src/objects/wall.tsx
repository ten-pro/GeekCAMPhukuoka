import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Engine, Render, World, Bodies, Composite } from 'matter-js';

export default function Wall() {
    useEffect(() => {
        const engine = Engine.create();
    
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
    const ball = Bodies.circle(960, 520, 20, { restitution: 1.3}); 

    const patation = Bodies.rectangle(910, 440, 680, 20, {
      isStatic: true,
      angle: Math.PI / 2,
      restitution: 0
    });
    Composite.add(engine.world, [wallTop, ball, wallLeft,wallRight, wallBottom,patation]);

    World.add(engine.world, [wallTop, ball, wallLeft,wallRight, wallBottom,patation]);

    Engine.run(engine);
    Render.run(render);

    return () => {
        Engine.clear(engine);
  
        if (render.canvas && render.canvas.parentNode) {
          render.canvas.parentNode.removeChild(render.canvas);
        }
      };
    }, []);
  
    return<div id="matter-js-canvas" />;
  }