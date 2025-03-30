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

        async updateRecord(record: number) {

            const storeClient = useClientStore();
            if (storeClient.client != null && storeClient.client.Record < record) {
                try {
                    const response = await fetch(
                        `http://localhost:1234/game-record/${storeClient.client.ClientId}-${record}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    storeClient.client.Record = record;

                } catch {
                    console.log("error orderStore");
                }
            }
        },
    },

    getters: {

    }
})