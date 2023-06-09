
// 左側壁の作成・追加
const chimney3 = Bodies.rectangle(0o0, 300, 553, 18, { isStatic: true, restitution: 0, angle: Math.PI/2,restitution: 0.8   });
Composite.add(engine.world, chimney3);

// 右側壁の作成・追加
const chimney4 = Bodies.rectangle(600, 300, 553, 18, { isStatic: true, restitution: 0, angle: Math.PI/2 ,restitution: 0.8  });
Composite.add(engine.world, chimney4);

// 45度の傾斜を持つ長方形の作成
const chimney5 = Bodies.rectangle(90, 570, 190, 11, { isStatic: true, restitution: 0, angle: Math.PI/7, restitution: 0.8 });
Composite.add(engine.world, chimney5);

// 反対側の傾斜を持つ長方形の作成
const chimney6 = Bodies.rectangle(510, 570, 190, 11, { isStatic: true, restitution: 0, angle: -Math.PI/7, restitution: 0.8 });
Composite.add(engine.world, chimney6);