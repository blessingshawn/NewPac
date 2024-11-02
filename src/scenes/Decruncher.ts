import "phaser";

export class Decruncher extends Phaser.Scene {

private lines;
private bmpText;
private textlines;
private liness: Array<any>;
private lineheight = 10;
private totallines;


constructor() {
	super({
		key: "Decruncher"
	});
	
}

init(params): void {
	//TODO
    this.totallines = <any>this.sys.game.config.height / this.lineheight;
    this.liness = [];
}

preload(): void {
    //TODO
}

create(): void {
    this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#ffffff");

    var music = this.sound.add('kungfufighting');
    music.play();

    for (var i = 4; i < this.totallines; i++)
    {
        var line = new Phaser.Geom.Rectangle(0, i * this.lineheight, <any>this.sys.game.config.width, this.lineheight);
        this.liness.push(line);
    }

    this.bmpText = this.add.bitmapText(0, 400, 'decrunchfont', 'DECRUNCHING...', 34);

    this.time.delayedCall(4000, this.startGame, [], this);
   

}

update(time): void {
    for (var i = 0; i < this.totallines; i++)
    {
       // this.game.debug.geom(this.lines[i], '#' + Math.floor(Math.random()*16777215).toString(16));
    }
}

startGame(): void {
    this.scene.start("GameTitle");
}

};