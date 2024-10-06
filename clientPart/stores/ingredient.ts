
type State = {
    ingredients: IIngredient[]
}

export const useIngredientStore = defineStore('ingredientStore', {
    state: (): State => ({
        ingredients: [],
    }),

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
                        Active: false
                    });
                });

            }
            catch {
                console.log('error');
            }
        },

        setIngredientsFalse() {
            this.ingredients.forEach((element) => {
                element.Active = false;
            });
        },

        setIngredientsById(id: number) {
            this.ingredients.forEach((element) => {
                element.IngredientId == id ? (element.Active = !element.Active) : "";
            });
        },

        setIngredientsByIdArray(ids: number[]) {
            this.ingredients.forEach((element) => {
                ids.includes(element.IngredientId) ? element.Active = true : element.Active = false;
            });
        }
    }
})

