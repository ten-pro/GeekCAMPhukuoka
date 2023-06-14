import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Engine, Render, World, Bodies, Composite, Mouse, Body, Events, MouseConstraint, Vertices } from 'matter-js';


export default function Wall() {
  const [points, setPoints] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false); 
  const isColliding = useRef<boolean>(false); 
  const [score, setScore] = useState<number>(0);
  const [storedValue, setStoredValue] = useState<string | null>(null);//ローカルストレージで使う変数
  useEffect(() => {
    const value = localStorage.getItem('key');
    setStoredValue(value);
  }, []);//ローカルストレージ取得
  let isInsideObject4 = false;
  let isInsideObject5 = false;
  const defaultCategory = 0x0001;
const sensorCategory = 0x0002;
    useEffect(() => {
        const engine = Engine.create();
        engine.timing.timeScale = 1.2;//重力
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

        const centerX = render.options?.width ? render.options.width / 3.3 : 0;
        const centerY = render.options?.height ? render.options.height / 2.6 : 0;
        const radius = 290;
        const numCircles = 220;
        
        // 移動させるオフセットを定義
        const offsetX = 90; // X軸方向に移動させる距離
        const offsetY = 30; // Y軸方向に移動させる距離
        
        var angleStep = Math.PI / numCircles;
        var circles = [];
        
        for (var i = 0; i < numCircles; i++) {
            var angle = angleStep * i;
            // オフセットを加えて座標を計算
            var x = centerX + Math.cos(angle) * radius + offsetX;
            var y = centerY - Math.sin(angle) * radius + offsetY;
            var circle = Bodies.circle(x, y, 5, {
                isStatic: true,
                render: {
                    fillStyle: 'black',
                    strokeStyle: 'black',
                    lineWidth: 1
                }
            });
            circles.push(circle);
        }
        
        Composite.add(engine.world, circles);
        



    const wallTop = Bodies.rectangle(500, -30, 1000, 100, {
      isStatic: true,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      restitution: 0
    });//上の壁
    const wallLeft = Bodies.rectangle(-30, 405, 780, 100, {
      isStatic: true,
      angle: Math.PI / 2,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      restitution: 0
    });//左の壁
    const wallRight = Bodies.rectangle(1030, 400, 765, 100, {
      isStatic: true,
      angle: Math.PI / 2,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      restitution: 0
    });//右の壁
    const wallBottom = Bodies.rectangle(500, 830, 1100, 100, {
      isStatic: true,
      restitution: 0,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      render: {
        fillStyle: 'red',
      }
    });//地面
    const ball = Bodies.circle(960, 520, 20, {
      render: {
        sprite: {
          texture: './images/ball.png',
          xScale:0.4,
          yScale:0.4
        }
      },
       restitution: 1.3
      }); //ボール
      ball.collisionFilter = {
        category: defaultCategory,
        mask: defaultCategory // デフォルトカテゴリーとのみ衝突
    };//ボールに対してcollisionFilterを設定
    const patation = Bodies.rectangle(910, 470, 630, 20, {
      isStatic: true,
      angle: Math.PI / 2,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      restitution: 0
    });//発射台の左の壁
    const launcher = Bodies.rectangle(950, 750, 70, 70, {
      isStatic: true,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      restitution: 2
    });//発射台、真四角の図形
    const diagonal = Bodies.rectangle(950, 70, 150, 20, {
      isStatic: true,
      angle: 4,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      restitution: 1
    });//右上の斜めの図形
    const object1 = Bodies.rectangle(300, 150, 70, 70, {
      isStatic: true,
      restitution: 1,
      angle: 0.8,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      render: {
        // sprite: {
        //   texture: './images/amatti.png',
        //   xScale:0.6,
        //   yScale:0.6
        // },
        fillStyle: 'red'
      }
    });//赤い四角のオブジェクト
    const object2 = Bodies.rectangle(450, 350, 70, 70, {
      isStatic: true,
      restitution: 1,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      angle: 0.8,
      render: {
        // sprite: {
        //   texture: './images/motu.png',
        //   xScale:1,
        //   yScale:1
        // },
        fillStyle: 'blue'
      }
    });//青のオブジェクト
    const object3 = Bodies.polygon(650, 150, 3, 45, {
      isStatic: true,
      restitution: 1,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      render: {
        // sprite: {
        //   texture: './images/ramen.png',
        //   xScale:0.7,
        //   yScale:0.6
        // },
        fillStyle: 'pink'
      }
    });//三角のオブジェクト（ピンク）
    const object4 = Bodies.rectangle(350, 400, 100, 20, {
      isStatic: true,
      isSensor: true, // センサーとして働くため、物理的な衝突は発生しない
      collisionFilter: {
        category: sensorCategory,
        mask: defaultCategory
      },
      render: {
        fillStyle: 'green'
      }
    });//通過オブジェクト緑
    const object5 = Bodies.rectangle(950, 350, 100, 20, {
      isStatic: true,
      isSensor: true, // センサーとして働くため、物理的な衝突は発生しない
      collisionFilter: {
        category: sensorCategory,
        mask: defaultCategory
      },
      render: {
        fillStyle: 'yellow'
      }
    });//通過オブジェクト黄色
    const hiyoko = Bodies.polygon(150, 280, 3, 45, {
      isStatic: true,
      restitution: 1,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      render: {
        // sprite: {
        //   texture: './images/hiyoko.png',
        //   xScale:0.7,
        //   yScale:0.6
        // },
        fillStyle: 'orange'
      }
    });//オレンジ色のオブジェクト
    const bottomLeft = Bodies.rectangle(140, 490, 180, 35, {
      isStatic: true,
      angle: 1.2,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      restitution: 0,
      render: {
        // sprite: {
        //   texture: './images/mentai.png',
        //   xScale:0.9,
        //   yScale:0.9
        // }
      }
    });//左の斜め壁
    const bottomRight = Bodies.rectangle(790, 490, 180, 35, {
      isStatic: true,
      angle: 2.0,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      restitution: 0,
      render: {
        // sprite: {
        //   texture: './images/tower.png',
        //   xScale:0.3,
        //   yScale:0.3
        // }
      }
    });//右の斜め壁
    const niwaka = Bodies.rectangle(840, 260, 130, 35, {
      isStatic: true,
      restitution: 0,
      angle: -0.2,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      render: {
        // sprite: {
        //   texture: './images/niwaka.png',
        //   xScale:0.3,
        //   yScale:0.3
        // }
      }
    });//右の斜め壁
    const trapezoidVertices1 = [
      { x: 400, y: 100 },
      { x: 430, y: 100 },
      { x: 460, y: 300 },
      { x: 400, y: 300 }
  ];//左の弾くやつの図形構成
  const trapezoidVertices2 = [
    { x: 390, y: 100 },
    { x: 420, y: 100 },
    { x: 450, y: 300 },
    { x: 390, y: 300 }
];//右の弾くやつの図形構成
  const trapezoid1 = Bodies.fromVertices(300, 660, [trapezoidVertices1], {
      isStatic: true,
      angle: 2,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      render: {
          fillStyle: '#FFFFFF',
          sprite: {
            texture: './images/flipLeft.png',
            xScale:0.9,
            yScale:0.9
          }
      }
  }, true);//左の弾くやつのオブジェクト
  const trapezoid2 = Bodies.fromVertices(600, 660, [trapezoidVertices2], {
    isStatic: true,
    angle: 4.4,
    collisionFilter: {
      category: defaultCategory // デフォルトカテゴリーに設定
  },
    render: {
        fillStyle: '#FFFFFF',
        sprite: {
          texture: './images/flipRight.png',
          xScale:0.9,
          yScale:0.9
        }
    }
}, true);//右の弾くやつのオブジェクト
Events.on(engine, 'beforeUpdate', () => {
  const currentAngle = object3.angle;
  const newAngle = currentAngle + 0.03;
  Body.setAngle(object3, newAngle);
});//ラーメン回転処理
Events.on(engine, 'beforeUpdate', () => {
  const currentAngle = hiyoko.angle;
  const newAngle = currentAngle - 0.03;
  Body.setAngle(hiyoko, newAngle);
});//ひよこ饅頭回転処理
  render.canvas.addEventListener('mousedown', (event) => {
    const mousePosition = { x: event.clientX, y: event.clientY };
    if (Vertices.contains(trapezoid1.vertices, mousePosition)) {
        
        let angle = 2.0;
        const endAngle = 1.0;
        const step = 0.1;
        let decreasing = true;

        const intervalId = setInterval(() => {
            // 角度を減らす
            if (decreasing) {
                angle -= step;
                if (angle <= endAngle) {
                    decreasing = false;
                }
            } 
            // 角度を増やす
            else {
                angle += step;
                if (angle >= 2.0) {
                    clearInterval(intervalId);
                }
            }

            Body.setAngle(trapezoid1, angle);
        }, 10); // 20ミリ秒ごとに角度を更新
    }//左の弾くアニメーション
    if (Vertices.contains(trapezoid2.vertices, mousePosition)) {

      let angle = 4.4;
      const endAngle = 5.4;
      const step = 0.1;
      let increasing = true;

      const intervalId2 = setInterval(() => {
          if (increasing) {
              angle += step;
              if (angle >= endAngle) {
                  increasing = false;
              }
          } else {
              angle -= step;
              if (angle <= 4.4) {
                  clearInterval(intervalId2);
              }
          }

          Body.setAngle(trapezoid2, angle);
      }, 10);
  }//右の弾くアニメーション
});
    // Composite.add(engine.world, [object3, trapezoid2, trapezoid1, object2, object1, wallTop, ball, wallLeft,wallRight, wallBottom,patation, diagonal, launcher]);//オブジェクトを追加したら編集
    World.add(engine.world, [object5, object4, hiyoko, niwaka, bottomRight, bottomLeft, object3, trapezoid2, trapezoid1, object2, object1, wallTop, ball, wallLeft,wallRight, wallBottom, patation, diagonal, launcher]);//オブジェクトを追加したら編集
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
    });//オブジェクトが衝突検知処理

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
    });//オブジェクトが衝突して離れたのを検知する処理
    Events.on(engine, 'afterUpdate', () => {
      // ボールが地面から1000px以上離れているか確認
      if (ball.position.y < wallBottom.position.y - 795) {
        setGameOver(true);
      }
    });//ボールが10000px以上離れたらゲームオーバー
    Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        if ((pair.bodyA === ball && pair.bodyB === wallBottom) || (pair.bodyA === wallBottom && pair.bodyB === ball)) {
          setGameOver(true);
        }
      });
    });//地面と接触した時のゲームオーバー処理
