
type State = {
    client: IClient;

    badTryEnter: boolean;
    badPassword: boolean;
}

const clientDefault = {
    ClientId: null,
    FirstName: "",
    Telephone: "+7",
    Email: "",
    Password: "",
    PizzaOrderJson: "",
    Bonus: 0
} as IClient;

export const useClientStore = defineStore('clientStore', {
    state: (): State => ({

        badTryEnter: false,
        badPassword: false,
        client: clientDefault,
    }),

    getters: {
        isAutorization(): boolean {
            return this.client.ClientId !== null;
        },

        isEmptyName(): boolean {
            return this.client.FirstName.length < 3
        },

        isEmptyPassword(): boolean {
            return this.client.Password.length < 1
        },

        isEmptyTelephone(): boolean {
            return this.client.Telephone.length < 18
        },

        invalidClient(): boolean {
            return this.isEmptyPassword || this.isEmptyTelephone
        },

        // isBonuses(): boolean {
        //     const storeBonus = useBonusStore();
        //     return this.isAutorization && storeBonus.promocode !== null;
        // },
    },

    actions: {
        autorizationClient(clientId: number, firstName: string,
            telephone: string, email: string, password: string, pizzaOrderJson: string, bonus: number) {
            this.client.ClientId = clientId;
            this.client.FirstName = firstName;
            this.client.Telephone = telephone;
            this.client.Email = email;
            this.client.Password = password;
            this.client.PizzaOrderJson = pizzaOrderJson;
            this.client.Bonus = bonus;

            const orderStore = useOrderStore();
            orderStore.orderName = firstName;
            orderStore.orderTelephone = telephone;

            const storeBonus = useBonusStore();
            storeBonus.setPromocodeDefault();
        },

        setClientDefault() {
            this.client = clientDefault;
        }
    }
})

