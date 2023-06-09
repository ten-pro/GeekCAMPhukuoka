// 先が丸まった長方形の頂点座標
const vertices = [
  { x: 0, y: -14 },
  { x: 70, y: -7 },
  { x: 70, y: 7 },
  { x: 0, y: 14 }
];

// 先が丸まった長方形の作成・追加
const chimney7 = Bodies.fromVertices(200, 620, vertices, { isStatic: true, restitution: 0, angle: Math.PI/7, restitution: 0.8 });
Composite.add(engine.world, chimney7);

// 衝突イベントリスナーを作成
Events.on(engine, 'collisionStart', function(event) {
  const pairs = event.pairs;

  // 衝突したペアをループ処理
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];

    // 衝突した物体がボールと長方形の場合
    if (pair.bodyA === ball1 && pair.bodyB === chimney7) {
      // 長方形を上に45度動かす
      Body.setAngle(chimney7, -Math.PI / 4);
      Body.setVelocity(ball1, { x: ball1.velocity.x, y: -15 }); // 速度を調整する場合は値を変更
      Body.setAngularVelocity(ball1, 2); // 角速度をリセット

      // 一定時間後に角度を元に戻す
      setTimeout(function() {
        Body.setAngle(chimney7, +Math.PI / 7); // 元の角度に戻す
      }, 200); // 1秒後に戻す（適宜時間を調整）

      break;
    } else if (pair.bodyA === chimney7 && pair.bodyB === ball1) {
      // 長方形を上に45度動かす
      Body.setAngle(chimney7, +Math.PI / 4);

      // 一定時間後に角度を元に戻す
      setTimeout(function() {
        Body.setAngle(chimney7, +Math.PI / 7); // 元の角度に戻す
      }, 200); // 1秒後に戻す（適宜時間を調整）
      break;
    }
  }
});