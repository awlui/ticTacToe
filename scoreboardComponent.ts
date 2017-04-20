import "https://code.jquery.com/jquery-3.2.1.min.js"; 
import {IplayerService, Icomponent} from "./model.js";
export default class scoreboardComponent implements Icomponent {
    private $el: JQuery;
    constructor(public el: HTMLElement) {
        this.$el = $(el);
    }
    activateGame() {
        $('#scoreboard.gameInactive').removeClass('gameInactive');
    }
    inactivateGame() {
        $('#scoreboard').addClass('gameInactive');
    }
    render(allPlayers: IplayerService[]) {
        this.$el.html('');
        this.$el.append('<li>Player Name <span>Score</span></li>')
        for (let player of allPlayers) {
            let newPlayer = $(`<li>${player.name}<span>${player.score}</span></li>`)
                    .on('click', function(evt) {
                        let event = document.createEvent('CustomEvent');
                        event.initCustomEvent('choosePlayer', true, true, {id: player.id});
                        this.dispatchEvent(event);
                    })
            if (player.currentlyPlaying) {
                newPlayer.addClass('activated').on('click', function(evt) {
                            let event = document.createEvent('CustomEvent');
                            event.initCustomEvent('removePlayer', true, true, {id: player.id});
                            this.dispatchEvent(event);
                        });
            }
            
            newPlayer.appendTo(this.$el);
        }
    }
}