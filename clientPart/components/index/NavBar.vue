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
    const store = useDishStore();
    const viewport = useViewport();

    const links = [
      {
        id: "pizza",
        title: "Пиццы",
      },
      ...store.getDishByType,
    ];

    const scrollTo = (targetId: string) => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    return {
      links,
      scrollTo,
      viewport,
    };
  },

  data() {
    return {
      isFixed: false,
      activeSection: "pizza",
    };
  },

  methods: {
    handleScroll() {
      // console.log(this.$router.currentRoute.value.path);

      if (this.$router.currentRoute.value.path == "/") {
        this.isFixed = window.pageYOffset < 120 ? false : true;
        this.links.forEach((element) => {
          let hgt = document
            .getElementById(element.id)!
            .getBoundingClientRect().top;
          hgt <= window.innerHeight ? (this.activeSection = element.id) : "";
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

<style lang="scss">
nav {
  width: 100%;
  position: sticky;
  top: 0px;
  z-index: 10;
  background-color: var(--background-opacity);

  .container {
    position: relative;
  }

  &.fixed {
    box-shadow: var(--shadow) 0px 2px 15px -2px;
    backdrop-filter: blur(20px);
  }

  .nav-wrapper {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .link-box {
      display: flex;
      align-items: center;
      margin-right: 20px;

      @media (max-width: 768px) {
        overflow-x: auto;
        overflow-y: hidden;

        &::-webkit-scrollbar {
          height: 2px;
          background-color: var(--placeholder);
        }

        &::-webkit-scrollbar-track {
          background-color: var(--placeholder);
        }

        &::-webkit-scrollbar-thumb {
          background: var(--scrollbar-modal);
          cursor: pointer;
          z-index: 1;
        }
      }

      @media (max-width: 576px) {
        margin-right: 0;
      }

      li {
        cursor: pointer;
        display: block;
      }

      &__item {
        margin-right: 20px;
        font-weight: 500;
        transition: all 0.2s;

        &--active {
          color: var(--accent);

          &:hover {
            color: var(--accent-hover);
          }
        }

        @media (hover: hover) {
          &:hover {
            color: var(--accent);
          }
        }
      }

      .logo {
        color: var(--accent);
        font-size: 2em;
        font-weight: bold;
        overflow: hidden;
        width: 0;
        transition: all 0.2s;
        flex-shrink: 0;

        &.fixed {
          width: 55px;
        }
      }
    }
  }
}
</style>
