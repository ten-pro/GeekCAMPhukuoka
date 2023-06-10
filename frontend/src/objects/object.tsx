import Matter, { Bodies, Composite } from 'matter-js';

// 使用モジュール
const { Engine, Render, Runner } = Matter;

// エンジンの生成
const engine = Engine.create({
    gravity: {
      x: 0,
      y: 0.2, // 重力を反転させるためにマイナス符号を使用
    },
    timing: {
      timeScale: 1.0, // ステップ数を増やすためのタイムスケールの調整
      timestamp: 0, // 追加：タイムスタンプ
      lastElapsed: 0, // 追加：前回の経過時間
      lastDelta: 0, // 追加：前回のデルタ時間
    },
  });
  

// 物理演算canvasを挿入する要素
const canvas = document.getElementById('canvas-area') as HTMLCanvasElement;

// レンダリングの設定
const render = Render.create({
  element: canvas,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false, // ワイヤーフレームを非表示にする
    background: 'transparent', // 背景色を透明にする
  },
});

// ボールの作成
const ball = Bodies.circle(400, 550, 20, {
    restitution: 1.8,
    render: {
      sprite: {
        texture: 'men.svg', // テクスチャとして使用する画像のパス
        xScale: 1.0, // 追加：水平方向のスケール
        yScale: 1.0, // 追加：垂直方向のスケール
      },
    },
  }); // restitutionは反発係数を表す
  
// ボールの空気抵抗を設定
ball.frictionAir = 0.02;

const ball1 = Bodies.circle(400, 550, 20, {
    restitution: 1.5,
    render: {
      sprite: {
        texture: 'motu.svg', // テクスチャとして使用する画像のパス
        xScale: 1.0, // 追加：水平方向のスケール
        yScale: 1.0, // 追加：垂直方向のスケール
      },
    },
  }); // restitutionは反発係数を表す
  

  const ball2 = Bodies.circle(400, 550, 20, {
    restitution: 1.5,
    render: {
      sprite: {
        texture: 'icigo.svg', // テクスチャとして使用する画像のパス
        xScale: 1.0, // 水平方向のスケール
        yScale: 1.0, // 垂直方向のスケール
      },
    },
  }); // restitutionは反発係数を表す
  

  const ball3 = Bodies.circle(400, 550, 20, {
    restitution: 1.5,
    render: {
      sprite: {
        texture: 'men2.svg', // テクスチャとして使用する画像のパス
        xScale: 1.0, // 水平方向のスケール
        yScale: 1.0, // 垂直方向のスケール
      },
    },
  }); // restitutionは反発係数を表す
  

  const ball4 = Bodies.circle(400, 550, 20, {
    restitution: 1.5,
    render: {
      sprite: {
        texture: 'motu.svg', // テクスチャとして使用する画像のパス
        xScale: 1.0, // 水平方向のスケール
        yScale: 1.0, // 垂直方向のスケール
      },
    },
  }); // restitutionは反発係数を表す
  

  const ball5 = Bodies.circle(400, 550, 20, {
    restitution: 1.5,
    render: {
      sprite: {
        texture: 'icigo.svg', // テクスチャとして使用する画像のパス
        xScale: 1.0, // 水平方向のスケール
        yScale: 1.0, // 垂直方向のスケール
      },
    },
  }); // restitutionは反発係数を表す
  

  const objects: Matter.Body[] = [
    Bodies.circle(400, 300, 50, {
      isStatic: true,
      restitution: 0,
      render: {
        sprite: {
          texture: 'men.svg', // テクスチャとして使用する画像のパス
          xScale: 1.0, // 水平方向のスケール
          yScale: 1.0, // 垂直方向のスケール
        },
      },
    }), // 真ん中に固定された円形のオブジェクト
  ];
  

  const objects1: Matter.Body[] = [
    Bodies.circle(200, 300, 50, {
      isStatic: true,
      restitution: 0,
      render: {
        sprite: {
          texture: 'motu.svg', // テクスチャとして使用する画像のパス
          xScale: 1.0, // 水平方向のスケール
          yScale: 1.0, // 垂直方向のスケール
        },
      },
    }), // 真ん中に固定された円形のオブジェクト
  ];
  

  const objects2: Matter.Body[] = [
    Bodies.circle(200, 100, 50, {
      isStatic: true,
      restitution: 0,
      render: {
        sprite: {
          texture: 'icigo.svg', // テクスチャとして使用する画像のパス
          xScale: 1.0, // 水平方向のスケール
          yScale: 1.0, // 垂直方向のスケール
        },
      },
    }), // 真ん中に固定された円形のオブジェクト
  ];
  

  const objects3: Matter.Body[] = [
    Bodies.circle(450, 100, 50, {
      isStatic: true,
      restitution: 1.2,
      render: {
        sprite: {
          texture: 'men2.svg', // テクスチャとして使用する画像のパス
          xScale: 1.0, // 水平方向のスケール
          yScale: 1.0, // 垂直方向のスケール
        },
      },
    }), // 真ん中に固定された円形のオブジェクト
  ];
  

  const objects4: Matter.Body[] = [
    Bodies.circle(400, 500, 50, {
      isStatic: true,
      restitution: 1.2,
      render: {
        sprite: {
          texture: 'kabuto.svg', // テクスチャとして使用する画像のパス
          xScale: 1.0, // 水平方向のスケール
          yScale: 1.0, // 垂直方向のスケール
        },
      },
    }), // 真ん中に固定された円形のオブジェクト
  ];
  

  const objects5: Matter.Body[] = [
    Bodies.circle(200, 500, 50, {
      isStatic: true,
      restitution: 1.2,
      render: {
        sprite: {
          texture: 'tera.svg', // テクスチャとして使用する画像のパス
          xScale: 1.0, // 水平方向のスケール
          yScale: 1.0, // 垂直方向のスケール
        },
      },
    }), // 真ん中に固定された円形のオブジェクト
  ];
  

