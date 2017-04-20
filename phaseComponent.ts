import "https://code.jquery.com/jquery-3.2.1.min.js";  
import {gamePhase, IplayerService,player as playerEnum} from "./model.js";

export default class phaseComponent {
    public $el: JQuery;
    constructor(public el: HTMLElement) {
        this.$el = $(el);
    }

    render(phase: gamePhase, currentPlayers: IplayerService[]=[]) {
        this.$el.html('');
        if (phase === gamePhase.xTurn) {
            let player = currentPlayers[playerEnum.X];
            this.$el.append(`<span class="X">${player.name}'s turn</span>`);
        } else if (phase === gamePhase.oTurn) {
            let player = currentPlayers[playerEnum.O];
            this.$el.append(`<span class="O">${player.name}'s turn</span>`);            
        } else if (phase === gamePhase.xWinner) {
            let player = currentPlayers[playerEnum.X];
            this.$el.append(`<span>${player.name} Wins</span>`);
        } else if (phase === gamePhase.oWinner) {
            let player = currentPlayers[playerEnum.O];
            this.$el.append(`<span>${player.name} Wins</span>`);         
        } else if (phase === gamePhase.Draw) {
            this.$el.append(`<span>Draw</span>`);   
        } else {
            if (currentPlayers.length === 0) {
                this.$el.append('Load two more players...');
            } else if (currentPlayers.length === 1) {
                this.$el.append('Load one more player...');
            } else {
                this.$el.append('Press Start!');
            }
        }
    }
}