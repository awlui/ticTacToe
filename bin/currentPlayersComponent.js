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
                }
                ;
                currentPlayersComponent.prototype.render = function (currentPlayers) {
                    var count = 0;
                    this.$el.html('');
                    if (currentPlayers.length === 0) {
                        this.$el.append('<li>No Players currently loaded</li>');
                        return;
                    }
                    for (var _i = 0, currentPlayers_1 = currentPlayers; _i < currentPlayers_1.length; _i++) {
                        var player = currentPlayers_1[_i];
                        var loadedPlayer = $("<li class=\"" + model_js_1.player[count] + "\">Player " + model_js_1.player[count] + ": " + player.name + "</li>");
                        loadedPlayer.appendTo(this.$el);
                        count++;
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