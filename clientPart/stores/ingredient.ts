
type State = {
    ingredients: IIngredient[];
}

export const useIngredientStore = defineStore('ingredientStore', {
    state: (): State => ({
        ingredients: [],

    }),

    getters: {
        getActiveIndexArray(): number[] {
            return this.ingredients.filter(el => el.Active).map(el => el.IngredientId)
        },

        checkCount(): boolean {
            return this.ingredients.reduce(function (sum, ingredient) {
                return ingredient.Active ? sum + 1 : sum;
            }, 0) <= 8;
        },
    },

    actions: {
        async fetch() {
            try {
                const response: string = await $fetch('http://localhost:1234/ingredients');

                JSON.parse(response).forEach((element: any) => {

                    this.ingredients.push({
                        IngredientId: element.IngredientId,
                        Name: element.Name,
                        UrlImg: element.UrlImg,
                        Mass: element.Mass,
                        Price: element.Price,
                        Active: false,
                        Type: element.Type,
                    });
                });
            }
            catch {
                console.log('error ingredientStore');
            }

        },

        setIngredientsFalse() {
            this.ingredients.forEach((element) => {
                element.Active = false;
            });
        },

        setIngredientsById(id: number) {
            let element = this.ingredients.find(el => el.IngredientId == id);

            if (element) {
                if (element.Active) {
                    element.Active = !element.Active
                }
                else {
                    if (this.checkCount) {
                        element.Active = !element.Active
                    }
                }
            }

        },

        setIngredientsByIdArray(ids: number[]) {
            this.ingredients.forEach((element) => {
                ids.includes(element.IngredientId) ? element.Active = true : element.Active = false;
            });
        },


    },
})

