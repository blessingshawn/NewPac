class Cracktro extends Phaser.State {

	create() {
		// variables for stars
		this.distance = 300;
		this.speed = 4;
		this.stars;
		this.max = 500;
		this.xx = [];
		this.yy = [];
		this.zz = [];
		//variables for wobble image
		this.slices;
		this.waveformX;
		this.waveformY;
		this.x1;
		this.y1;
		this.cx = 0;
		this.cy = 0;
		//variables for blue raster
		this.data;
		this.rasters;
		this.pos = [];
		this.total = 8; //total blue rasters
		this.offset = 4;//space between blue rasters
		//variables for purple raster
		this.data2;
		this.rasters2;
		this.pos2 = [];
		this.total2 = 8; //total blue rasters
		this.offset2 = 4;//space between blue rasters

		this.game.stage.backgroundColor = 0x000000;

		this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.cracktromusic = this.game.add.audio('cracktromusic');
        this.cracktromusic.volume = 1.0;
		this.cracktromusic.play();

		var sprites = this.game.add.spriteBatch();

		// this is for the stars
		this.stars = [];
		for (var i = 0; i < this.max; i++)
		{
			this.xx[i] = Math.floor(Math.random() * 800) - 400;
			this.yy[i] = Math.floor(Math.random() * 600) - 300;
			this.zz[i] = Math.floor(Math.random() * 1700) - 100;

			var star = this.game.make.sprite(0, 0, 'star');
			star.anchor.set(0.5);
			sprites.addChild(star);
			this.stars.push(star);
		}

		//this is for our wobble image
		var sprite = { x:0, y:1};
		//var tween = this.game.add.tween(sprite).to( { x: 132, y: 16 }, 2000, "Elastic.easeInOut", true, 0, -1, true);
		var tween = this.game.add.tween(sprite).to( { x: 132, y: 16 }, 4000, "Elastic.easeInOut", true, 0, -1, true);
    	this.waveform = tween.generateData(60);
	    this.xl = this.waveform.length - 1;
    	this.yl = this.waveform.length - 1;
		this.slices = [];
		var picWidth = this.game.cache.getImage('icclogowide').width;
		var picHeight = this.game.cache.getImage('icclogowide').height;

		var ys = 4;

		for (var y = 0; y < Math.floor(picHeight/ys); y++)
		{
			//var slice = this.game.make.sprite(300, 100 + (y * ys), 'icclogo');
			var slice = this.game.make.sprite(600, 250 + (y * ys), 'icclogowide');

			slice.crop(new Phaser.Rectangle(0, y * ys, picWidth, ys));

			slice.ox = slice.x;
			slice.oy = slice.y;

			slice.cx = this.game.math.wrap(y, 0, this.xl);
			slice.cy = y;

			slice.anchor.set(0.5);
			sprites.addChild(slice);
			this.slices.push(slice);
		}

		//this is for the blue raster
		//  Generate our motion data
		this.data = this.game.make.tween({ y: 0 }).to( { y: 300 }, 1000, Phaser.Easing.Sinusoidal.In).yoyo(true).generateData(60);

		//  A group of rasters
		this.rasters = this.game.add.group();

		for (var i = 0; i < this.total; i++)
		{
			var raster = this.rasters.create(0, 0, 'rasterblue');
			raster.width = this.game.width;
			raster.alpha = (i + 1) * (1 / this.total);
			this.pos.push(i * this.offset);
		}

	}

	update() {
		//this is for the stars
		for (var i = 0; i < this.max; i++)
		{
			this.stars[i].perspective = this.distance / (this.distance - this.zz[i]);
			this.stars[i].x = this.game.world.centerX + this.xx[i] * this.stars[i].perspective;
			this.stars[i].y = this.game.world.centerY + this.yy[i] * this.stars[i].perspective;

			this.zz[i] += this.speed;

			if (this.zz[i] > 290)
			{
				this.zz[i] -= 600;
			}

			this.stars[i].alpha = Math.min(this.stars[i].perspective / 2, 1);
			this.stars[i].scale.set(this.stars[i].perspective / 2);
			this.stars[i].rotation += 0.1;
		}

		//this is for the wobble image
		for (var i = 0, len = this.slices.length; i < len; i++)
		{
			this.slices[i].x = this.slices[i].ox + this.waveform[this.slices[i].cx].x;
			this.slices[i].y = this.slices[i].oy + this.waveform[this.slices[i].cy].y;

			this.slices[i].cx++;

			if (this.slices[i].cx > this.xl)
			{
				this.slices[i].cx = 0;
			}

			this.slices[i].cy++;

			if (this.slices[i].cy > this.yl)
			{
				this.slices[i].cy = 0;
			}
		}

		//this is for the blue rasters
	    this.rasters.resetCursor();
		for (var i = 0; i < this.rasters.total; i++)
		{
			this.pos[i]++;
			if (this.pos[i] === this.data.length)
			{
				this.pos[i] = 0;
			}
			this.rasters.cursor.y = 100 + this.data[this.pos[i]].y;
			this.rasters.next();
		}

		if (this.spaceKey.isDown)
		{
			//this.startGame;
			this.cracktromusic.destroy();
			this.game.cache.removeSound('cracktromusic');
			this.game.state.start("GameTitle");
		}
	}

//	startGame() {
//		this.game.state.start("GameTitle");
//	}

}

export default Cracktro;
