
type State = {
    dishes: IDish[];
}

type myDish = {
    title: string;
    id: string;
    type: DishType;
};

export const useDishStore = defineStore('dishStore', {
    state: (): State => ({
        dishes: [],
    }),

    actions: {
        async fetch() {
            try {
                const response: string = await $fetch('http://localhost:1234/dishes');
                const storeConstructor = useConstructorStore();

                JSON.parse(response).forEach((element: any) => {

                    this.dishes.push({
                        DishId: element.DishId,
                        Name: element.Name,
                        UrlImg: element.UrlImg,
                        Mass: element.Mass,
                        Price: element.Price,
                        DishType: element.DishType,
                        Structure: element.Structure,
                        Count: 0
                    });

                    if (element.DishType == DishType.Sauce) {
                        storeConstructor.sauceArray.push({
                            DishId: element.DishId,
                            Name: element.Name,
                            UrlImg: element.UrlImg,
                            Mass: element.Mass,
                            Price: element.Price,
                            DishType: element.DishType,
                            Structure: element.Structure,
                            Count: 0
                        })

                    }
                });

                if (!!storeConstructor.sauceArray) {
                    storeConstructor.setSauceById(storeConstructor.sauceArray[0].DishId)
                }

            }
            catch {
                console.log('error dishStore');
            }
        },

        setDishesById(id: number) {
            const dish = this.dishes.find(el => el.DishId == id);
            if (dish) {
                const storeNotification = useNotificationStore();
                dish.Count = 1
                storeNotification.addNotification("Добавлено", dish.Name);
            }
        },

        setDishCount(id: number, val: number) {
            const dish = this.dishes.find(el => el.DishId == id);
            if (dish) {
                dish.Count = val
            }
        },

        setDishDefault() {
            this.dishes.forEach(element => {
                element.Count = 0;
            });
        }
    },

    getters: {
        getDishByType(): myDish[] {
            return [
                {
                    title: "Закуски",
                    id: "snacks",
                    type: DishType.Snacks
                },

                {
                    title: "Соусы",
                    id: "sauce",
                    type: DishType.Sauce
                },

                {
                    title: "Кофе",
                    id: "coffee",
                    type: DishType.Coffee
                },

                {
                    title: "Десерты",
                    id: "desserts",
                    type: DishType.Desserts
                },

                {
                    title: "Напитки",
                    id: "drinks",
                    type: DishType.Drinks
                },
            ];
        },

        getUnit: () => {
            return (type: DishType) => {
                switch (type) {

                    case DishType.Drinks:
                        return ' мл'

                    case DishType.Coffee:
                        return ' мл'

                    default:
                        return ' г'
                }
            }
        },

        getDishesPrice(): number {
            return this.dishes.reduce(function (sum, item) {
                return item.Count > 0 ? sum + item.Price * item.Count : sum;
            }, 0)
        },

        getDishesJSON(): string {
            return JSON.stringify(this.dishes
                .filter((item) => item.Count > 0)
                .map((item) => ({
                    DishId: item.DishId,
                    Count: item.Count,
                })))
        },

        getDishById: (state) => (dishId: number): IDish => {
            const dish = state.dishes.find(el => el.DishId == dishId);
            if (!dish) {
                throw new Error(`${dishId} not found`);
            }
            return dish;
        },
    }
})

