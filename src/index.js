import Boot from 'states/Boot';
import Preload from 'states/Preload';
import GameTitle from 'states/GameTitle';
import Decruncher from 'states/Decruncher';
import Cracktro from 'states/Cracktro';
import Main from 'states/Main';
import GameOver from 'states/GameOver';

class Game extends Phaser.Game {

	constructor() {

		super(1280, 720, Phaser.AUTO);

		this.state.add('Boot', Boot, false);
		this.state.add('Preload', Preload, false);
		this.state.add('GameTitle', GameTitle, false);
		this.state.add('Decruncher', Decruncher, false);
		this.state.add('Cracktro', Cracktro, false);
		this.state.add('Main', Main, false);
		this.state.add('GameOver', GameOver, false);

		this.state.start('Boot');
	}

}

new Game();