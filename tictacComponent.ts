import "https://code.jquery.com/jquery-3.2.1.min.js";
import {gamePhase} from "./model.js";
export default class tictacComponent {
    private $el: JQuery;
    constructor(el: HTMLElement) {
        this.$el = $(el);
    }

    render(board: number[], phase: gamePhase, isHuman: boolean=true) {
        let count = 0;
        let magicbox = [8,1,6,3,5,7,4,9,2];
        this.$el.html('');
        function panelGenerator(value: string) {
            if (isHuman) {
                let panel = $(`<div class="panel" data-place="${count}" data-value="${magicbox[count]}"><span>${value}</span></div>`)
                .on('click', function(evt) {
                    let event = document.createEvent('CustomEvent');
                    event.initCustomEvent('playerMove', true, true, { value: $(this).data('value'), place: $(this).data('place')});
                    this.dispatchEvent(event);
                })
                .addClass(`${value}`);
                if (value === '') {
                    if (phase === gamePhase.xTurn) {
                        panel.addClass('freePanelX');
                    } else if (phase === gamePhase.oTurn) {
                        panel.addClass('freePanelO');
                    }
                }
                count++;
                return panel;
            }
            return $(`<div class="panel"><span>${value}</span></div>`);
        }
        for (let panelValue of board) {
            if (panelValue === 0) {
                this.$el.append(panelGenerator(''));
            } else if (panelValue === 1) {
                this.$el.append(panelGenerator('X'));
            } else if (panelValue === 2) {
                this.$el.append(panelGenerator('O'));
            }
        }

    }


}