import {IplayerService, IboardService, gamePhase, player} from "./model.js";
import playerService from "./tictacPlayerService.js";
let empty: number[] = [0,0,0,0,0,0,0,0,0];
let magicbox: number[] = [8,1,6,3,5,7,4,9,2];
function check(arr) {
    let finalArr = [];
    let num;

    for (num in arr) {
        let num2;
        let arr2;
        arr2 = arr.slice(parseInt(num) + 1);
        for (num2 in arr2) {
            let num3;
            let arr3 = arr2.slice(parseInt(num2)+1);
            for (num3 in arr3) {
                finalArr.push((arr[num]+arr2[num2]+arr3[num3]));
            }
        }
    }
    console.log(finalArr)
    return finalArr
}
export default class boardService implements IboardService {
    public playerX: IplayerService;
    public playerO: IplayerService;
    public phase: gamePhase = gamePhase.Inactive;
    public currentPlayers: IplayerService[]=[];
    constructor(public boardGameState: number[]=empty) {
        
    }
    loadPlayer(player: IplayerService) {
        if (this.currentPlayers.length < 2) {
            player.currentlyPlaying = true;
            this.currentPlayers.push(player);
        }
    }
    declarePlayers() {
        if (this.currentPlayers.length === 1) {
            this.playerX = this.currentPlayers[0];
            this.playerO = null;
        } else if (this.currentPlayers.length === 2) {
            this.playerX = this.currentPlayers[0];
            this.playerO = this.currentPlayers[1];
        }
    }
    removeLoadedPlayer(id: number) {
        this.currentPlayers = this.currentPlayers.filter(function(player) {
            if (player.id !== id) {
                return true;
            }
            player.currentlyPlaying = false;
            return false;
        });
        this.declarePlayers();
    }
    validGame() {
        return (this.currentPlayers.length === 2)
    }
    startGame() {
        this.phase = gamePhase.xTurn;
    }
    validMove(move: number) {
        if (this.boardGameState[move] === 0) {
            return true;
        }
    }
    makeMove(move: number) {
        if (this.phase === gamePhase.xTurn) {
            this.boardGameState[move] = 1;
        } else if (this.phase === gamePhase.oTurn) {
            this.boardGameState[move] = 2;
        }
    }
    nextPlayer() {
        let currentPlayer;
        if (this.phase === gamePhase.xTurn) {
            this.phase = gamePhase.oTurn;
            currentPlayer = this.currentPlayers[player.O]
        } else if (this.phase === gamePhase.oTurn) {
            this.phase = gamePhase.xTurn;
            currentPlayer = this.currentPlayers[player.X];
        }
        return currentPlayer;
    }
    checkForWinner(boardGameState: number[]) {
        let tallyX = [];
        let tallyO = [];
        let countX = 0;
        for (let place in boardGameState) {
            if (boardGameState[place] === 1) {
                tallyX.push(magicbox[place]);
                countX++;
            } else if (boardGameState[place] === 2) {
                tallyO.push(magicbox[place]);
            }
        }
        if (tallyX.length < 3) {
            return gamePhase.Active;
        }
        if (~check(tallyX).indexOf(15)) {
            this.phase = gamePhase.xWinner;
            return gamePhase.xWinner;
        } else if (~check(tallyO).indexOf(15)) {
            this.phase = gamePhase.oWinner;
            return gamePhase.oWinner;
        } else {
            if (countX === 5) {
                this.phase = gamePhase.Draw;
                return gamePhase.Draw;
            } else {
                return gamePhase.Active;
            }
        }
    }
}