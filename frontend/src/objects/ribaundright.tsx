import { Engine, Bodies, Composite, Events, Body } from 'matter-js';
import { Vector } from 'matter-js';

export default function RightBar() {
  // Create an instance of the Matter.js engine
  const engine = Engine.create();

  // 反対側の先が丸まった長方形の頂点座標
  const oppositeVertices: Vector[][] = [
    [{ x: 0, y: -14 }],
    [{ x: -70, y: -7 }],
    [{ x: -70, y: 7 }],
    [{ x: 0, y: 14 }]
  ];

  // 反対側の先が丸まった長方形の作成・追加
  const oppositeChimney8 = Bodies.fromVertices(400, 620, oppositeVertices, {
    isStatic: true,
    angle: -Math.PI / 7,
    restitution: 0.8
  });
  
  // Create and initialize the ball
  const x = 100;
  const y = 200;
  const radius = 20;
  const options = {};
  const ball1 = Bodies.circle(x, y, radius, options);

  // 衝突イベントリスナーを作成
  Events.on(engine, 'collisionStart', function (event) {
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
        setTimeout(function () {
          Body.setAngle(oppositeChimney8, -Math.PI / 7); // 元の角度に戻す
        }, 200); // 1秒後に戻す（適宜時間を調整）

        break;
      } else if (pair.bodyA === oppositeChimney8 && pair.bodyB === ball1) {
        // 長方形を上に45度動かす
        Body.setAngle(oppositeChimney8, -Math.PI / 4);

        // 一定時間後に角度を元に戻す
        setTimeout(function () {
          Body.setAngle(oppositeChimney8, -Math.PI / 7); // 元の角度に戻す
        }, 200); // 1秒後に戻す（適宜時間を調整）
        break;
      }
    }
  });

  // Return any JSX elements or components here
  return null;
}
