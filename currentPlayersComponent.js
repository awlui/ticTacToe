System.register(["https://code.jquery.com/jquery-3.2.1.min.js", "./model.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var model_js_1, currentPlayersComponent;
    return {
        setters: [
            function (_1) {
            },
            function (model_js_1_1) {
                model_js_1 = model_js_1_1;
            }
        ],
        execute: function () {
            currentPlayersComponent = (function () {
                function currentPlayersComponent(el) {
                    this.el = el;
                    this.$el = $(el);
                    console.log();
                }
                currentPlayersComponent.prototype.render = function (currentPlayers) {
                    var count = 1;
                    this.$el.html('');
                    if (currentPlayers.length === 0) {
                        return;
                    }
                    var _loop_1 = function (player) {
                        var loadedPlayer = $("<li>Player " + model_js_1.player[count] + ": " + player.name + "</li>");
                        loadedPlayer.append($("<button type=\"button\" class=\"close\" aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                        </button>").on('click', function (evt) {
                            var event = document.createEvent('CustomEvent');
                            event.initCustomEvent('removePlayer', true, true, { id: player.id });
                            this.dispatchEvent(event);
                        }));
                        loadedPlayer.appendTo(this_1.$el);
                        count++;
                    };
                    var this_1 = this;
                    for (var _i = 0, currentPlayers_1 = currentPlayers; _i < currentPlayers_1.length; _i++) {
                        var player = currentPlayers_1[_i];
                        _loop_1(player);
                    }
                };
                ;
                return currentPlayersComponent;
            }());
            exports_1("default", currentPlayersComponent);
        }
    };
});
//# sourceMappingURL=currentPlayersComponent.js.map