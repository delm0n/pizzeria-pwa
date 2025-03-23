type State = {
    promocode: IPromocode | null;
    promocodeFail: boolean;
    message: string;
    gameKey: number;
    bonus: boolean;
}

export const useBonusStore = defineStore('bonusStore', {
    state: (): State => ({
        promocode: null,
        promocodeFail: false,
        message: "",
        gameKey: Date.now(),
        bonus: false // по умолчанию копим [0]
        //bonus: true списываем [1]

    }),

    actions: {
        setPromocode(id: number,
            value: string,
            price: number,
            discount: number) {
            this.promocode = {
                PromocodeId: id,
                Value: value,
                Price: price,
                Discount: discount
            }
            this.bonus = false;

        },

        setPromocodeDefault() {
            this.promocode = null;
            this.promocodeFail = false;
            this.message = "";
        },

        setBonus(index: number) {
            if (index === 0) { // копим баллы
                this.bonus = false;
            }
            else {
                if (index === 1) { // списываем баллы
                    this.bonus = true;
                    this.setPromocodeDefault();
                }
            }
        }
    },

    getters: {
        getValuePromocode(): number | null {
            return this.promocode !== null ? this.promocode.PromocodeId : null
        },

        getValueBonus(): number {
            const storeCart = useCartStore();
            const storeClient = useClientStore();

            if (this.promocode == null && storeClient.isAutorization) {
                if (this.bonus) { // изменение бонусного баланса
                    let price = storeCart.getAllPrice;
                    if (price >= storeClient.client.Bonus) {
                        return -storeClient.client.Bonus;
                    }
                    else {
                        return -price;
                    }
                }

                else { // просто + 5% от суммы заказа
                    return Math.round(storeCart.getAllPrice * 0.05)
                }
            }

            return 0
        },
    }
})