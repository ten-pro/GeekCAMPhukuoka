import React, { useEffect, useRef } from 'react';
import { Engine, Render, Runner, World, Bodies } from 'matter-js';
import styles from '@/styles/start2.module.css';

const Start: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const engine = Engine.create();
    const render = Render.create({
      element: containerRef.current!,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframes: false,
      },
    });

    const runner = Runner.create();
    const world = engine.world;

    const containerBounds = containerRef.current!.getBoundingClientRect();

    // Create and add bouncing balls to the world
    const balls = [
      Bodies.circle(containerBounds.width / 2 - 100, containerBounds.height / 2, 30, { restitution: 0.8 }), // Ball 1
      //Bodies.circle(containerBounds.width / 2, containerBounds.height / 2, 30, { restitution: 0.8 }), // Ball 2
      //Bodies.circle(containerBounds.width / 2 + 100, containerBounds.height / 2, 30, { restitution: 0.8 }), // Ball 3
    ];
    World.add(world, balls);

    // Create walls for the active area
    const walls = [
      //Bodies.rectangle(containerBounds.width / 2, 0, containerBounds.width, 10, { isStatic: true }), // Top wall
      Bodies.rectangle(containerBounds.width / 2, containerBounds.height, containerBounds.width, 10, { isStatic: true }), // Bottom wall
      //Bodies.rectangle(0, containerBounds.height / 2, 10, containerBounds.height, { isStatic: true }), // Left wall
      //Bodies.rectangle(containerBounds.width, containerBounds.height / 2, 10, containerBounds.height, { isStatic: true }), // Right wall
    ];
    World.add(world, walls);

    // Start the engine and renderer
    Engine.run(engine);
    Render.run(render);
    Runner.run(runner, engine);

    // Clean up on component unmount
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div>
      <img className={styles['background-image']} src="./image/start.svg" alt="Background Image" />
      <div className={styles['button-container']}>
        <a href="main" className={styles.button} id="start-button">
          START
        </a>
      </div>
      <div id="svg-container" className={styles['svg-container']} ref={containerRef}></div>
    </div>
  );
};

export default Start;