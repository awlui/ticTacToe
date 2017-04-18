export interface IplayerService {
    name: string;
    isHuman: boolean;
    score: number;
    id: number;
    currentlyPlaying: boolean;
    makeMove(): number;
}

export interface IboardService {
    boardGameState: number[];
    player1: IplayerService;
    player2: IplayerService;
    phase: gamePhase;
    currentPlayers: IplayerService[];

}

export interface Icomponent {
    el: HTMLElement;
}

export enum gamePhase {
    gameInactive = 1,
    gameActive,
    xTurn,
    oTurn,
    outcome
}

export enum player {
    X = 1,
    O = 2
}