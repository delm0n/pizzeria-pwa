<template>
  <main class="constructor-main">
    <div class="container">
      <div class="constructor-wrapper">
        <constructor-main
          :ingredients="storeConstructor.getIngredientByType"
          v-if="viewport.isGreaterOrEquals('tablet')"
        />

        <constructor-main-mobile
          v-else
          :ingredients="storeConstructor.getIngredientByType"
          :titles="titles"
        />

        <div class="constructor-wrapper__result">
          <constructor-result />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import ConstructorMainMobile from "~/components/constructor/ConstructorMainMobile.vue";
import ConstructorMain from "~/components/constructor/ConstructorMain.vue";
import ConstructorResult from "~/components/constructor/ConstructorResult.vue";

const storeConstructor = useConstructorStore();

const titles = [
  "Соус (основа)",
  ...storeConstructor.getIngredientByType.map((item) => item.title),
];

const viewport = useViewport();
</script>

<style lang="scss">
.constructor-main {
  // @media (max-width: 768px) {
  //   .container {

  //   }
  // }
}

.constructor-wrapper {
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }

  &__result {
    position: sticky;
    height: 500px;
    min-width: 370px;
    top: 40px;
    max-width: 500px;
    width: 100%;

    @media (max-width: 1280px) {
      max-width: 400px;
      min-width: 340px;
    }

    @media (max-width: 768px) {
      max-width: 100%;
      min-width: auto;
      height: auto;
      position: relative;
    }
  }
}
</style>
