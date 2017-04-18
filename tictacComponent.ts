import "https://code.jquery.com/jquery-3.2.1.min.js";
export default class tictacComponent {
    private $el: JQuery;
    constructor(el: HTMLElement) {
        this.$el = $(el);
    }

    render(board: number[], isHuman: boolean=true) {
        console.log('hi')
        this.$el.html('');
        function panelGenerator(value: string) {
            if (isHuman) {
                return $(`<div class="panel">${value}</div>`).on('click', function(evt) {
                    evt.data.value;
                    let event = document.createEvent('CustomEvent');
                    event.initCustomEvent('playerMove', true, true, { value: evt.data.value});
                    this.dispatchEvent(event);
                });
            }
            return $(`<div class="panel">#${value}</div>`);
        }
        for (let panelValue of board) {
            if (panelValue === 0) {
                this.$el.append(panelGenerator(''));
            } else if (panelValue === 1) {
                this.$el.append(panelGenerator('X'));
            } else if (panelValue === 2) {
                this.$el.append(panelGenerator('Y'));
            }
        }

    }

}