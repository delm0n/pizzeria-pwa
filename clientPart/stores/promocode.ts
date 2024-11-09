type State = {
    promocode: IPromocode | null;
    promocodeFail: boolean;
}

export const usePromocodeStore = defineStore('promocodeStore', {
    state: (): State => ({
        promocode: null,
        promocodeFail: false
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
        }
    }
})