System.register(["https://code.jquery.com/jquery-3.2.1.min.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var scoreboardComponent;
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
            scoreboardComponent = (function () {
                function scoreboardComponent(el) {
                    this.el = el;
                    this.$el = $(el);
                }
                scoreboardComponent.prototype.render = function (allPlayers) {
                    this.$el.html('');
                    this.$el.append('<li>Player Name <span>Score</span></li>');
                    var _loop_1 = function (player) {
                        var newPlayer = $("<li>" + player.name + "<span>" + player.score + "</span></li>")
                            .on('click', function (evt) {
                            var event = document.createEvent('CustomEvent');
                            event.initCustomEvent('choosePlayer', true, true, { id: player.id });
                            this.dispatchEvent(event);
                        });
                        if (player.currentlyPlaying) {
                            newPlayer.addClass('activated');
                        }
                        newPlayer.appendTo(this_1.$el);
                    };
                    var this_1 = this;
                    for (var _i = 0, allPlayers_1 = allPlayers; _i < allPlayers_1.length; _i++) {
                        var player = allPlayers_1[_i];
                        _loop_1(player);
                    }
                };
                return scoreboardComponent;
            }());
            exports_1("default", scoreboardComponent);
        }
    };
});
//# sourceMappingURL=scoreboardComponent.js.map