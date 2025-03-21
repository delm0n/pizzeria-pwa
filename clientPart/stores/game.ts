type State = {
    score: number;
    successCount: number;

}

export const useGameStore = defineStore('gameStore', {
    state: (): State => ({
        score: 0,
        successCount: 0,
    }),

    actions: {

    },

    getters: {

    }
})