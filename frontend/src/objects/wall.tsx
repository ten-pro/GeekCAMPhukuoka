import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Engine, Render, World, Bodies, Composite, Mouse, Body, Events, MouseConstraint, Vertices } from 'matter-js';


export default function Wall() {
  const [points, setPoints] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false); 
  const isColliding = useRef<boolean>(false); 
  const [score, setScore] = useState<number>(0);
  const [gobou, setGobou] = useState<number>(0);
  const [motu, setMotu] = useState<number>(0);
  const [ichigo, setIchigo] = useState<number>(0);
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
        engine.timing.timeScale = 0.3;//重力
        const canvasElement = document.getElementById('matter-js-canvas') as HTMLElement | null;
        const render = Render.create({
          element: canvasElement!,
          engine: engine,
          options: {
            width: 700,
            height: 950,
            wireframes: false,
            background: 'gray'
          }
        });//Matterjsの描画範囲

// オブジェクト↓↓↓

//半円オブジェクト
    // 中心のX座標を計算します。render.options.widthが存在する場合はその値を使用し、存在しない場合は0を使用します。
const centerX = render.options?.width ? render.options.width / 3.3 : 0;
// 中心のY座標を計算します。render.options.heightが存在する場合はその値を使用し、存在しない場合は0を使用します。
const centerY = render.options?.height ? render.options.height / 2.6 : 0;
// 曲線を構成する円の半径を設定します。
const radius = 500;
// 曲線を構成する円の数を設定します。
const numCircles = 300;
// X軸とY軸方向のオフセットを設定します。これにより、曲線の位置を調整します。
const offsetX = 140;
const offsetY = 140;
// 円の開始角度を設定します。これにより、曲線の形状を調整します。
const angleOffset = Math.PI / 4;
// 角度のステップサイズを計算します。これは、各円の位置を計算するために使用されます。
const angleStep = Math.PI / (2 * numCircles);
// 曲線を構成する円を格納する配列を作成します。
const circles = [];
// 各円の位置を計算して、配列に追加します。
for (var i = 0; i < numCircles; i++) {
    // 現在の角度を計算します。
    var angle = angleStep * i + angleOffset;
    // 円のX座標を計算します。
    var x = centerX + Math.cos(angle) * radius + offsetX;
    // 円のY座標を計算します。
    var y = centerY - Math.sin(angle) * radius + offsetY;
    // 円を作成します。
    var circle = Bodies.circle(x, y, 5, {
        isStatic: true,
        render: {
            fillStyle: '#ff2f2f',
            strokeStyle: '#ff2f2f',
            lineWidth: 1
        }
    });
    // 配列に円を追加します。
    circles.push(circle);
}//半円作成処理
    const wallLeft = Bodies.rectangle(10, 540, 800, 10, {
      isStatic: true,
      angle: Math.PI / 2,
      collisionFilter: {
        category: defaultCategory
    },
    render: {
      fillStyle: '#ff2f2f'
    },
      restitution: 0
    });//左の壁
    const wallRight = Bodies.rectangle(690, 540, 805, 10, {
      isStatic: true,
      angle: Math.PI / 2,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
    render: {
      fillStyle: '#ff2f2f'
    },
      restitution: 0
    });//右の壁
    const wallBottom = Bodies.rectangle(500, 1030, 1100, 10, {
      isStatic: true,
      restitution: 0,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      render: {
        // fillStyle: 'transparent',
        fillStyle: 'blue',
      }
    });//地面
    // const ball = Bodies.circle(660, 520, 15, {
      const ball = Bodies.circle(300, 500, 15, {
      render: {
        // sprite: {
        //   texture: './images/ball.png',
        //   xScale:0.4,
        //   yScale:0.4
        // }
      },
       restitution: 1.4

      }); //ボール
      ball.collisionFilter = {
        category: defaultCategory,
        mask: defaultCategory // デフォルトカテゴリーとのみ衝突
    };//ボールに対してcollisionFilterを設定
    const patation = Bodies.rectangle(640, 560, 700, 10, {
      isStatic: true,
      angle: Math.PI / 2,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
    render: {
      fillStyle: '#ff2f2f'
    },
      restitution: 0
    });//発射台の左の壁
    const launcher = Bodies.rectangle(665, 900, 40, 40, {
      isStatic: true,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
    render: {
      fillStyle: '#ff2f2f'
    },
      restitution: 0
    });//発射台、真四角の図形
    const diagonal = Bodies.rectangle(590, 380, 130, 10, {
      isStatic: true,
      angle: 3.8,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
    render: {
      fillStyle: '#ff2f2f',
    },
      restitution: 0
    });//右上の斜めの図形1
    const object1 = Bodies.rectangle(590, 395, 100, 10, {
      isStatic: true,
      restitution: 0,
      angle: 3.8,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      render: {
        sprite: {
          texture: './images/yellow2.png',
          xScale:1.2,
          yScale:1.2
        },
        fillStyle: 'red'
      }
    });//右上の斜めの図形2
    const object2 = Bodies.rectangle(400, 150, 50, 10, {
      isStatic: true,
      restitution: 0,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      angle: 1.6,
      render: {
        sprite: {
          texture: './images/red.png',
          xScale:1,
          yScale:1
        },
        fillStyle: 'blue'
      }
    });//赤いランプ1
    const object6 = Bodies.rectangle(350, 150, 50, 10, {
      isStatic: true,
      restitution: 0,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      angle: 1.6,
      render: {
        sprite: {
          texture: './images/red.png',
          xScale:1,
          yScale:1
        },
        fillStyle: 'blue'
      }
    });//赤いランプ2
    const object3 = Bodies.rectangle(250, 150, 40, 40, {
      isStatic: true,
      restitution: 1,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      render: {
        sprite: {
          texture: './images/object1.png',
          xScale:1.2,
          yScale:1.2
        },
        fillStyle: 'pink'
      }
    });//左上オブジェクト
    const hiyoko = Bodies.circle(130, 130, 15, {
      isStatic: true,
      restitution: 0,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      render: {
        sprite: {
          texture: './images/object2.png',
          xScale:1,
          yScale:1
        },
        fillStyle: 'orange'
      }
    });//緑のオブジェクト
    const bottomLeft = Bodies.rectangle(250, 190, 70, 10, {
      isStatic: true,
      angle: 6.3,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      restitution: 0,
      render: {
        sprite: {
          texture: './images/object3.png',
          xScale:1,
          yScale:1
        }
      }
    });//左上のオブジェクトの下の黄色
    const object4 = Bodies.rectangle(100, 300, 30, 10, {
      isStatic: true,
      isSensor: true, // センサーとして働くため、物理的な衝突は発生しない
      angle: 0.1,
      collisionFilter: {
        category: sensorCategory,
        mask: defaultCategory
      },
      render: {
        fillStyle: 'green',
        sprite: {
          texture: './images/purple.png',
          xScale:1,
          yScale:1
        }
      }
    });//通過オブジェクト紫
    const object5 = Bodies.rectangle(110, 330, 40, 10, {
      isStatic: true,
      isSensor: true, // センサーとして働くため、物理的な衝突は発生しない
      angle: 3.1,
      collisionFilter: {
        category: sensorCategory,
        mask: defaultCategory
      },
      render: {
        fillStyle: 'yellow',
        sprite: {
          texture: './images/red2.png',
          xScale:1.2,
          yScale:1.3
        }
      }
    });//通過オブジェクト赤
    const object7 = Bodies.rectangle(130, 370, 40, 10, {
      isStatic: true,
      isSensor: true, // センサーとして働くため、物理的な衝突は発生しない
      angle: 2.9,
      collisionFilter: {
        category: sensorCategory,
        mask: defaultCategory
      },
      render: {
        fillStyle: 'yellow',
        sprite: {
          texture: './images/objectq.png',
          xScale:1.3,
          yScale:1.3
        }
      }
    });//通過オブジェクト黄色1
    const object8 = Bodies.rectangle(160, 400, 40, 10, {
      isStatic: true,
      isSensor: true, // センサーとして働くため、物理的な衝突は発生しない
      angle: 2.7,
      collisionFilter: {
        category: sensorCategory,
        mask: defaultCategory
      },
      render: {
        fillStyle: 'yellow',
        sprite: {
          texture: './images/objectw.png',
          xScale:1.1,
          yScale:1.1
        }
      }
    });//通過オブジェクト黄色2
    const bottomRight = Bodies.rectangle(50, 450, 50, 10, {
      isStatic: true,
      angle: 1.6,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      restitution: 0,
      render: {
        sprite: {
          texture: './images/red.png',
          xScale:1.2,
          yScale:1.2
        }
      }
    });//左のランプ
    const niwaka = Bodies.rectangle(100, 450, 50, 10, {
      isStatic: true,
      restitution: 0,
      angle: 1.6,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      render: {
        sprite: {
          texture: './images/red.png',
          xScale:1.2,
          yScale:1.2
        }
      }
    });//左のランプ2
    const trapezoidVertices1 = [
      { x: 415, y: 100 },
      { x: 425, y: 100 },
      { x: 450, y: 250 },
      { x: 410, y: 250 }
  ];//左の弾くやつの図形構成
  const trapezoidVertices2 = [
    { x: 395, y: 100 },
    { x: 405, y: 100 },
    { x: 430, y: 250 },
    { x: 400, y: 250 }
];//右の弾くやつの図形構成
  const trapezoid1 = Bodies.fromVertices(250, 860, [trapezoidVertices1], {
      isStatic: true,
      restitution: 20,
      angle: 2,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      render: {
          fillStyle: '#FFFFFF',
          sprite: {
            texture: './images/flipLeft.png',
            xScale:0.7,
            yScale:0.7
          }
      }
  }, true);//左の弾くやつのオブジェクト
  const trapezoid2 = Bodies.fromVertices(470, 870, [trapezoidVertices2], {
    isStatic: true,
    angle: 4.4,
    restitution: 20,
    collisionFilter: {
      category: defaultCategory // デフォルトカテゴリーに設定
  },
    render: {
        fillStyle: '#FFFFFF',
        sprite: {
          texture: './images/flipRight.png',
          xScale:0.7,
          yScale:0.7
        }
    }
}, true);//右の弾くやつのオブジェクト
const bottomRight1 = Bodies.rectangle(90, 800, 250, 5, {
  isStatic: true,
  angle: 3.6,
  collisionFilter: {
    category: defaultCategory // デフォルトカテゴリーに設定
},
  restitution: 0,
  render: {
    fillStyle:'#fefefe'
    // sprite: {
    //   texture: './images/red.png',
    //   xScale:1.2,
    //   yScale:1.2
    // }
  }
});//左の白線
const bottomRight2 = Bodies.rectangle(590, 845, 100, 5, {
  isStatic: true,
  angle: 2.8,
  collisionFilter: {
    category: defaultCategory // デフォルトカテゴリーに設定
},
  restitution: 0,
  render: {
    fillStyle:'#fefefe'
    // sprite: {
    //   texture: './images/red.png',
    //   xScale:1.2,
    //   yScale:1.2
    // }
  }
});//右の白線
const bottomRight3 = Bodies.rectangle(60, 600, 40, 10, {
  isStatic: true,
  angle: 1.6,
  collisionFilter: {
    category: defaultCategory // デフォルトカテゴリーに設定
},
  restitution: 0,
  render: {
    fillStyle:'#fefefe',
    sprite: {
      texture: './images/object5.png',
      xScale:1.2,
      yScale:1.2
    }
  }
});//左の点オブジェクト
const trapezoidVertices4 = [
  { x: 380, y: 230 },
  { x: 380, y: 230 },
  { x: 480, y: 390 },
  { x: 380, y: 350 }
];//左の三角の構成
const trapezoid3 = Bodies.fromVertices(130, 620, [trapezoidVertices4], {
  isStatic: true,
  angle: 0,
  collisionFilter: {
    category: defaultCategory // デフォルトカテゴリーに設定
},
  render: {
      fillStyle: '#FFFFFF',
      // sprite: {
      //   texture: './images/sankaku.png',
      //   xScale:1.5,
      //   yScale:1.5
      // }
  }
}, true);//左の三角
const trapezoidVertices5 = [
  { x: 380, y: 230 },
  { x: 380, y: 230 },
  { x: 480, y: 390 },
  { x: 380, y: 350 }
];//右の三角図形構成
const trapezoid4 = Bodies.fromVertices(550, 590, [trapezoidVertices5], {
  isStatic: true,
  angle: 4.8,
  collisionFilter: {
    category: defaultCategory // デフォルトカテゴリーに設定
},
  render: {
      fillStyle: '#FFFFFF',
      sprite: {
        texture: './images/walll.png',
        xScale:1.5,
        yScale:1.5
      }
  }
}, true);//右の三角
const bottomRight4 = Bodies.rectangle(610, 540, 40, 10, {
  isStatic: true,
  angle: 1.6,
  collisionFilter: {
    category: defaultCategory // デフォルトカテゴリーに設定
},
  restitution: 0,
  render: {
    fillStyle:'#fefefe',
    sprite: {
      texture: './images/object5.png',
      xScale:1.2,
      yScale:1.2
    }
  }
});//右の点オブジェクト
const trapezoidVertices6 = [
  { x: 290, y: 270 },
  { x: 290, y: 270 },
  { x: 350, y: 310 },
  { x: 350, y: 250 }
];//いちご
const trapezoid5 = Bodies.fromVertices(270, 240, [trapezoidVertices6], {
  isStatic: true,
  angle: 5.1,
  collisionFilter: {
    category: defaultCategory // デフォルトカテゴリーに設定
},
  render: {
      fillStyle: '#FFFFFF',
      sprite: {
        texture: './images/ichigo.png',
        xScale:1.4,
        yScale:1.4
      }
  }
}, true);//いちご
const tempra = Bodies.circle(540, 240, 10, {
  isStatic: true,
  render: {
    sprite: {
      texture: './images/temp.png',
      xScale:1.3,
      yScale:1.3
    }
  },
   restitution: 1.1
  }); //ramen
  const motu = Bodies.circle(370, 300, 10, {
    isStatic: true,
    render: {
      sprite: {
        texture: './images/motu.png',
        xScale:1.3,
        yScale:1.3
      }
    },
     restitution: 1.1
    }); //motu
    const bottomRight5 = Bodies.rectangle(370, 380, 50, 10, {
      isStatic: true,
      angle: 0,
      collisionFilter: {
        category: defaultCategory // デフォルトカテゴリーに設定
    },
      restitution: 0,
      render: {
        sprite: {
          texture: './images/yellow.png',
          xScale:1,
          yScale:1
        }
      }
    });//モツの下の黄色の
