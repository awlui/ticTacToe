System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var playerCount, id, playerService;
    return {
        setters: [],
        execute: function () {
            playerCount = 0;
            id = 0;
            playerService = (function () {
                function playerService(name, isHuman) {
                    if (name === void 0) { name = "player#" + playerCount; }
                    if (isHuman === void 0) { isHuman = true; }
                    this.name = name;
                    this.isHuman = isHuman;
                    this.score = 0;
                    this.id = id;
                    this.currentlyPlaying = false;
                    playerCount++;
                    id++;
                    for (var _i = 0, _a = playerService.allPlayers; _i < _a.length; _i++) {
                        var player = _a[_i];
                        if (player.name === name) {
                            throw new Error("Player name already in use.");
                        }
                    }
                }
                playerService.prototype.makeMove = function () {
                    if (this.isHuman === true) {
                        // Human move as promise
                        return;
                    }
                    else if (this.isHuman === false) {
                        //AI Logic as promise
                        return;
                    }
                };
                return playerService;
            }());
            playerService.allPlayers = [];
            exports_1("default", playerService);
        }
    };
});
//# sourceMappingURL=tictacPlayerService.js.map