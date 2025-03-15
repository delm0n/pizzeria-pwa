<template>
  <main class="index-main">
    <banner />
    <nav-bar
      @updateActiveSection="updateActiveSection"
      :activeSection="activeSection"
      :navKey="$route.path"
      :links="links"
    />

    <pizza-section class="sp" />
    <dish-section
      v-for="(item, index) in storeDish.getDishByType"
      :key="index"
      :dishes="storeDish.dishes.filter((el) => el.DishType == item.type)"
      :id="item.id"
      :title="item.title"
      class="sp"
    />

    <cart-icon v-if="!viewport.isGreaterOrEquals('mobileWide')" />
  </main>
</template>

<script setup lang="ts">
import PizzaSection from "~/components/index/PizzaSection.vue";
import DishSection from "~/components/index/DishSection.vue";
import Banner from "~/components/index/Banner.vue";
import NavBar from "~/components/UI/NavBar.vue";
import CartIcon from "~/components/UI/CartIcon.vue";

import { ref } from "vue";
const viewport = useViewport();

const storeDish = useDishStore();
const links: INavLink[] = [
  {
    id: "pizza",
    title: "Пиццы",
  },
  ...storeDish.getDishByType,
];

const activeSection = ref(links[0].id);
const updateActiveSection = (id: string) => {
  activeSection.value = id;
};
</script>

<style lang="scss">
.index-main {
  position: relative;
  margin-bottom: 50px;

  section.sp {
    padding-top: 120px;

    @media (max-width: 992px) {
      padding-top: 80px;
    }

    @media (max-width: 576px) {
      padding-top: 50px;

      h2 {
        margin-bottom: 0;
      }
    }
  }
}
</style>
