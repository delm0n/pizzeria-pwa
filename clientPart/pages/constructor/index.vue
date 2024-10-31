<template>
  <main class="constructor-main">
    <nav-bar
      v-if="viewport.isGreaterOrEquals('tablet')"
      @updateActiveSection="updateActiveSection"
      :activeSection="activeSection"
      :navKey="$route.path"
      :links="links"
    />

    <div class="container">
      <div class="constructor-wrapper">
        <constructor-main
          :ingredients="storeConstructor.getIngredientByType"
          v-if="viewport.isGreaterOrEquals('tablet')"
          :links="links"
        />

        <constructor-main-mobile
          v-else
          :ingredients="storeConstructor.getIngredientByType"
          :links="links"
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
import NavBar from "~/components/UI/NavBar.vue";

import { ref } from "vue";

const storeConstructor = useConstructorStore();
const links: INavLink[] = [
  {
    id: "constructor-sauce",
    title: "Соус",
  },
  ...storeConstructor.getIngredientByType.map((item) => ({
    id: item.id,
    title: item.title,
  })),
];

const activeSection = ref(links[0].id);
const updateActiveSection = (id: string) => {
  activeSection.value = id;
};

const viewport = useViewport();
</script>

<style lang="scss">
.constructor-main {
  @media (max-width: 768px) {
    .container {
      padding: 0;
      margin: 0;
      width: 100%;
    }
  }
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
    top: 75px;
    height: 550px;
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
      top: 0px;
    }
  }
}
</style>
