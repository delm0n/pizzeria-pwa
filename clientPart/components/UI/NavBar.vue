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
          <NuxtLink to="/cart" class="main-button">Корзина</NuxtLink>
          <nav-bar-notification />
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import NavBarNotification from "./NavBarNotification.vue";

export default defineNuxtComponent({
  setup() {
    const viewport = useViewport();
    const scrollTo = (targetId: string) => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    return {
      scrollTo,
      viewport,
    };
  },

  data() {
    return {
      isFixed: false,
    };
  },

  props: {
    links: { type: Array<INavLink>, required: true },
    activeSection: { type: String, required: true },
    navKey: { type: String, required: true },
  },

  watch: {
    activeSection(newValue: string, oldValue: string) {
      let box = document.querySelector(".link-box") as HTMLElement;

      //вызывается только если у элемента есть скролл
      if (box.scrollWidth > box.clientWidth) {
        let active = document.querySelector(
          ".link-box__item--active"
        ) as HTMLElement;

        let indexNew = this.links.findIndex((el) => el.id == newValue);
        let indexOld = this.links.findIndex((el) => el.id == oldValue);

        let scroll =
          indexNew > indexOld
            ? active.offsetLeft
            : active.getBoundingClientRect().left - 20;

        box.scrollTo({
          left: indexNew == 0 ? 0 : scroll,
          behavior: "smooth",
        });
      }
    },
  },

  methods: {
    handleScroll() {
      if (this.$router.currentRoute.value.path == this.navKey) {
        this.isFixed = window.pageYOffset < 120 ? false : true;
        this.links.forEach((element) => {
          let hgt =
            document.getElementById(element.id)!.getBoundingClientRect().top +
            window.innerHeight / 2;

          if (hgt <= window.innerHeight) {
            this.$emit("updateActiveSection", element.id);
          }
        });
      }
    },
  },

  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  components: {
    NavBarNotification,
  },
});
</script>
