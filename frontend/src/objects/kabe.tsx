import React, { useEffect, useState, useRef } from 'react';
import { Engine, Render, World, Bodies, Composite, Mouse, Body, Events, MouseConstraint, Vertices, Constraint,Vector } from 'matter-js';


export default function Wall() {
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

        // 曲線を構成する円のパラメータ
        const centerX = render.options?.width ? render.options.width / 3.3 : 0; // 画面中央のx座標
        const centerY = render.options?.height ? render.options.height / 2.6 : 0; // 画面中央のy座標
        const radius = 290; // 円の半径
        const numCircles = 220; // 曲線上の円の数

const ball1 = Bodies.circle(400, 350, 20, { restitution: 1.2 }); // restitutionは反発係数を表す

Composite.add(engine.world, [ball1]);

// 曲線を構築する
// var angleStep = Math.PI / numCircles;
// var circles = [];

// for (var i = 0; i < numCircles; i++) {
//     var angle = angleStep * i;
//     var x = centerX + Math.cos(angle) * radius;
//     var y = centerY - Math.sin(angle) * radius;
//     var circle = Bodies.circle(x, y, 5, {
//         isStatic: true,
//         render: {
//             fillStyle: 'black',
//             strokeStyle: 'black',
//             lineWidth: 1
//         }
//     });
//     circles.push(circle);
// }

// // 曲線を追加
// Composite.add(engine.world, circles);

// const chimney3 = Bodies.rectangle(0, 540, 553, 18, { isStatic: true, angle: Math.PI/2, restitution: 0.8 });
// Composite.add(engine.world, chimney3);

// // 右側壁の作成・追加
// const chimney4 = Bodies.rectangle(600, 540, 553, 18, { isStatic: true, angle: Math.PI/2 ,restitution: 0.8  });
// Composite.add(engine.world, chimney4);

// // 45度の傾斜を持つ長方形の作成
// const chimney5 = Bodies.rectangle(90, 700, 190, 11, { isStatic: true,angle: Math.PI/7, restitution: 0.8 });
// Composite.add(engine.world, chimney5);

// // 反対側の傾斜を持つ長方形の作成
// const chimney6 = Bodies.rectangle(510, 700, 190, 11, { isStatic: true, angle: -Math.PI/7, restitution: 0.8 });
// Composite.add(engine.world, chimney6);

// 先が丸まった長方形の頂点座標
// const vertices: Vector[][] = [
//   [
//     Vector.create(0, -14),
//     Vector.create(70, -7),
//     Vector.create(70, 7),
//     Vector.create(0, 14)
//   ]
// ];

// // 先が丸まった長方形の作成・追加
// const chimney7 = Bodies.fromVertices(200, 750, vertices, { isStatic: true, angle: Math.PI/7, restitution: 0.8 });
// Composite.add(engine.world, chimney7);

// 衝突イベントリスナーを作成
// Events.on(engine, 'collisionStart', function(event) {
//   const pairs = event.pairs;

//   // 衝突したペアをループ処理
//   for (let i = 0; i < pairs.length; i++) {
//     const pair = pairs[i];

//     // 衝突した物体がボールと長方形の場合
//     if (pair.bodyA === ball1 && pair.bodyB === chimney7) {
//       // 長方形を上に45度動かす
//       Body.setAngle(chimney7, -Math.PI / 4);
//       Body.setVelocity(ball1, { x: ball1.velocity.x, y: -15 }); // 速度を調整する場合は値を変更
//       Body.setAngularVelocity(ball1, 2); // 角速度をリセット

//       // 一定時間後に角度を元に戻す
//       // setTimeout(function() {
//       //   Body.setAngle(chimney7, +Math.PI / 7); // 元の角度に戻す
//       // }, 200); // 1秒後に戻す（適宜時間を調整）

//       break;
//     } else if (pair.bodyA === chimney7 && pair.bodyB === ball1) {
//       // 長方形を上に45度動かす
//       Body.setAngle(chimney7, +Math.PI / 4);

//       // 一定時間後に角度を元に戻す
//       setTimeout(function() {
//         Body.setAngle(chimney7, +Math.PI / 7); // 元の角度に戻す
//       }, 200); // 1秒後に戻す（適宜時間を調整）
//       break;
//     }
//   }
// });

// 反対側の先が丸まった長方形の頂点座標
const oppositeVertices: Vector[] = [
  Vector.create(0, -14),
  Vector.create(-70, -7),
  Vector.create(-70, 7),
  Vector.create(0, 14)
];

// 反対側の先が丸まった長方形の作成・追加
const oppositeChimney8 = Bodies.fromVertices(400, 750, [oppositeVertices], { isStatic: true, angle: -Math.PI/7, restitution: 0.8 });
Composite.add(engine.world, oppositeChimney8);
// 衝突イベントリスナーを作成

Events.on(engine, 'collisionStart', function(event) {
  const pairs = event.pairs;

  // 衝突したペアをループ処理
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];

    // 衝突した物体がボールと長方形の場合
    if (pair.bodyA === ball1 && pair.bodyB === oppositeChimney8) {
      // 長方形を上に45度動かす
      Body.setAngle(oppositeChimney8, +Math.PI / 4);
      // ボールを真上に上げる
      Body.setVelocity(ball1, { x: ball1.velocity.x, y: -15 }); // 速度を調整する場合は値を変更
      Body.setAngularVelocity(ball1, 1); // 角速度をリセット

      // 一定時間後に角度を元に戻す
      setTimeout(function() {
        Body.setAngle(oppositeChimney8, -Math.PI / 7); // 元の角度に戻す
      }, 200); // 1秒後に戻す（適宜時間を調整）

      break;
    } else if (pair.bodyA === oppositeChimney8 && pair.bodyB === ball1) {
      // 長方形を上に45度動かす
      Body.setAngle(oppositeChimney8, -Math.PI / 4);

      // 一定時間後に角度を元に戻す
      setTimeout(function() {
        Body.setAngle(oppositeChimney8, -Math.PI / 7); // 元の角度に戻す
      }, 200); // 1秒後に戻す（適宜時間を調整）
      break;
    }
  }

  //↓これは緩やかな形をしたオブジェクト
  // 曲線を構成する円のパラメータ
// const centerX1 = render.options?.width ? render.options.width / 3 : 0; // 画面中央のx座標
// const centerY1 = render.options?.height ? render.options.height / 2.2 : 0; // 画面中央のy座標
// const initialRadius1 = 80; // 初期半径
// const finalRadius1 = 190; // 最終的な半径
// const numCircles1 = 220; // 曲線上の円の数

// // 曲線を構築する
// var angleStep1 = (Math.PI / numCircles1)*0.5;
// var circles1 = [];

// for (var i = 0; i < numCircles1; i++) {
//   var angle1 = angleStep1 * i;
//   var radius1 = initialRadius1 + ((finalRadius1 - initialRadius1) / numCircles1) * i; // 円の半径を線形に変化させる
//   var x = centerX1 + Math.cos(angle1) * radius1;
//   var y = centerY1 - Math.sin(angle1) * radius1;
//   var circle = Bodies.circle(x, y, 20, {
//     isStatic: true,
//     render: {
//       fillStyle: 'black',
//       strokeStyle: 'black',
//       lineWidth: 1
//     }
//   });
//   circles1.push(circle);
// }

// // 曲線を追加
// Composite.add(engine.world, circles1);

//円の４分の１が空いた円のオブジェクト
// 曲線を構成する円のパラメータ
const centerX2 = render.options?.width ? render.options.width / 3.3 : 0; // 画面中央のx座標
const centerY2 = render.options?.height ? render.options.height / 2.6 : 0; // 画面中央のy座標
const radius2 = 140; // 円の半径
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
      fillStyle: 'black',
      strokeStyle: 'black',
      lineWidth: 1
    }
  });
  circles2.push(circle2);
}

// 曲線を追加
Composite.add(engine.world, circles2);

});

    Engine.run(engine);
    Render.run(render);

   return () => {
      Render.stop(render);
      Engine.clear(engine);
    };
   }, []);
  
    return (
      <div>
        <div id="matter-js-canvas"></div>
          <div>
            <div>Points:</div>
          </div>
      </div>
    );
    }