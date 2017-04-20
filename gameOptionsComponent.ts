import "https://code.jquery.com/jquery-3.2.1.min.js"; 
import {gamePhase, Icomponent, player as playerEnum} from "./model.js";
export default class gameOptionsComponent implements Icomponent {
    private $el: JQuery;
    constructor(public el: HTMLElement) {
        this.$el = $(el);
    };

    render(phase: gamePhase, playersLoaded: boolean = false) {
        this.$el.html('');
        if (phase === gamePhase.Inactive) {
            if (playersLoaded) {
                let startButton = $('<button>Start</button>').on('click', function(evt) {
                    let event = document.createEvent('CustomEvent');
                    event.initCustomEvent('startGame', true, true, {});
                    this.dispatchEvent(event);
                });
                startButton.appendTo(this.$el);
            } else {
                this.$el.append('<span>Create and load players first!</span>')
            }
        } else if (phase === gamePhase.xWinner || phase === gamePhase.oWinner || phase === gamePhase.Draw) {
            let restart = $('<button>Restart</button>')
                .on('click', function(evt) {
                    console.log('bolo')
                    let event = document.createEvent('CustomEvent');
                    event.initCustomEvent('restartGame', true, true, {});
                    this.dispatchEvent(event);
            });
            restart.appendTo(this.$el);
            let changeplayers = $('<button>Change Players</button>')
                .on('click', function(evt) {
                    let event = document.createEvent('CustomEvent');
                    event.initCustomEvent('loadNewPlayers', true, true, {});
                    this.dispatchEvent(event);
            });
            changeplayers.appendTo(this.$el);
        }  
    };
}
