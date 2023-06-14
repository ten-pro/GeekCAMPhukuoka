// const { Engine, Render, Runner, Bodies, Composite, Events, Body } = Matter;

// // エンジンの生成

// const engine = Engine.create({

//     gravity: {
//         x: 0,
//         y: 0.5 // 重力を反転させるためにマイナス符号を使用
//       }
// });

// // 物理演算canvasを挿入する要素
// const canvas = document.getElementById('canvas-area');

// // レンダリングの設定
// const render = Render.create({
//   element: canvas,
//   engine: engine,
//   options: {
//     width: 600,
//     height: 840,
//     wireframes: false, // ワイヤーフレームを無効にする
//     background: '#d8bfd8' // 背景色を透明にする
//   }
// });

// // ボールの作成
// const ball = Bodies.circle(400, 550, 20, {
//     restitution: 1.2,
//     render: {
//         sprite: {
//           texture: 'black' // テクスチャとして使用する画像のパス
//         }
//       }
//  }); // restitutionは反発係数を表す

//  // エンジンに物体を追加
//  //World.add(engine.world, [ground, ball1]);

// const ball1 = Bodies.circle(400, 350, 20, { restitution: 1.2 }); // restitutionは反発係数を表す

// const ball2 = Bodies.circle(400, 550, 20, { restitution: 0.8 }); // restitutionは反発係数を表す

// const ball3 = Bodies.circle(400, 550, 20, { restitution: 1.2 }); // restitutionは反発係数を表す

// const ball4 = Bodies.circle(400, 550, 20, { restitution: 1.2 }); // restitutionは反発係数を表す

// const ball5 = Bodies.circle(400, 550, 20, { restitution: 1.2 }); // restitutionは反発係数を表す

// // ボード上のオブジェクトを作成
// const objects = [
//   Bodies.circle(400, 300, 50, { isStatic: true, restitution: 0 }), // 真ん中に固定された円形のオブジェクト
// ];

// // オブジェクトの追加
// //Composite.add(engine.world, [ball, ...objects]);
// const objects1 = [
//     Bodies.circle(200, 300, 50, { isStatic: true, restitution: 0 }), // 真ん中に固定された円形のオブジェクト
//   ];


//   // オブジェクトの追加
//  Composite.add(engine.world, [ball1, ...objects1]);

//   const objects2 = [
//     Bodies.circle(200, 100, 50, { isStatic: true, restitution: 0 }), // 真ん中に固定された円形のオブジェクト
//   ];

//   // オブジェクトの追加
//   //Composite.add(engine.world, [ball2, ...objects2]);
//   const objects3 = [
//     Bodies.circle(450, 100, 50, { isStatic: true, restitution: 0 }), // 真ん中に固定された円形のオブジェクト
//   ];

//   // オブジェクトの追加
//   //Composite.add(engine.world, [ball3, ...objects3]);
//   const objects4 = [
//     Bodies.circle(400, 500, 50, { isStatic: true, restitution: 0 }), // 真ん中に固定された円形のオブジェクト
//   ];

//   // オブジェクトの追加

//   //Composite.add(engine.world, [ball4, ...objects4]);
//   const objects5 = [
//     Bodies.circle(200, 500, 50, { isStatic: true, restitution: 0 }), // 真ん中に固定された円形のオブジェクト
//   ];

 

//   // オブジェクトの追加
//  // Composite.add(engine.world, [ball5, ...objects5]);

// // レンダリングを実行
// Render.run(render);

// // エンジンを実行
// Runner.run(engine);


// // 曲線を構成する円のパラメータ
// var centerX = render.options.width / 2; // 画面中央のx座標
// var centerY = render.options.height / 2.8; // 画面中央のy座標
// var radius = 290; // 円の半径
// var numCircles = 220; // 曲線上の円の数

// // 曲線を構築する
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

// const chimney3 = Bodies.rectangle(0o0, 540, 553, 18, { isStatic: true, restitution: 0, angle: Math.PI/2,restitution: 0.8   });
// Composite.add(engine.world, chimney3);

// // 右側壁の作成・追加
// const chimney4 = Bodies.rectangle(600, 540, 553, 18, { isStatic: true, restitution: 0, angle: Math.PI/2 ,restitution: 0.8  });
// Composite.add(engine.world, chimney4);

// // 45度の傾斜を持つ長方形の作成
// const chimney5 = Bodies.rectangle(90, 700, 190, 11, { isStatic: true, restitution: 0, angle: Math.PI/7, restitution: 0.8 });
// Composite.add(engine.world, chimney5);

// // 反対側の傾斜を持つ長方形の作成
// const chimney6 = Bodies.rectangle(510, 700, 190, 11, { isStatic: true, restitution: 0, angle: -Math.PI/7, restitution: 0.8 });
// Composite.add(engine.world, chimney6);

// // 先が丸まった長方形の頂点座標
// const vertices = [
//   { x: 0, y: -14 },
//   { x: 70, y: -7 },
//   { x: 70, y: 7 },
//   { x: 0, y: 14 }
// ];

// // 先が丸まった長方形の作成・追加
// const chimney7 = Bodies.fromVertices(200, 750, vertices, { isStatic: true, restitution: 0, angle: Math.PI/7, restitution: 0.8 });
// Composite.add(engine.world, chimney7);

// // 衝突イベントリスナーを作成
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
//       setTimeout(function() {
//         Body.setAngle(chimney7, +Math.PI / 7); // 元の角度に戻す
//       }, 200); // 1秒後に戻す（適宜時間を調整）

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

// // 反対側の先が丸まった長方形の頂点座標
// const oppositeVertices = [
//   { x: 0, y: -14 },
//   { x: -70, y: -7 },
//   { x: -70, y: 7 },
//   { x: 0, y: 14 }
// ];
// // 反対側の先が丸まった長方形の作成・追加
// const oppositeChimney8 = Bodies.fromVertices(400, 750, oppositeVertices, { isStatic: true, restitution: 0, angle: -Math.PI/7, restitution: 0.8 });
// Composite.add(engine.world, oppositeChimney8);

// // 衝突イベントリスナーを作成
// Events.on(engine, 'collisionStart', function(event) {
//   const pairs = event.pairs;

//   // 衝突したペアをループ処理
//   for (let i = 0; i < pairs.length; i++) {
//     const pair = pairs[i];

//     // 衝突した物体がボールと長方形の場合
//     if (pair.bodyA === ball1 && pair.bodyB === oppositeChimney8) {
//       // 長方形を上に45度動かす
//       Body.setAngle(oppositeChimney8, +Math.PI / 4);
//       // ボールを真上に上げる
//       Body.setVelocity(ball1, { x: ball1.velocity.x, y: -15 }); // 速度を調整する場合は値を変更
//       Body.setAngularVelocity(ball1, 1); // 角速度をリセット

//       // 一定時間後に角度を元に戻す
//       setTimeout(function() {
//         Body.setAngle(oppositeChimney8, -Math.PI / 7); // 元の角度に戻す
//       }, 200); // 1秒後に戻す（適宜時間を調整）

//       break;
//     } else if (pair.bodyA === oppositeChimney8 && pair.bodyB === ball1) {
//       // 長方形を上に45度動かす
//       Body.setAngle(oppositeChimney8, -Math.PI / 4);

//       // 一定時間後に角度を元に戻す
//       setTimeout(function() {
//         Body.setAngle(oppositeChimney8, -Math.PI / 7); // 元の角度に戻す
//       }, 200); // 1秒後に戻す（適宜時間を調整）
//       break;
//     }
//   }
// });
