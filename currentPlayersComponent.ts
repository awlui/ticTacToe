import "https://code.jquery.com/jquery-3.2.1.min.js"; 
import {IplayerService, Icomponent, player as playerEnum} from "./model.js";
export default class currentPlayersComponent implements Icomponent {
    private $el: JQuery;
    constructor(public el: HTMLElement) {
        this.$el = $(el);
    };

    render(currentPlayers: IplayerService[]) {
        let count = 0;
        this.$el.html('');
        if (currentPlayers.length === 0) {
            this.$el.append('<li>No Players currently loaded</li>')
            return;
        }
        for (let player of currentPlayers) {
            let loadedPlayer = $(`<li class="${playerEnum[count]}">Player ${playerEnum[count]}: ${player.name}</li>`);
            loadedPlayer.appendTo(this.$el);
            count++;           
        }

    };
}