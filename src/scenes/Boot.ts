import "phaser";

export class Boot extends Phaser.Scene {
constructor() {
	super({
		key: "Boot"
	});
	
}

init(params): void {
	//TODO
}

preload(): void {
    //	Here we load the assets required for our preloader (in this case a background and a loading bar)
    //this.load.image('preloaderBackground', './assets/Gfx/preloaderbackground.png');
    //this.load.image('preloaderBar', './assets/Gfx/preloaderbar.png');
}

create(): void {
    this.scene.start("Preload");
}

update(time): void {

}
};

