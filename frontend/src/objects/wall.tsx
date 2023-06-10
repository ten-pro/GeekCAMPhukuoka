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
            width: 800,
            height: 600,
            wireframes: false,
            background: 'transparent' 
          }
        });

    const ground = Bodies.rectangle(400, 610, 810, 60, {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
        strokeStyle: 'black',
        lineWidth: 1
      }
    });

    const chimney3 = Bodies.rectangle(0, 300, 553, 18, {
      isStatic: true,
      angle: Math.PI / 2,
      restitution: 0.8
    });
    const chimney4 = Bodies.rectangle(600, 300, 553, 18, {
      isStatic: true,
      angle: Math.PI / 2,
      restitution: 0.8
    });
    const chimney5 = Bodies.rectangle(90, 570, 190, 11, {
      isStatic: true,
      angle: Math.PI / 7,
      restitution: 0.8
    });
    const chimney6 = Bodies.rectangle(510, 570, 190, 11, {
      isStatic: true,
      angle: -Math.PI / 7,
      restitution: 0.8
    });

    Composite.add(engine.world, [ground, chimney3, chimney4, chimney5, chimney6]);

    World.add(engine.world, [ground, chimney3, chimney4, chimney5, chimney6]);

    Engine.run(engine);
    Render.run(render);

    return () => {
        Engine.clear(engine);
  
        if (render.canvas && render.canvas.parentNode) {
          render.canvas.parentNode.removeChild(render.canvas);
        }
      };
    }, []);
  
    return <div id="matter-js-canvas" />;
  }