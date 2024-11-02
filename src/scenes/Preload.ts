import "phaser";

export class Preload extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    constructor() {
	super({
		key: "Preload",
        pack: {
            files: [
                 { type: 'image', key: 'preloaderBackground', url: './assets/Gfx/preloaderbackground.png' } 
                ]
            }

	});
}


init(params): void {
	//TODO
    this.cursors = this.input.keyboard.createCursorKeys()
}

resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = <any>this.game.config.width / <any>this.game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}


preload(): void {
    this.resize();
    window.addEventListener("resize", this.resize, false);

    /* Preload required assets */
    //	These are the assets we loaded in Boot.js
    //	A nice sparkly background and a loading progress bar
    this.add.image(0, 0, 'preloaderBackground').setOrigin(0).setScale(1);

    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(20, <any>this.sys.game.config.height * 0.75 - 10, <any>this.sys.game.config.width - 20, 50);

    var loadingText = this.make.text({
        x: <any>this.sys.game.config.width / 2,
        y: <any>this.sys.game.config.height * 0.75 - 30,
        text: 'Loading...',
        style: {
            font: '20px monospace',
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
        x: <any>this.sys.game.config.width / 2,
        y: <any>this.sys.game.config.height * 0.75 + 15,
        text: '0%',
        style: {
            font: '18px monospace',
        }
    });
    percentText.setOrigin(0.5, 0.5);
   
    // Register a load progress event to show a load bar
    this.load.on('progress', (value) => {
        progressBar.clear();
        progressBar.fillStyle(0xffa500, 1);
        progressBar.fillRect(30, <any>this.sys.game.config.height * 0.75, <any>this.sys.game.config.width * value, 30);
        percentText.setText(parseInt((value * 100).toString()) + '%');
    });

    this.load.atlas('pacman', './assets/Gfx/MyPacmen.png', './assets/Gfx/MyPacmen.json');
    //this.load.atlasJSONHash('ghosts', './assets/Gfx/MyPacGhostAnim.png', './assets/Gfx/MyPacGhostAnim.json');

    this.load.image('tiles', './assets/Gfx/MyPacTiles.png');
    this.load.tilemapTiledJSON('level1', 'assets/maps/Level1.json');

    this.load.audio('titlemusic', ['./assets/Audio/Music/Title.mp3', './assets/Audio/Music/Title.ogg']);
    this.load.audio('startlevelsound', ['./assets/Audio/Sounds/startlevel.mp3', './assets/Audio/Sounds/startlevel.ogg']);
    this.load.audio('audioDotEater', ['./assets/Audio/Sounds/Waka.mp3', './assets/Audio/Sounds/Waka.ogg']);
    this.load.audio('cracktromusic', ['./assets/Audio/Music/cracktro.mp3', './assets/Audio/Music/cracktro.ogg']);
    this.load.audio('kungfufighting', ['./assets/Audio/Sounds/kungfufighting.mp3', './assets/Audio/Sounds/kungfufighting.ogg']);

    this.load.image('one', './assets/Gfx/1.png');
    this.load.image('two', './assets/Gfx/2.png');
    this.load.image('three', './assets/Gfx/3.png');
    
    this.load.image('player1', './assets/Gfx/Player1.png');
    
    this.load.bitmapFont('pinballgray', './assets/Fonts/pinball_gray.png', './assets/Fonts/pinball_gray.xml');
    this.load.bitmapFont('pinballgold', './assets/Fonts/pinball_goldtrans.png', './assets/Fonts/pinball_goldtrans.xml');
    this.load.bitmapFont('decrunchfont', './assets/Fonts/carrier_command.png', './assets/Fonts/carrier_command.xml');
    
    this.load.spritesheet('rocketstarship', './assets/Gfx/RocketStarshipAnim.png',{ frameWidth: 512, frameHeight: 128 });
    
    this.load.image('ball', './assets/Gfx/pangball.png');

    this.load.image('star', 'assets/Gfx/star.png');
    this.load.image('icclogo', 'assets/Gfx/ICC_Logo.png');
    this.load.image('icclogowide', 'assets/Gfx/ICC_Logo_wide.png');
    this.load.image('rasterblue', 'assets/Gfx/raster-blue.png');
    this.load.image('rasterpurple', 'assets/Gfx/raster-purple.png');
    this.load.image('gametitle', 'assets/Gfx/GameTitle.png');

    // Register a load complete event to launch the title screen when all files are loaded
    this.load.on('complete', () => {
        //title.destroy();
        progressBox.destroy();
        progressBar.destroy();
        loadingText.destroy();
        percentText.destroy();

        this.scene.start('Decruncher');
    });

		//this.ready = false;
}

create(): void {

}

update(time): void {

        const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up!)
		const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down!)
        const leftJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.left!)
		const rightJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right!)
		const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space!)
}
};
