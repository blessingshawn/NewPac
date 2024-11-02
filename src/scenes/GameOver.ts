import "phaser";

export class GameOver extends Phaser.Scene {
constructor() {
	super({
		key: "GameOver"
	});
	
}

init(params): void {
	//TODO
}

preload(): void {
	//TODO
}

create(): void {
	this.scene.start("Main");
}

update(time): void {

}
};