// オブジェクトの追加
Composite.add(engine.world, [ball5, ...objects5]);

// 三角形
const trianglevertices: Matter.Vector[][] = [
    [{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 25, y: -50 }],
  ];
  
  const triangleShape: Matter.Body = Bodies.fromVertices(200, 200, trianglevertices, {
    isStatic: true,
    restitution: 0.2,
    render: {
      fillStyle: 'blue',
    },
  });
  

Composite.add(engine.world, triangleShape);

// 剣
const trianglevertices1: Matter.Vector[][] = [
    [{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 25, y: -50 }],
  ];
  
  const triangleShape1: Matter.Body = Bodies.fromVertices(490, 350, trianglevertices1, {
    isStatic: true,
    restitution: 0.2,
    render: {
      sprite: {
        texture: 'ken.svg',
        xScale: 1, // テクスチャのxスケール
        yScale: 1, // テクスチャのyスケール
      },
    },
  });
  
  
  triangleShape1.render = {
    sprite: {
      texture: 'ken.svg',
      xScale: 0.2,
      yScale: 0.2,
    },
  };
  

Composite.add(engine.world, triangleShape1);

// 四角形
const rectangleVertices: Matter.Vector[][] = [
    [{ x: -50, y: -50 }], // 左上の頂点
    [{ x: 50, y: -50 }], // 右上の頂点
    [{ x: 50, y: 50 }], // 右下の頂点
    [{ x: -50, y: 50 }], // 左下の頂点
  ];
  
  const rectangleShape: Matter.Body = Bodies.fromVertices(400, 200, rectangleVertices, {
    isStatic: true,
    restitution: 0.2,
    render: {
      fillStyle: 'red',
    },
  });
  
  
  

Composite.add(engine.world, rectangleShape);

// 五角形
const pentagonVertices: Matter.Vector[][] = [
    [{ x: 0, y: -50 }], // 上の頂点
    [{ x: 47, y: -16 }], // 右上の頂点
    [{ x: 29, y: 40 }], // 右下の頂点
    [{ x: -29, y: 40 }], // 左下の頂点
    [{ x: -47, y: -16 }] // 左上の頂点
  ];
  
  const pentagonShape: Matter.Body = Bodies.fromVertices(100, 200, pentagonVertices, {
    isStatic: true,
    restitution: 0.2,
    render: {
      fillStyle: 'green',
    },
  });
  
  

Composite.add(engine.world, pentagonShape);

// 六角形
const hexagonVertices: Matter.Vector[][] = [
    [{ x: 0, y: -50 }], // 上の頂点
    [{ x: 43, y: -25 }], // 右上の頂点
    [{ x: 43, y: 25 }], // 右下の頂点
    [{ x: 0, y: 50 }], // 下の頂点
    [{ x: -43, y: 25 }], // 左下の頂点
    [{ x: -43, y: -25 }] // 左上の頂点
  ];
  
  const hexagonShape: Matter.Body = Bodies.fromVertices(100, 300, hexagonVertices, {
    isStatic: true,
    restitution: 0.2,
    render: {
      fillStyle: 'yellow',
    },
  });
  
Composite.add(engine.world, hexagonShape);

// 壁の作成
const walls: Matter.Body[] = [
  Bodies.rectangle(400, 0, 800, 10, { isStatic: true }), // 上
  Bodies.rectangle(400, 600, 800, 10, { isStatic: true }), // 下
  Bodies.rectangle(0, 300, 10, 600, { isStatic: true }), // 左
  Bodies.rectangle(800, 300, 10, 600, { isStatic: true }), // 右
];

// オブジェクトの追加
Composite.add(engine.world, walls);

// エンジンの実行
const runner = Runner.create();
Runner.run(runner, engine);

// レンダリングの実行
Render.run(render);


