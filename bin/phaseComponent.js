System.register(["https://code.jquery.com/jquery-3.2.1.min.js", "./model.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var model_js_1, phaseComponent;
    return {
        setters: [
            function (_1) {
            },
            function (model_js_1_1) {
                model_js_1 = model_js_1_1;
            }
        ],
        execute: function () {
            phaseComponent = (function () {
                function phaseComponent(el) {
                    this.el = el;
                    this.$el = $(el);
                }
                phaseComponent.prototype.render = function (phase, currentPlayers) {
                    if (currentPlayers === void 0) { currentPlayers = []; }
                    this.$el.html('');
                    if (phase === model_js_1.gamePhase.xTurn) {
                        var player = currentPlayers[model_js_1.player.X];
                        this.$el.append("<span class=\"X\">" + player.name + "'s turn</span>");
                    }
                    else if (phase === model_js_1.gamePhase.oTurn) {
                        var player = currentPlayers[model_js_1.player.O];
                        this.$el.append("<span class=\"O\">" + player.name + "'s turn</span>");
                    }
                    else if (phase === model_js_1.gamePhase.xWinner) {
                        var player = currentPlayers[model_js_1.player.X];
                        this.$el.append("<span>" + player.name + " Wins</span>");
                    }
                    else if (phase === model_js_1.gamePhase.oWinner) {
                        var player = currentPlayers[model_js_1.player.O];
                        this.$el.append("<span>" + player.name + " Wins</span>");
                    }
                    else if (phase === model_js_1.gamePhase.Draw) {
                        this.$el.append("<span>Draw</span>");
                    }
                    else {
                        if (currentPlayers.length === 0) {
                            this.$el.append('Load two more players...');
                        }
                        else if (currentPlayers.length === 1) {
                            this.$el.append('Load one more player...');
                        }
                        else {
                            this.$el.append('Press Start!');
                        }
                    }
                };
                return phaseComponent;
            }());
            exports_1("default", phaseComponent);
        }
    };
});
//# sourceMappingURL=phaseComponent.js.map