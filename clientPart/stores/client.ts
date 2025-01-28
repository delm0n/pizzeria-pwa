
type State = {
    client: IClient;

    badTryEnter: boolean;
    badPassword: boolean;
}

export const useClientStore = defineStore('clientStore', {
    state: (): State => ({

        badTryEnter: false,
        badPassword: false,
        client: {
            ClientId: 0,
            FirstName: "",
            Telephone: "+7",
            Email: "",
            Password: ""
        }
    }),

    getters: {
        isAutorization(): boolean {
            return this.client.ClientId !== 0
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
        }
    },

    actions: {
        autorizationClient(clientId: number, firstName: string,
            telephone: string, email: string, password: string) {
            this.client.ClientId = clientId;
            this.client.FirstName = firstName;
            this.client.Telephone = telephone;
            this.client.Email = email;
            this.client.Password = password;
        }
    }
})

