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
        <component
          v-if="ConstructorMain"
          :is="ConstructorMain"
          :ingredients="storeConstructor.getIngredientByType"
          :links="links"
        />
        <div class="constructor-wrapper__result">
          <component v-if="ConstructorResult" :is="ConstructorResult" />
        </div>
      </div>
    </div>
    <cart-icon />
  </main>
</template>

<script setup lang="ts">
import NavBar from "~/components/UI/NavBar.vue";
import CartIcon from "~/components/UI/CartIcon.vue";
import { ref, defineAsyncComponent } from "vue";

const viewport = useViewport();
const storeConstructor = useConstructorStore();

const ConstructorResult = ref<null | any>(null);
ConstructorResult.value = defineAsyncComponent({
  loader: () => import("~/components/constructor/ConstructorResult.vue"),
  delay: 500,
  timeout: 3000,
});

const ConstructorMain = ref<null | any>(null);
if (viewport.isGreaterOrEquals("tablet")) {
  ConstructorMain.value = defineAsyncComponent({
    loader: () => import("~/components/constructor/ConstructorMain.vue"),
    delay: 500,
    timeout: 3000,
  });
} else {
  ConstructorMain.value = defineAsyncComponent({
    loader: () => import("~/components/constructor/ConstructorMainMobile.vue"),
    delay: 500,
    timeout: 3000,
  });
}

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
</script>

<style lang="scss">
.constructor-main {
  margin-bottom: 100px;
  @media (max-width: 768px) {
    margin-bottom: 50px;
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