// 曲線を構成する円のパラメータ
const centerX2 = render.options?.width ? render.options.width / 1.3 : 0; // 画面中央のx座標
const centerY2 = render.options?.height ? render.options.height / 3.9 : 0; // 画面中央のy座標
const radius2 = 100; // 円の半径
const numCircles2 = 220; // 曲線上の円の数
// 曲線を構築する
var angleStep2 = (2 * Math.PI) / numCircles2; // 角度のステップ
var circles2 = [];
// 4分の1の円をスキップするための条件を設定
var skipRangeStart = 0;
var skipRangeEnd = Math.floor(numCircles2 / 4);
for (var i = 0; i < numCircles2; i++) {
  // スキップ範囲内の場合はスキップして次のループへ進む
  if (i >= skipRangeStart && i < skipRangeEnd) {
    continue;
  }
  var angle = -(angleStep2 * i + Math.PI / 2); // 角度に90度を加える
  var x = centerX2 + Math.cos(angle) * radius2;
  var y = centerY2 - Math.sin(angle) * radius2;

  var circle2 = Bodies.circle(x, y, 5, {
    isStatic: true,
    render: {
      fillStyle: 'red',
      strokeStyle: 'red',
      lineWidth: 1
    }
  });
  circles2.push(circle2);
}
// 曲線を追加
Composite.add(engine.world, circles2);


    
// Events.on(engine, 'beforeUpdate', () => {
//   const currentAngle = object3.angle;
//   const newAngle = currentAngle + 0.03;
//   Body.setAngle(object3, newAngle);
// });//ラーメン回転処理
// Events.on(engine, 'beforeUpdate', () => {
//   const currentAngle = hiyoko.angle;
//   const newAngle = currentAngle - 0.03;
//   Body.setAngle(hiyoko, newAngle);
// });//ひよこ饅頭回転処理

