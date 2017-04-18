import {IplayerService} from "./model.js";
let playerCount:number = 0;
let id: number = 0;
export default class playerService implements IplayerService {
    static allPlayers: IplayerService[] = [];
    public score: number = 0;
    public id: number=id;
    public currentlyPlaying: boolean = false;
    constructor(public name: string = `player#${playerCount}`, public isHuman: boolean=true) {
        playerCount++;
        id++;
        for (let player of playerService.allPlayers) {
            if (player.name === name) {
                throw new Error("Player name already in use.");
            }
        }
    }
    makeMove(): number {
        if (this.isHuman === true) {
            // Human move as promise
            return
        } else if (this.isHuman === false) {
            //AI Logic as promise
            return
        }
    }

}


