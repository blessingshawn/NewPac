import ExampleObject from 'objects/ExampleObject';

class Main extends Phaser.State {

	create() {
		let pacStartTileX = 20;
		let pacStartTileY = 9;
		let mapStartX = 0;
		let mapStartY = 0;
		let totalDots = 0;
		let pacLivesCount = 5;
		let pacLivesImages = new Array(pacLivesCount);
		let pacBig = false;
		let pacAnimPrefix = 'pac';
		let pacDirection = 0;
		let pacDoMove = false;
		let DirectionEnum = Object.freeze({"LEFT":1, "RIGHT":2, "UP":3, "DOWN":4});
		let pacCanMoveUp = false;
		let pacCanMoveDown = false;
		let pacCanMoveLeft = false;
		let pacCanMoveRight = false;
		let pacMoveWhenX = 0;
		let pacMoveWhenY = 0;
		let scoretext;
		let scoretextbackground;
		let score = 0;

        this.pacDoMove = false;
        this.speed = 150;
        this.threshold = 3;
        this.safetile = 13;
        this.gridsizeX = 39;
        this.gridsizeY = 14;
        this.marker = new Phaser.Point();
        this.turnPoint = new Phaser.Point();

        this.directions = [ null, null, null, null, null ];
        this.opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ];

        this.current = Phaser.NONE;
        this.turning = Phaser.NONE;


		this.game.stage.backgroundColor = '#000000';
        
        this.game.world.setBounds(0 - 64, 0, 1280 + 64, 720);
        this.game.camera.setBoundsToWorld = true;
        
        this.map = this.game.add.tilemap('level1');
		this.tileset = this.map.addTilesetImage('tiles');
		this.layer = this.map.createLayer('Background');

        //Lets get the total Dots to complete level from the map
        this.countDots();

        // Add the Pacman sprite and animation
		this.pacman = this.game.add.sprite(mapStartX + (pacStartTileX * this.game.cache.getFrameByName('pacman', 'left0001').width) + 16,  mapStartY + (pacStartTileY * this.game.cache.getFrameByName('pacman', 'left0001').height) + 16, 'pacman');
        this.pacman.anchor.setTo(0.5, 0.5);

        this.pacman.animations.add('pacleft', Phaser.Animation.generateFrameNames('left', 1, 2, '', 4), 30, true);
        this.pacman.animations.add('pacrightup', Phaser.Animation.generateFrameNames('rightup', 1, 2, '', 4), 30, true);  
        this.pacman.animations.add('pacrightdown', Phaser.Animation.generateFrameNames('rightdown', 1, 2, '', 4), 30, true);
        this.pacman.animations.add('pacleftup', Phaser.Animation.generateFrameNames('leftup', 1, 2, '', 4), 30, true);  
        this.pacman.animations.add('pacleftdown', Phaser.Animation.generateFrameNames('leftdown', 1, 2, '', 4), 30, true);
        this.pacman.animations.add('paclargeright', Phaser.Animation.generateFrameNames('largeright', 1, 2, '', 4), 30, true);
        this.pacman.animations.add('paclargeleft', Phaser.Animation.generateFrameNames('largeleft', 1, 2, '', 4), 30, true);
        this.pacman.animations.add('paclargerightup', Phaser.Animation.generateFrameNames('largerightup', 1, 2, '', 4), 30, true);  
        this.pacman.animations.add('paclargerightdown', Phaser.Animation.generateFrameNames('largerightdown', 1, 2, '', 4), 30, true);
        this.pacman.animations.add('paclargeleftup', Phaser.Animation.generateFrameNames('largeleftup', 1, 2, '', 4), 30, true);  
        this.pacman.animations.add('paclargeleftdown', Phaser.Animation.generateFrameNames('largeleftdown', 1, 2, '', 4), 30, true);
        this.pacman.animations.add('pacright', Phaser.Animation.generateFrameNames('right', 1, 2, '', 4), 30, true);