document.addEventListener('keydown', (event) => {
  switch(event.key) {
      // 左方向キーが押された場合
      case 'ArrowLeft':
          // 左の弾くアニメーション
          let angleLeft = 2.0;
          const endAngleLeft = 1.0;
          const stepLeft = 0.5;
          let decreasingLeft = true;
          const intervalIdLeft = setInterval(() => {
              // 角度を減らす
              if (decreasingLeft) {
                  angleLeft -= stepLeft;
                  if (angleLeft <= endAngleLeft) {
                      decreasingLeft = false;
                  }
              } 
              // 角度を増やす
              else {
                  angleLeft += stepLeft;
                  if (angleLeft >= 2.0) {
                      clearInterval(intervalIdLeft);
                  }
              }
              Body.setAngle(trapezoid1, angleLeft);
          }, 10); // 20ミリ秒ごとに角度を更新
          break;

      // 右方向キーが押された場合
      case 'ArrowRight':
          // 右の弾くアニメーション
          let angleRight = 4.4;
          const endAngleRight = 5.4;
          const stepRight = 0.2;
          let increasingRight = true;
          const intervalIdRight = setInterval(() => {
              if (increasingRight) {
                  angleRight += stepRight;
                  if (angleRight >= endAngleRight) {
                      increasingRight = false;
                  }
              } else {
                  angleRight -= stepRight;
                  if (angleRight <= 4.4) {
                      clearInterval(intervalIdRight);
                  }
              }
              Body.setAngle(trapezoid2, angleRight);
          }, 10);
          break;
  }
});

    World.add(engine.world, [bottomRight5, motu, tempra, trapezoid5, bottomRight4, trapezoid4, trapezoid3, bottomRight3, bottomRight2, bottomRight1, object8, object7, object6, ...circles, object5, object4, hiyoko, niwaka, bottomRight, bottomLeft, object3, trapezoid2, trapezoid1, object2, object1, ball, wallLeft,wallRight, wallBottom, patation, diagonal, launcher]);//オブジェクトを追加したら編集
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
        if (!isColliding.current && ((pair.bodyA === ball && pair.bodyB === motu) || (pair.bodyA === motu && pair.bodyB === ball))) {
          // Collision detected, increase points
          setMotu(prevMotu => prevMotu + 0);
          // Set isColliding to true to avoid adding points again until collision ends
          isColliding.current = true;
        }
        if (!isColliding.current && ((pair.bodyA === ball && pair.bodyB === trapezoid5) || (pair.bodyA === trapezoid5 && pair.bodyB === ball))) {
          // Collision detected, increase points
          setIchigo(prevIchigo => prevIchigo + 0);
          // Set isColliding to true to avoid adding points again until collision ends
          isColliding.current = true;
        }
        if (!isColliding.current && ((pair.bodyA === ball && pair.bodyB === tempra) || (pair.bodyA === tempra && pair.bodyB === ball))) {
          // Collision detected, increase points
          setGobou(prevGobou => prevGobou + 40);
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
        if (isColliding.current && ((pair.bodyA === ball && pair.bodyB === motu) || (pair.bodyA === motu && pair.bodyB === ball))) {
          // Set isColliding back to false
          isColliding.current = false;
        }
        if (isColliding.current && ((pair.bodyA === ball && pair.bodyB === trapezoid5) || (pair.bodyA === trapezoid5 && pair.bodyB === ball))) {
          // Set isColliding back to false
          isColliding.current = false;
        }
        if (isColliding.current && ((pair.bodyA === ball && pair.bodyB === tempra) || (pair.bodyA === tempra && pair.bodyB === ball))) {
          // Set isColliding back to false
          isColliding.current = false;
        }
      });
    });//オブジェクトが衝突して離れたのを検知する処理
    Events.on(engine, 'afterUpdate', () => {
      // ボールが地面から1000px以上離れているか確認
      if (ball.position.y < wallBottom.position.y - 1795) {
        setGameOver(true);
      }
    });//ボールが10000px以上離れたらゲームオーバー
    Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        if ((pair.bodyA === ball && pair.bodyB === wallBottom) || (pair.bodyA === wallBottom && pair.bodyB === ball)) {
          setGameOver(true);
          // location.href = '/result'
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
            <div>Points: {gobou}</div>
            {gameOver && <div>Final Score: {score}</div>}
            {storedValue && <p>ローカルストレージから取得したデータ: {storedValue}</p>}
          </div>
      </div>
    );
  }