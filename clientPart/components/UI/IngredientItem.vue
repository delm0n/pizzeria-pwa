<template>
  <div
    :class="[
      'ingredient-item',
      ingredient.Active ? 'ingredient-item--active' : '',
    ]"
    @click="storeIngredient.setIngredientsById(ingredient.IngredientId)"
  >
    <div
      :class="[
        'ingredient-icon',
        ingredient.Active ? 'ingredient-icon--active' : '',
      ]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="#000"
          fill-rule="evenodd"
          d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16m0 2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10"
          clip-rule="evenodd"
        ></path>
        <path
          fill="#000"
          fill-rule="evenodd"
          d="M16.602 7.864a1 1 0 0 1 .2 1.4l-4.576 6.101c-.061.082-.146.197-.23.29a1.35 1.35 0 0 1-.513.366c-.311.121-.656.121-.967 0a1.35 1.35 0 0 1-.513-.365c-.084-.094-.17-.209-.23-.29l-2.075-2.767a1 1 0 0 1 1.6-1.2l1.701 2.269 4.202-5.604a1 1 0 0 1 1.4-.2"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>

    <div class="ingredient-item__img">
      <NuxtPicture
        format="avif,webp"
        sizes="100px"
        :src="'/images/ingredients/' + ingredient.UrlImg + '.png'"
        :alt="ingredient.Name"
      />
    </div>

    <div class="ingredient-item__content">
      <div class="content-title">
        <h5 v-html="ingredient.Name"></h5>
        <p v-html="ingredient.Mass + ' г'"></p>
      </div>

      <div class="content-price">
        <p v-html="ingredient.Price + '  ₽'"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const storeIngredient = useIngredientStore();

const props = defineProps<{
  ingredient: IIngredient;
}>();
</script>