        this.oneimage = this.game.add.sprite(this.game.world.width + this.game.cache.getImage('one').width / 2, 0, 'one');
        this.oneimage.scale.setTo(1.0, 1.0);
        this.oneimage.anchor.setTo(0.5, 0.5);
        
        this.twoimage = this.game.add.sprite(0 - this.game.cache.getImage('two').width / 2, 0, 'two');
        this.twoimage.scale.setTo(1.0, 1.0);
        this.twoimage.anchor.setTo(0.5, 0.5);
        
        this.threeimage = this.game.add.sprite(this.game.world.width + this.game.cache.getImage('three').width / 2, 0, 'three');
        this.threeimage.scale.setTo(1.0, 1.0);
        this.threeimage.anchor.setTo(0.5, 0.5);

        this.player1image = this.game.add.sprite(5, 512, 'player1');
        this.player1image.scale.setTo(1.0, 1.0);

        this.scoretextbackground = this.game.add.bitmapText(10, 512 + 35, 'pinballgray', '[[[[[[[[[[', 48);
        this.scoretext = this.game.add.bitmapText(23, 512 + 33, 'pinballgold', '000000000', 48);   

        var startlevelsound = this.game.add.audio('startlevelsound');
        startlevelsound.volume = 1.0;
        startlevelsound.play();

        var audioDotEater = this.game.add.audio('audioDotEater');
        audioDotEater.volume = 1.0;

		this.countLives();

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.enable(this.pacman, Phaser.Physics.ARCADE);

        // //  Here we'll chain 4 different tweens together and play through them all in a loop
        var threetween = this.game.add.tween(this.threeimage);
        threetween.to({ x: 0 - this.threeimage.width /2 }, 1000, Phaser.Easing.Linear.None);
        threetween.onComplete.add(this.firstTween, this);
        threetween.start();
        
