System.register(["https://code.jquery.com/jquery-3.2.1.min.js", "./model.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var model_js_1, tictacComponent;
    return {
        setters: [
            function (_1) {
            },
            function (model_js_1_1) {
                model_js_1 = model_js_1_1;
            }
        ],
        execute: function () {
            tictacComponent = (function () {
                function tictacComponent(el) {
                    this.$el = $(el);
                }
                tictacComponent.prototype.render = function (board, phase, isHuman) {
                    if (phase === void 0) { phase = model_js_1.gamePhase.Inactive; }
                    if (isHuman === void 0) { isHuman = true; }
                    var count = 0;
                    this.$el.html('');
                    function panelGenerator(value) {
                        if (isHuman) {
                            return $("<div class=\"panel\" data-value=\"" + count++ + "\"><span>" + value + "</span></div>").on('click', function (evt) {
                                var event = document.createEvent('CustomEvent');
                                console.log($(this).data('value'));
                                event.initCustomEvent('playerMove', true, true, { value: $(this).data('value') });
                                this.dispatchEvent(event);
                            });
                        }
                        return $("<div class=\"panel\"><span>#" + value + "</span></div>");
                    }
                    for (var _i = 0, board_1 = board; _i < board_1.length; _i++) {
                        var panelValue = board_1[_i];
                        if (panelValue === 0) {
                            this.$el.append(panelGenerator(''));
                        }
                        else if (panelValue === 1) {
                            this.$el.append(panelGenerator('X'));
                        }
                        else if (panelValue === 2) {
                            this.$el.append(panelGenerator('O'));
                        }
                    }
                };
                return tictacComponent;
            }());
            exports_1("default", tictacComponent);
        }
    };
});
//# sourceMappingURL=tictacComponent.js.map