import "phaser";

export class GameTitle extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

constructor() {
	super({
		key: "GameTitle"
	});
	
}

init(params): void {
	//TODO
    this.cursors = this.input.keyboard.createCursorKeys()
}

preload(): void {
    //TODO
}

create(): void {

    this.add.sprite(<any>this.game.config.width / 2, <any>this.game.config.height /2, 'gametitle').setOrigin();

}

update(time): void {
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space!)

    if (spaceJustPressed)
    {
        //this.startMain;
        this.scene.start("Main");
    }

}
};