        //  This will create a new object called "cursors", inside it will contain 4 objects: up, down, left and right.
        //  These are all Phaser.Key objects, so anything you can do with a Key object you can do with these.
        this.cursors = this.game.input.keyboard.createCursorKeys();
                                            
	}

	update() {
        if (this.bGameRun)
        {
            this.pacman.body.velocity.x = 0;
            this.pacman.body.velocity.y = 0;

            if (this.pacBig)
            {
                this.pacAnimPrefix = 'paclarge';
            }
            
            this.physics.arcade.collide(this.pacman, this.layer);
            this.physics.arcade.overlap(this.pacman, this.dots, this.eatDot, null, this);

            this.marker.x = this.math.snapToFloor(Math.floor(this.pacman.x), this.gridsizeX) / this.gridsizeX;
            this.marker.y = this.math.snapToFloor(Math.floor(this.pacman.y), this.gridsizeY) / this.gridsizeY;

            //  Update our grid sensors
            this.directions[1] = this.map.getTileLeft(this.layer.index, this.marker.x, this.marker.y);
            this.directions[2] = this.map.getTileRight(this.layer.index, this.marker.x, this.marker.y);
            this.directions[3] = this.map.getTileAbove(this.layer.index, this.marker.x, this.marker.y);
            this.directions[4] = this.map.getTileBelow(this.layer.index, this.marker.x, this.marker.y);

            this.checkKeys();

            if (this.turning !== Phaser.NONE)
            {
                this.turn();
            }
                
            //Lets use the direction to move our little guy
            // if (this.pacMove == this.DirectionEnum.RIGHT && this.pacCanMove)
            // {
            //     this.pacAnimPlay = this.pacAnimPrefix + 'right';
            //     this.pacMoveX = this.pacVelocity;
            //     this.pacMoveY = 0;
            //     this.pacDoMove = true;
            // }
            // else if (this.pacMove == this.DirectionEnum.LEFT && this.pacCanMove)
            // {
            //     this.pacAnimPlay = this.pacAnimPrefix + 'left';
            //     this.pacMoveX = this.pacVelocity * -1;
            //     this.pacMoveY = 0;
            //     this.pacDoMove = true;
            // }
            // else if (this.pacMove == this.DirectionEnum.UP && this.pacCanMove)
            // {
            //     this.pacAnimPlay = this.pacAnimPrefix + 'rightup';
            //     this.pacMoveX = 0;
            //     this.pacMoveY = this.pacVelocity * -1;
            //     this.pacDoMove = true;
            // }
            // else if (this.pacMove == this.DirectionEnum.DOWN && this.pacCanMove)
            // {
            //     this.pacAnimPlay = this.pacAnimPrefix + 'rightdown';
            //     this.pacMoveX = 0;
            //     this.pacMoveY = this.pacVelocity;
            //     this.pacDoMove = true;
            // }
		}
	}

	render() {
        if (this.bGameRun)
        {
            if (this.pacDoMove)
            {
                this.pacman.animations.play( this.pacAnimPlay, 5, true);
                this.pacman.body.velocity.x = this.pacMoveX;
                this.pacman.body.velocity.y = this.pacMoveY;
                this.pacDoMove = false;
            }
            
            //Eat dot if pac is over a dot
            this.doEatDot();
            
            //Update the score
            this.scoretext.setText(new String("000000000" + this.score).slice(-9));
        }
	}

    checkKeys() {

        if (this.cursors.left.isDown && this.current !== Phaser.LEFT)
        {
            this.checkDirection(Phaser.LEFT);
        }
        else if (this.cursors.right.isDown && this.current !== Phaser.RIGHT)
        {
            this.checkDirection(Phaser.RIGHT);
        }
        else if (this.cursors.up.isDown && this.current !== Phaser.UP)
        {
            this.checkDirection(Phaser.UP);
        }
        else if (this.cursors.down.isDown && this.current !== Phaser.DOWN)
        {
            this.checkDirection(Phaser.DOWN);
        }
        else
        {
            //  This forces them to hold the key down to turn the corner
            this.turning = Phaser.NONE;
        }
    }

    checkDirection(turnTo) {

        if (this.turning === turnTo || this.directions[turnTo] === null || this.directions[turnTo].index !== this.safetile)
        {
            //  Invalid direction if they're already set to turn that way
            //  Or there is no tile there, or the tile isn't index 1 (a floor tile)
            return;
        }

        //  Check if they want to turn around and can
        if (this.current === this.opposites[turnTo])
        {
            this.move(turnTo);
        }
        else
        {
            this.turning = turnTo;

            this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
            this.turnPoint.y = (this.marker.y * this.gridsize) + (this.gridsize / 2);
        }
    }

    move(direction) {

        var speed = this.speed;

        if (direction === Phaser.LEFT || direction === Phaser.UP)
        {
            speed = -speed;
        }

        if (direction === Phaser.LEFT || direction === Phaser.RIGHT)
        {
            this.pacman.body.velocity.x = speed;
        }
        else
        {
            this.pacman.body.velocity.y = speed;
        }

        //  Reset the scale and angle (Pacman is facing to the right in the sprite sheet)
        this.pacman.scale.x = 1;
        this.pacman.angle = 0;

        if (direction === Phaser.LEFT)
        {
            this.pacman.scale.x = -1;
        }
        else if (direction === Phaser.UP)
        {
            this.pacman.angle = 270;
        }
        else if (direction === Phaser.DOWN)
        {
            this.pacman.angle = 90;
        }

        this.current = direction;

    }    

    isMoveAvailable(currentTileX, currentTileY, wantedDirection) {
        
        var uTile = this.map.getTile(this.layer.getTileX(this.pacman.x), this.layer.getTileY(this.pacman.y) -1);
        var dTile = this.map.getTile(this.layer.getTileX(this.pacman.x), this.layer.getTileY(this.pacman.y) +1);
        var lTile = this.map.getTile(this.layer.getTileX(this.pacman.x) - 1, this.layer.getTileY(this.pacman.y));
        var rTile = this.map.getTile(this.layer.getTileX(this.pacman.x) + 1, this.layer.getTileY(this.pacman.y));
        
        if (uTile == 12 || uTile == 4 || uTile == 0) 
        { 
            this.pacCanMoveUp = true;
            this.pacMoveWhenX = this.layer.getTileX(this.pacman.x) * 32 + 16;
            this.pacMoveWhenY = (this.layer.getTileY(this.pacman.y) -1) * 32 + 16;
        }
        else { this.pacCanMoveUp = false; }
        if (dTile == 12 || dTile == 4 || dTile == 0) 
        {
            this.pacCanMoveDown = true; 
            this.pacMoveWhenX = this.layer.getTileX(this.pacman.x) * 32 + 16;
            this.pacMoveWhenY = (this.layer.getTileY(this.pacman.y) +1) * 32 + 16;
        }
        else { this.pacCanMoveDown = false; }
        if (lTile == 12 || lTile == 4 || lTile == 0) 
        {
            this.pacCanMoveLeft = true;
            this.pacMoveWhenX = (this.layer.getTileX(this.pacman.x) -1) * 32 + 16;
            this.pacMoveWhenY = (this.layer.getTileY(this.pacman.y) ) * 32 + 16;
        }
        else { this.pacCanMoveLeft = false; }
        if (rTile == 12 || rTile == 4 || rTile == 0) 
        {
            this.pacCanMoveRight = true;
            this.pacMoveWhenX = (this.layer.getTileX(this.pacman.x) + 1) * 32 + 16;
            this.pacMoveWhenY = this.layer.getTileY(this.pacman.y) * 32 + 16;
        }
        else { this.pacCanMoveRight = false; }
    }	

    //Check if pac is over an eatable tile and replace it with an empty tile
    doEatDot() {
        var currentTile = this.map.getTile(this.layer.getTileX(this.pacman.x), this.layer.getTileY(this.pacman.y));;
        
        if (currentTile == 12)
        {
            //Eating dot
            this.map.putTile(0, this.layer.getTileX(this.pacman.x), this.layer.getTileY(this.pacman.y), 0);
            
            if (!this.audioDotEater.isPlaying)
            {
                this.audioDotEater.play();
            }
            this.score = this.score + 100;
            this.totalDots--;
        }
        else if (currentTile == 4)
        {
            //Eating Power dot
            if (!this.pacBig)
            {
                this.pacBig = true;
                this.pacman.body.setSize(32, 32, this.pacman.width / 2 - 16 , this.pacman.height / 2 - 16);
            }
            
            this.map.putTile(0, this.layer.getTileX(this.pacman.x), this.layer.getTileY(this.pacman.y), 0);
            this.score = this.score + 1000;
            this.totalDots --;
        }
    }	

	firstTween() {
        var twotween = this.game.add.tween(this.twoimage);
        twotween.to({ x: this.game.world.width + this.twoimage.width /2 }, 850, Phaser.Easing.Linear.None);
        twotween.onComplete.add(this.theEnd, this);
        twotween.start();
    }
    
    theEnd() {
        //  Here we'll chain 4 different tweens together and play through them all in a loop
        var onetween = this.game.add.tween(this.oneimage);
        onetween.to({ x: 0 - this.oneimage.width /2 }, 850, Phaser.Easing.Linear.None);
        onetween.onComplete.add(this.startGame, this);
        onetween.start();
    }

    //Count how many dots to complete the level
    countDots() {
        for( var y = 0; y < 20; y ++)
        {
            for( var x = 0; x < 40; x ++)
            {
                var tile = this.map.getTile(this.layer.getTileX(x * 32), this.layer.getTileY(y * 32));
                if (tile == 12 || tile ==4 )
                {
                    this.totalDots = this.totalDots + 1;
                }
            }
        }
    }	
	
	//Update the Lives count graphics
    countLives() {
        for (var i=0; i < this.pacLivesCount; i++)
        {
            this.pacLivesImages[i] = this.game.add.sprite(i * 32 + 5, 485, 'pacman');
            this.pacLivesImages[i].frameName = 'right0001';
        }
    }

    startGame() {
        //Set our game start flag
        this.bGameRun = true;
    }

	quitToMenu() {
        this.layer.kill();
        this.startlevelsound.stop();
		console.log('lets quit! back to the main menu');
		this.game.state.start('GameTitle');
	}
}

export default Main;
