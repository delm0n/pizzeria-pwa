
type State = {
    client: IClient;
}

const clientDefault = {
    ClientId: null,
    FirstName: "",
    Telephone: "+7",
    Email: "",
    Password: "",
    PizzaOrderJson: "",
    Bonus: 0,

    Record: 0,
    CanPlay: false
} as IClient;

export const useClientStore = defineStore('clientStore', {
    state: (): State => ({
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
            return this.isEmptyTelephone
        },
    },

    actions: {
        autorizationClient(clientId: number, firstName: string,
            telephone: string, email: string, pizzaOrderJson: string, bonus: number, record: number, canPlay: boolean) {
            this.client.ClientId = clientId;
            this.client.FirstName = firstName;
            this.client.Telephone = telephone;
            this.client.Email = email;
            this.client.PizzaOrderJson = pizzaOrderJson;
            this.client.Bonus = bonus;
            this.client.Record = record;
            this.client.CanPlay = canPlay;

            const orderStore = useOrderStore();
            orderStore.orderName = firstName;
            orderStore.orderTelephone = telephone;

            const storeCheque = useChequeStore();
            storeCheque.loadData(clientId)

            const storeBonus = useBonusStore();
            storeBonus.setPromocodeDefault();

            setTimeout(() => {
                this.client.Password = "";
            }, 800);
        },

        setClientDefault() {
            this.client = clientDefault;
        }
    }
})

