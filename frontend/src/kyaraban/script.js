(() => {
	// Matter.jsのプラグインを利用するためにMatter.useを使用
	Matter.use(MatterAttractors);

	// 定数の定義
	const PATHS = {
		DOME: '0 0 0 250 19 250 20 231.9 25.7 196.1 36.9 161.7 53.3 129.5 74.6 100.2 100.2 74.6 129.5 53.3 161.7 36.9 196.1 25.7 231.9 20 268.1 20 303.9 25.7 338.3 36.9 370.5 53.3 399.8 74.6 425.4 100.2 446.7 129.5 463.1 161.7 474.3 196.1 480 231.9 480 250 500 250 500 0 0 0',
		DROP_LEFT: '0 0 20 0 70 100 20 150 0 150 0 0',
		DROP_RIGHT: '50 0 68 0 68 150 50 150 0 100 50 0',
		APRON_LEFT: '0 0 180 120 0 120 0 0',
		APRON_RIGHT: '180 0 180 120 0 120 180 0'
	};
	const COLOR = {
		BACKGROUND: '#ffffff',
		OUTER: '#ff0000',
		INNER: '#15aabf',
		BUMPER: '#fab005',
		BUMPER_LIT: '#fff3bf',
		PADDLE: '#e64980',
		PINBALL: '#dee2e6'
	};
	const GRAVITY = 0.6;
	const WIREFRAMES = false;
	const BUMPER_BOUNCE = 1.5;
	const PADDLE_PULL = 0.002;
	const MAX_VELOCITY = 50;

	// スコアの要素を取得
	let $currentScore = $('.current-score span');
	let $highScore = $('.high-score span');

	// 共有変数
	let currentScore, highScore;
	let engine, world, render, pinball, stopperGroup;
	let leftPaddle, leftUpStopper, leftDownStopper, isLeftPaddleUp;
	let rightPaddle, rightUpStopper, rightDownStopper, isRightPaddleUp;
	let ichigo = 0, gobou = 0, motu = 0;
	function load() {
		init();
		createStaticBodies();
		createPaddles();
		createPinball();
		createEvents();
	}

	function init() {
		// エンジン（共有）
		engine = Matter.Engine.create();

		// ワールド（共有）
		world = engine.world;
		world.bounds = {
			min: { x: 0, y: 0},
			max: { x: 500, y: 800 }
		};
		world.gravity.y = GRAVITY; // 傾斜したテーブル上の挙動をシミュレート

		// レンダラー（共有）
		render = Matter.Render.create({
			element: $('.container')[0],
			engine: engine,
			options: {
				width: world.bounds.max.x,
				height: world.bounds.max.y,
				wireframes: WIREFRAMES,
				background: COLOR.BACKGROUND
			}
		});
		Matter.Render.run(render);

		// Runner
		let runner = Matter.Runner.create();
		Matter.Runner.run(runner, engine);

		// 衝突フィルタリングのためのグループ
		stopperGroup = Matter.Body.nextGroup(true);

		// 初期値
		currentScore = 0;
		highScore = 0;
		isLeftPaddleUp = false;
		isRightPaddleUp = false;
	}

	function createStaticBodies() {
		Matter.World.add(world, [
			// テーブルの境界（上、下、左、右）
			boundary(250, -30, 500, 100),
			boundary(250, 830, 500, 100),
			boundary(-30, 400, 100, 800),
			boundary(530, 400, 100, 800),

			// ドーム
			path(239, 86, PATHS.DOME),

			// ピン（左、中央、右）
			wallL(140, 140, 20, 40, COLOR.INNER),
			wallC(225, 140, 20, 40, COLOR.INNER),
			wallR(310, 140, 20, 40, COLOR.INNER),

			// 上部バンパー（左、中央、右）
			bumper1(105, 250),
			bumper2(225, 250),
			bumper3(345, 250),

			// 下部バンパー（左、右）
			bumper4(165, 390),
			bumper5(295, 330),
			bumper6(230, 384),

			// シューターレーンの壁
			wall(440, 520, 20, 560, COLOR.OUTER),

			// ドロップ（左、右）
			path(25, 360, PATHS.DROP_LEFT),
			path(425, 360, PATHS.DROP_RIGHT),

			// スリングショット（左、右）
			wallLeft(120, 510, 20, 120, COLOR.INNER),
			wallRight(330, 510, 20, 120, COLOR.INNER),

			// アウトレーンの壁（左、右）
			wall(60, 529, 20, 160, COLOR.INNER),
			wall(390, 529, 20, 160, COLOR.INNER),

			// フリッパーの壁（左、右）
			wall(93, 624, 20, 98, COLOR.INNER, -0.96),
			wall(357, 624, 20, 98, COLOR.INNER, 0.96),

			// アプロン（左、右）
			path(79, 740, PATHS.APRON_LEFT),
			path(371, 740, PATHS.APRON_RIGHT),

			// リセットゾーン（中央、右）
			reset(225, 50),
			reset(465, 30)
		]);
	}

	function createPaddles() {
		// パドルの動きを制限するためのボディ
		leftUpStopper = stopper(160, 591, 'left', 'up');
		leftDownStopper = stopper(140, 743, 'left', 'down');
		rightUpStopper = stopper(290, 591, 'right', 'up');
		rightDownStopper = stopper(310, 743, 'right', 'down');
		Matter.World.add(world, [leftUpStopper, leftDownStopper, rightUpStopper, rightDownStopper]);

		// パドル同士が重なるようにするためのグループ
		let paddleGroup = Matter.Body.nextGroup(true);

		// 左側のパドルメカニズム
		let paddleLeft = {};
		paddleLeft.paddle = Matter.Bodies.trapezoid(170, 660, 20, 80, 0.33, {
			label: 'paddleLeft',
			angle: 1.57,
			chamfer: {},
			render: {
				fillStyle: COLOR.PADDLE
			}
		});
		paddleLeft.brick = Matter.Bodies.rectangle(172, 672, 40, 80, {
			angle: 1.62,
			chamfer: {},
			render: {
				visible: false
			}
		});
		paddleLeft.comp = Matter.Body.create({
			label: 'paddleLeftComp',
			parts: [paddleLeft.paddle, paddleLeft.brick]
		});
		paddleLeft.hinge = Matter.Bodies.circle(142, 660, 5, {
			isStatic: true,
			render: {
				visible: false
			}
		});
		Object.values(paddleLeft).forEach((piece) => {
			piece.collisionFilter.group = paddleGroup
		});
		paddleLeft.con = Matter.Constraint.create({
			bodyA: paddleLeft.comp,
			pointA: { x: -29.5, y: -8.5 },
			bodyB: paddleLeft.hinge,
			length: 0,
			stiffness: 0
		});
		Matter.World.add(world, [paddleLeft.comp, paddleLeft.hinge, paddleLeft.con]);
		Matter.Body.rotate(paddleLeft.comp, 0.57, { x: 142, y: 660 });

		// 右側のパドルメカニズム
		let paddleRight = {};
		paddleRight.paddle = Matter.Bodies.trapezoid(280, 660, 20, 80, 0.33, {
			label: 'paddleRight',
			angle: -1.57,
			chamfer: {},
			render: {
				fillStyle: COLOR.PADDLE
			}
		});
		paddleRight.brick = Matter.Bodies.rectangle(278, 672, 40, 80, {
			angle: -1.62,
			chamfer: {},
			render: {
				visible: false
			}
		});
		paddleRight.comp = Matter.Body.create({
			label: 'paddleRightComp',
			parts: [paddleRight.paddle, paddleRight.brick]
		});
		paddleRight.hinge = Matter.Bodies.circle(308, 660, 5, {
			isStatic: true,
			render: {
				visible: false
			}
		});
		Object.values(paddleRight).forEach((piece) => {
			piece.collisionFilter.group = paddleGroup
		});
		paddleRight.con = Matter.Constraint.create({
			bodyA: paddleRight.comp,
			pointA: { x: 29.5, y: -8.5 },
			bodyB: paddleRight.hinge,
			length: 0,
			stiffness: 0
		});
		Matter.World.add(world, [paddleRight.comp, paddleRight.hinge, paddleRight.con]);
		Matter.Body.rotate(paddleRight.comp, -0.57, { x: 308, y: 660 });
	}

	function createPinball() {
		// x/yはピンボールが発射される位置に設定
		pinball = Matter.Bodies.circle(0, 0, 14, {
			label: 'pinball',
			collisionFilter: {
				group: stopperGroup
			},
			render: {
				fillStyle: COLOR.PINBALL,
			sprite: {
            texture: 'balll.png',
            xScale:0.3,
            yScale:0.3
            }
			}
		});
		Matter.World.add(world, pinball);
		launchPinball();
	}

	function createEvents() {
		// ピンボールが物体に衝突したときのイベント
		Matter.Events.on(engine, 'collisionStart', function(event) {
		// 	var audio = new Audio('4321.mp3');
		// audio.play();
			let pairs = event.pairs;
			pairs.forEach(function(pair) {
				if (pair.bodyB.label === 'pinball') {
					switch (pair.bodyA.label) {
						case 'reset':
							localStorage.setItem('score',currentScore);
							localStorage.setItem('ichigo',ichigo);
							localStorage.setItem('gobou',gobou);
							localStorage.setItem('motu',motu);

							location.href = 'result.html'
							// launchPinball();
							break;
						case 'bumper1':
							pingBumper1(pair.bodyA);
							break;
						case 'bumper2':
								pingBumper2(pair.bodyA);
							break;
						case 'bumper3':
								pingBumper3(pair.bodyA);
							break;
					}
				}
			});
		});

		// ピンボールを制限するためのイベント
		Matter.Events.on(engine, 'beforeUpdate', function(event) {
			// バンパーは速度を急激に増加させるため、制限する
			Matter.Body.setVelocity(pinball, {
				x: Math.max(Math.min(pinball.velocity.x, MAX_VELOCITY), -MAX_VELOCITY),
				y: Math.max(Math.min(pinball.velocity.y, MAX_VELOCITY), -MAX_VELOCITY),
			});

			// ボールがシューターレーンの下に戻らないようにする
			if (pinball.position.x > 450 && pinball.velocity.y > 0) {
				Matter.Body.setVelocity(pinball, { x: 0, y: -10 });
			}
		});

		// マウスドラッグによる操作（ピンボールをつかむためのゴッドモード）
		Matter.World.add(world, Matter.MouseConstraint.create(engine, {
			mouse: Matter.Mouse.create(render.canvas),
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		}));

		// キーボードによるパドルの操作
		$('body').on('keydown', function(e) {
			if (e.which === 37) { // 左矢印キー
				var audio = new Audio('2.mp3');
				audio.play();
				isLeftPaddleUp = true;
			} else if (e.which === 39) { // 右矢印キー
				var audio = new Audio('2.mp3');
				audio.play();
				isRightPaddleUp = true;
			}
		});
		$('body').on('keyup', function(e) {
			if (e.which === 37) { // 左矢印キー
				isLeftPaddleUp = false;
			} else if (e.which === 39) { // 右矢印キー
				isRightPaddleUp = false;
			}
		});
		// クリック/タップによるパドルの操作
		$('.left-trigger')
			.on('mousedown touchstart', function(e) {
				var audio = new Audio('2.mp3');
				audio.play();
				isLeftPaddleUp = true;
			})
			.on('mouseup touchend', function(e) {
				
				isLeftPaddleUp = false;
			});
		$('.right-trigger')
			.on('mousedown touchstart', function(e) {
				var audio = new Audio('2.mp3');
				audio.play();
				isRightPaddleUp = true;
			})
			.on('mouseup touchend', function(e) {
				isRightPaddleUp = false;
			});
	}

	function launchPinball() {
		localStorage.setItem('score',currentScore);
		updateScore(0);
		Matter.Body.setPosition(pinball, { x: 465, y: 765 });
		Matter.Body.setVelocity(pinball, { x: 0, y: -25 + rand(-2, 2) });
		Matter.Body.setAngularVelocity(pinball, 0);
	}

	function pingBumper1(bumper1) {
		ichigo = ichigo + 1;
		updateScore(currentScore + 500);

		// 色を点滅させる
		bumper1.render.fillStyle = COLOR.BUMPER_LIT;
		setTimeout(function() {
			bumper1.render.fillStyle = COLOR.BUMPER;
		}, 100);
	}
	function pingBumper2(bumper2) {
		updateScore(currentScore + 1000);
		gobou = gobou + 1;
		// 色を点滅させる
		bumper2.render.fillStyle = COLOR.BUMPER_LIT;
		setTimeout(function() {
			bumper2.render.fillStyle = COLOR.BUMPER;
		}, 100);
	}
	function pingBumper3(bumper3) {
		updateScore(currentScore + 800);
		motu = motu + 1;
		// 色を点滅させる
		bumper3.render.fillStyle = COLOR.BUMPER_LIT;
		setTimeout(function() {
			bumper3.render.fillStyle = COLOR.BUMPER;
		}, 100);
	}
	

	function updateScore(newCurrentScore) {
		currentScore = newCurrentScore;
		$currentScore.text(currentScore);

		highScore = Math.max(currentScore, highScore);
		$highScore.text(highScore);
	}

	// Matter.jsには範囲内のランダムな値を返す組み込みの関数がありますが、ここではランダム性が重要なため、自前で実装します
	function rand(min, max) {
		return Math.random() * (max - min) + min;
	}

	// ピンボールテーブルの外側の境界
	function boundary(x, y, width, height) {
		return Matter.Bodies.rectangle(x, y, width, height, {
			isStatic: true,
			render: {
				fillStyle: COLOR.OUTER
			}
		});
	}

	// 壁のセグメント
	function wall(x, y, width, height, color, angle = 0) {
		return Matter.Bodies.rectangle(x, y, width, height, {
			angle: angle,
			isStatic: true,
			chamfer: { radius: 10 },
			render: {
				fillStyle: color,
		// 		 sprite: {
        //   texture: './images/ball.png',
        //   xScale:0.4,
        //   yScale:0.4
        // }
			}
		});
	}
	function wallLeft(x, y, width, height, color, angle = 0) {
		return Matter.Bodies.rectangle(x, y, width, height, {
			angle: angle,
			isStatic: true,
			chamfer: { radius: 10 },
			render: {
				fillStyle: color,
				 sprite: {
          texture: 'poal.png',
          xScale:0.4,
          yScale:0.3
        }
			}
		});
	}
	function wallRight(x, y, width, height, color, angle = 0) {
		return Matter.Bodies.rectangle(x, y, width, height, {
			angle: angle,
			isStatic: true,
			chamfer: { radius: 10 },
			render: {
				fillStyle: color,
				 sprite: {
          texture: 'poal.png',
          xScale:0.4,
          yScale:0.3
        }
			}
		});
	}
	function wallL(x, y, width, height, color, angle = 0) {
		return Matter.Bodies.rectangle(x, y, width, height, {
			angle: angle,
			isStatic: true,
			chamfer: { radius: 10 },
			render: {
				fillStyle: color,
				 sprite: {
          texture: 'ranp.png',
          xScale:0.4,
          yScale:0.3
        }
			}
		});
	}
	function wallC(x, y, width, height, color, angle = 0) {
		return Matter.Bodies.rectangle(x, y, width, height, {
			angle: angle,
			isStatic: true,
			chamfer: { radius: 10 },
			render: {
				fillStyle: color,
				 sprite: {
          texture: 'ranp.png',
          xScale:0.4,
          yScale:0.3
        }
			}
		});
	}
	function wallR(x, y, width, height, color, angle = 0) {
		return Matter.Bodies.rectangle(x, y, width, height, {
			angle: angle,
			isStatic: true,
			chamfer: { radius: 10 },
			render: {
				fillStyle: color,
				 sprite: {
          texture: 'ranp.png',
          xScale:0.4,
          yScale:0.3
        }
			}
		});
	}

	// SVGパスから作成されるボディ
	function path(x, y, path) {
		let vertices = Matter.Vertices.fromPath(path);
		return Matter.Bodies.fromVertices(x, y, vertices, {
			isStatic: true,
			render: {
				fillStyle: COLOR.OUTER,

				// ストロークと線の幅を追加して、断片間のわずかな隙間を埋めます
				strokeStyle: COLOR.OUTER,
				lineWidth: 1
			}
		});
	}

	// ピンボールをはじく丸いボディ
	function bumper1(x, y) {
		let bumper1 = Matter.Bodies.circle(x, y, 25, {
			label: 'bumper1',
			isStatic: true,
			render: {
				fillStyle: COLOR.BUMPER,
				 sprite: {
          texture: 'ichigo.png',
          xScale:1,
          yScale:1
        }
			}
		});

		// restitution（反発係数）はボディ作成後に設定する必要があります
		bumper1.restitution = BUMPER_BOUNCE;

		return bumper1;
	}
	function bumper2(x, y) {
		let bumper2 = Matter.Bodies.circle(x, y, 25, {
			label: 'bumper2',
			isStatic: true,
			render: {
				fillStyle: COLOR.BUMPER,
				 sprite: {
          texture: 'motu.png',
          xScale:0.8,
          yScale:0.8
        }
			}
		});

		// restitution（反発係数）はボディ作成後に設定する必要があります
		bumper2.restitution = BUMPER_BOUNCE;

		return bumper2;
	}
	function bumper3(x, y) {
		let bumper3 = Matter.Bodies.circle(x, y, 25, {
			label: 'bumper3',
			isStatic: true,
			render: {
				fillStyle: COLOR.BUMPER,
				 sprite: {
          texture: 'temp.png',
          xScale:0.8,
          yScale:0.8
        }
			}
		});

		// restitution（反発係数）はボディ作成後に設定する必要があります
		bumper3.restitution = BUMPER_BOUNCE;

		return bumper3;
	}

	function bumper4(x, y) {
		let bumper = Matter.Bodies.circle(x, y, 25, {
			label: 'bumper',
			isStatic: true,
			render: {
				fillStyle: 'red',
				 sprite: {
          texture: 'ume.png',
          xScale:0.4,
          yScale:0.4
        }
			}
		});

		// restitution（反発係数）はボディ作成後に設定する必要があります
		bumper.restitution = BUMPER_BOUNCE;

		return bumper;
	}
	function bumper5(x, y) {
		let bumper = Matter.Bodies.circle(x, y, 25, {
			label: 'bumper',
			isStatic: true,
			render: {
				fillStyle: '#0f0',
				 sprite: {
          texture: 'fusan.png',
          xScale:0.4,
          yScale:0.4
        }
			}
		});

		// restitution（反発係数）はボディ作成後に設定する必要があります
		bumper.restitution = BUMPER_BOUNCE;

		return bumper;
	}
	function bumper6(x, y) {
		let bumper = Matter.Bodies.circle(x, y, 5, {
			label: 'bumper',
			isStatic: true,
			render: {
				fillStyle: COLOR.BUMPER,
				 sprite: {
          texture: '172.png',
          xScale:1,
          yScale:1
		        }
			}
		});

		// restitution（反発係数）はボディ作成後に設定する必要があります
		bumper.restitution = BUMPER_BOUNCE;

		return bumper;
	}

	// パドルを制限するための見えないボディ
	function stopper(x, y, side, position) {
		// どのパドルコンポジットと対話するかを決定します
		let attracteeLabel = (side === 'left') ? 'paddleLeftComp' : 'paddleRightComp';

		return Matter.Bodies.circle(x, y, 40, {
			isStatic: true,
			render: {
				visible: false,
			},
			collisionFilter: {
				group: stopperGroup
			},
			plugin: {
				attractors: [
					// stopperは常にaで、他のボディはbです
					function(a, b) {
						if (b.label === attracteeLabel) {
							let isPaddleUp = (side === 'left') ? isLeftPaddleUp : isRightPaddleUp;
							let isPullingUp = (position === 'up' && isPaddleUp);
							let isPullingDown = (position === 'down' && !isPaddleUp);
							if (isPullingUp || isPullingDown) {
								return {
									x: (a.position.x - b.position.x) * PADDLE_PULL,
									y: (a.position.y - b.position.y) * PADDLE_PULL,
								};
							}
						}
					}
				]
			}
		});
	}
	function reset(x, width) {
		return Matter.Bodies.rectangle(x, 781, width, 2, {
			label: 'reset',
			isStatic: true,
			render: {
				fillStyle: '#fff'
			}
		});
	}

	window.addEventListener('load', load, false);
})();

