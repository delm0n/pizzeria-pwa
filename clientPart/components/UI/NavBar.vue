<template>
  <nav :class="isFixed ? 'fixed' : ''">
    <div class="container">
      <div class="nav-wrapper">
        <ul class="link-box">
          <li
            :class="['logo', isFixed ? 'fixed' : '']"
            @click="scrollTo('header')"
          >
            Pi
          </li>

          <li
            v-for="(item, index) in links"
            :key="index"
            @click="scrollTo(item.id)"
            :class="[
              'link-box__item',
              activeSection == item.id ? 'link-box__item--active' : '',
            ]"
          >
            {{ item.title }}
          </li>
        </ul>

        <div v-if="viewport.isGreaterOrEquals('mobileWide')" class="cart-box">
          <sort-addish />
          <cart-hover :cartCount="cartCount" />
          <nav-bar-notification />
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import CartHover from "~/components/UI/CartHover.vue";
import NavBarNotification from "./NavBarNotification.vue";
import SortAddish from "./SortAddish.vue";

import { useRoute } from "vue-router";
import {
  watch,
  ref,
  onBeforeMount,
  onMounted,
  defineEmits,
  computed,
} from "vue";

const cartStore = useCartStore();
const route = useRoute();
const viewport = useViewport();
const emit = defineEmits();

const isFixed = ref(false);
const lastActiveSection = ref("");

const cartCount = computed(() =>
  !!cartStore.getAllCount ? " | " + cartStore.getAllCount : ""
);

const props = defineProps<{
  links: Array<INavLink>;
  activeSection: string;
  navKey: string;
}>();

const scrollTo = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const handleScroll = () => {
  if (route.path == props.navKey) {
    const nav = document.querySelector("nav");
    if (!!nav) {
      isFixed.value = nav.getBoundingClientRect().top == 0 ? true : false;
    }

    props.links.forEach((element, index) => {
      if (!!document.getElementById(element.id)) {
        let hgt =
          document.getElementById(element.id)!.getBoundingClientRect().top +
          window.innerHeight / 2;

        if (hgt <= window.innerHeight) {
          lastActiveSection.value = element.id;
        }
      }
    });

    if (props.activeSection !== lastActiveSection.value) {
      emit("updateActiveSection", lastActiveSection.value);
    }
  }
};

onBeforeMount(() => {
  window.addEventListener("scroll", handleScroll);
});

onMounted(() => {
  handleScroll();
  lastActiveSection.value = props.activeSection;
});

// Горизонтальная прокрутка на мобильных устройствах
watch(
  () => props.activeSection,
  (newValue: string, oldValue: string) => {
    const box = document.querySelector(".link-box") as HTMLElement;

    if (!!box) {
      // вызывается только если у элемента есть скролл
      if (box.scrollWidth > box.clientWidth) {
        const active = document.querySelector(
          ".link-box__item--active"
        ) as HTMLElement;

        if (!!active) {
          const indexNew = props.links.findIndex((el) => el.id == newValue);
          const indexOld = props.links.findIndex((el) => el.id == oldValue);

          const scroll =
            indexNew > indexOld
              ? active.offsetLeft
              : active.getBoundingClientRect().left - 20;

          box.scrollTo({
            left: indexNew === 0 ? 0 : scroll,
            behavior: "smooth",
          });
        }
      }
    }
  }
);

watch(
  () => route.path,
  () => {
    isFixed.value = false;
  }
);
</script>
