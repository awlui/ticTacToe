import "https://code.jquery.com/jquery-3.2.1.min.js";
import {gamePhase} from "./model.js";
export default class tictacComponent {
    private $el: JQuery;
    constructor(el: HTMLElement) {
        this.$el = $(el);
    }

    render(board: number[], phase: gamePhase = gamePhase.Inactive, isHuman: boolean=true) {
        let count = 0;
        this.$el.html('');
        function panelGenerator(value: string) {
            if (isHuman) {
                return $(`<div class="panel" data-value="${count++}"><span>${value}</span></div>`).on('click', function(evt) {
                    let event = document.createEvent('CustomEvent');
                    console.log($(this).data('value'));
                    event.initCustomEvent('playerMove', true, true, { value: $(this).data('value')});
                    this.dispatchEvent(event);
                });
            }
            return $(`<div class="panel"><span>#${value}</span></div>`);
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