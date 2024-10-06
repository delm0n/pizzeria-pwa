<template>
  <div class="ingredients-wrapper">
    <div
      v-for="ingredient in storeIngredient.ingredients"
      :key="ingredient.IngredientId"
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
        <nuxt-picture
          format="avif,webp"
          :src="'/images/ingredients/' + ingredient.UrlImg + '.png'"
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
  </div>
</template>

<script lang="ts" setup>
const storeIngredient = useIngredientStore();
</script>

<style lang="scss">
.ingredients-wrapper {
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 2px;
  grid-template-rows: 1fr;
  display: grid;
  gap: 10px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) and (min-width: 577px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 376px) {
    grid-template-columns: repeat(2, 1fr);
  }

  .ingredient-item {
    cursor: pointer;
    outline: 2px solid var(--placeholder);
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    transition: all 0.15s;
    position: relative;
    background: var(--background);

    .ingredient-icon {
      opacity: 0;
      transition: all 0.15s;
      position: absolute;
      top: 4px;
      right: 4px;

      path {
        fill: var(--accent);
      }

      &--active {
        opacity: 1;
      }
    }

    &--active {
      outline: 3px solid var(--accent);
      transform: scale(0.97);
    }

    &__img {
      aspect-ratio: 1/1;
      width: 100%;
      max-width: 56px;
      margin: 0 auto 5px;

      picture {
        justify-content: center;
      }

      @media (max-width: 992px) and (min-width: 767px) {
        max-width: 66px;
      }

      @media (max-width: 376px) {
        max-width: 76px;
      }
    }

    &__content {
      flex-grow: 1;
      display: flex;
      align-items: center;
      flex-direction: column;

      .content-title {
        h5,
        p {
          text-align: center;
          font-weight: 300;
        }

        h5 {
          font-size: 12px;
        }

        p {
          font-size: 14px;
          white-space: nowrap;
        }
      }

      .content-price {
        flex-grow: 1;
        display: flex;
        align-items: flex-end;
        font-weight: 600;
        font-size: 16px;
        margin-top: 10px;
      }
    }
  }
}
</style>
