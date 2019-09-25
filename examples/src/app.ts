import { AppController } from './game/controllers/AppController';

(<any>window).initGame = () => {
	let game: AppController = new AppController();
	(<any>window).game = game;
};