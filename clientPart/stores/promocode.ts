type State = {
    promocode: IPromocode | null;
    promocodeFail: boolean;
    message: string
}

export const usePromocodeStore = defineStore('promocodeStore', {
    state: (): State => ({
        promocode: null,
        promocodeFail: false,
        message: ""
    }),

    actions: {
        setPromocode(id: number,
            value: string,
            price: number,
            discount?: number) {
            this.promocode = {
                Id: id,
                Value: value,
                Price: price,
                Discount: discount
            }
        },

        setPromocodeDefault() {
            this.promocode = null;
            this.promocodeFail = false;
            this.message = "";
        }
    },

    getters: {
        getValuePromocode(): string {
            return this.promocode !== null && !this.promocodeFail ? this.promocode.Value : ""
        }
    }
})