const mouseLauncher = Mouse.create(render.canvas);//発射台のクリック検知
render.canvas.addEventListener("mousedown", event => {
  const { x, y } = mouseLauncher.position;
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
Events.on(engine, 'afterUpdate', () => {
  const ballPosition = ball.position;
  const object4Position = object4.position;
  const object4Bounds = object4.bounds;

  // ボールがobject4の中にあるかどうかを確認
  if (ballPosition.x > object4Bounds.min.x && ballPosition.x < object4Bounds.max.x &&
      ballPosition.y > object4Bounds.min.y && ballPosition.y < object4Bounds.max.y) {
      isInsideObject4 = true;
  } else {
      // ボールがobject4から離れた場合
      if (isInsideObject4) {
          setPoints(prevPoints => prevPoints + 20); // 20点加算
      }
      isInsideObject4 = false;
  }
  const object5Bounds = object5.bounds;
    if (ballPosition.x > object5Bounds.min.x && ballPosition.x < object5Bounds.max.x &&
        ballPosition.y > object5Bounds.min.y && ballPosition.y < object5Bounds.max.y) {
        isInsideObject5 = true;
    } else {
        // ボールがobject5から離れた場合
        if (isInsideObject5) {
            setPoints(prevPoints => prevPoints + 20); // 20点加算
        }
        isInsideObject5 = false;
    }
});//オブジェクト通過後加点処理
    return () => {
        Engine.clear(engine);
        if (render.canvas && render.canvas.parentNode) {
          render.canvas.parentNode.removeChild(render.canvas);
        }
      };
    }, []);
    useEffect(() => {
      if (gameOver) {
        setScore(points);
      }
    }, [gameOver]);
  
    return (
      <div>
        <div style={{ display: 'flex' }}>
        <div id="matter-js-canvas"></div>
            {gameOver && <div>終了</div>}
            <div>Points: {points}</div>
            {gameOver && <div>Final Score: {score}</div>}
            {storedValue && <p>ローカルストレージから取得したデータ: {storedValue}</p>}
          </div>
      </div>
    );
  }