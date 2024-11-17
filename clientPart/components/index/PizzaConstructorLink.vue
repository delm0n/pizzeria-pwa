<template>
  <NuxtLink
    @click="storeIngredient.setIngredientsFalse()"
    to="/constructor"
    class="addish-item"
  >
    <div class="addish-item__img">
      <NuxtPicture
        format="avif,webp"
        sizes="xl:330px lg:300px md:290px sm:250px xs: 200px"
        :src="'/images/constructor/constructor.png'"
        alt="Собрать пиццу"
      />
    </div>

    <div class="addish-item__content">
      <div class="content-title">
        <h3>Конструктор пиццы</h3>
      </div>

      <div class="content-structure">
        <p>
          Создайте свой рецепт большой или средней пиццы. Вы можете добавить
          любые ингредиенты в пиццу и мы её приготовим!
        </p>
      </div>

      <div class="content-bottom">
        <template v-if="viewport.isGreaterOrEquals('mobileMedium')">
          <p class="price">от {{ storeConstructor.getMinPrice }} ₽</p>
          <button class="main-button">Создать</button>
        </template>
        <template v-else>
          <button class="main-button">
            от {{ storeConstructor.getMinPrice }} ₽
          </button>
        </template>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const storeIngredient = useIngredientStore();
const viewport = useViewport();
const storeConstructor = useConstructorStore();
</script>
