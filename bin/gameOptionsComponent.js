System.register(["https://code.jquery.com/jquery-3.2.1.min.js", "./model.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var model_js_1, gameOptionsComponent;
    return {
        setters: [
            function (_1) {
            },
            function (model_js_1_1) {
                model_js_1 = model_js_1_1;
            }
        ],
        execute: function () {
            gameOptionsComponent = (function () {
                function gameOptionsComponent(el) {
                    this.el = el;
                    this.$el = $(el);
                }
                ;
                gameOptionsComponent.prototype.render = function (phase, playersLoaded) {
                    if (playersLoaded === void 0) { playersLoaded = false; }
                    this.$el.html('');
                    if (phase === model_js_1.gamePhase.Inactive) {
                        if (playersLoaded) {
                            var startButton = $('<button>Start</button>').on('click', function (evt) {
                                var event = document.createEvent('CustomEvent');
                                event.initCustomEvent('startGame', true, true, {});
                                this.dispatchEvent(event);
                            });
                            startButton.appendTo(this.$el);
                        }
                        else {
                            this.$el.append('<span>Create and load players first!</span>');
                        }
                    }
                    else if (phase === model_js_1.gamePhase.xWinner || phase === model_js_1.gamePhase.oWinner || phase === model_js_1.gamePhase.Draw) {
                        var restart = $('<button>Restart</button>')
                            .on('click', function (evt) {
                            console.log('bolo');
                            var event = document.createEvent('CustomEvent');
                            event.initCustomEvent('restartGame', true, true, {});
                            this.dispatchEvent(event);
                        });
                        restart.appendTo(this.$el);
                        var changeplayers = $('<button>Change Players</button>')
                            .on('click', function (evt) {
                            var event = document.createEvent('CustomEvent');
                            event.initCustomEvent('loadNewPlayers', true, true, {});
                            this.dispatchEvent(event);
                        });
                        changeplayers.appendTo(this.$el);
                    }
                };
                ;
                return gameOptionsComponent;
            }());
            exports_1("default", gameOptionsComponent);
        }
    };
});
//# sourceMappingURL=gameOptionsComponent.js.map