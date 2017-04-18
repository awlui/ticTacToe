System.register(["https://code.jquery.com/jquery-3.2.1.min.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tictacComponent;
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
            tictacComponent = (function () {
                function tictacComponent(el) {
                    this.$el = $(el);
                }
                tictacComponent.prototype.render = function (board, isHuman) {
                    if (isHuman === void 0) { isHuman = true; }
                    console.log('hi');
                    this.$el.html('');
                    function panelGenerator(value) {
                        if (isHuman) {
                            return $("<div class=\"panel\">" + value + "</div>").on('click', function (evt) {
                                evt.data.value;
                                var event = document.createEvent('CustomEvent');
                                event.initCustomEvent('playerMove', true, true, { value: evt.data.value });
                                this.dispatchEvent(event);
                            });
                        }
                        return $("<div class=\"panel\">#" + value + "</div>");
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
                            this.$el.append(panelGenerator('Y'));
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