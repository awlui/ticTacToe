import "https://code.jquery.com/jquery-3.2.1.min.js"; 
import {IplayerService, Icomponent, player as playerEnum} from "./model.js";
export default class currentPlayersComponent implements Icomponent {
    private $el: JQuery;
    constructor(public el: HTMLElement) {
        this.$el = $(el);
    };
    freezePlayerChange() {
        this.$el.find('button').css('display', 'none');
    };
    unfreezePlayerChange() {
        this.$el.find('button').css('display', 'block');
    }
    render(currentPlayers: IplayerService[]) {
        let count = 1;
        this.$el.html('');
        if (currentPlayers.length === 0) {
            return;
        }
        for (let player of currentPlayers) {
            let loadedPlayer = $(`<li>Player ${playerEnum[count]}: ${player.name}</li>`);
            loadedPlayer.append($(`<button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>`).on('click', function(evt) {
                            let event = document.createEvent('CustomEvent');
                            event.initCustomEvent('removePlayer', true, true, {id: player.id});
                            this.dispatchEvent(event);
                        }));
            loadedPlayer.appendTo(this.$el);
            count++;           
        }

    };
}