<script setup lang="ts">
import CartIcon from "~/components/UI/CartIcon.vue";

const MainSection = ref<null | any>(null);
MainSection.value = defineAsyncComponent({
  loader: () => import("~/components/cheque/Main.vue"),
  delay: 500,
  timeout: 3000,
});

const storeCheque = useChequeStore();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const cheque = computed(() => {
  return storeCheque.getOrderById(id);
});

onMounted(() => {
  if (cheque.value == null) {
    router.push("/");
  }
});

watch(
  () => route.path,
  () => {
    if (cheque.value == null) {
      router.push("/");
    }
  }
);
</script>

<template>
  <main>
    <div class="container-small">
      <component
        v-if="MainSection && cheque !== null"
        :is="MainSection"
        :cheque="cheque"
      />
    </div>

    <cart-icon />
  </main>
</template>

<style lang="scss">
.cheque {
  position: relative;
  margin-bottom: 50px;

  .container-small {
    max-width: 580px;
  }

  span {
    display: block;
  }

  h2 {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 0;
    span {
      display: inline;
      //   color: var(--accent);
    }

    @media (max-width: 576px) {
      font-size: 22px;
    }
  }

  .cheque-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px 20px;
    margin-bottom: 10px;
  }

  .cheque-date {
    color: var(--text-description);
  }

  .cheque-price {
    font-weight: 700;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .accent-box {
    color: var(--accent);
    font-weight: 500;
  }

  .cheque-box {
    padding: 10px 0;
    border-bottom: 1px solid var(--placeholder);
    border-top: 1px solid var(--placeholder);
    margin-top: 14px;
  }

  .cheque-content {
    margin-top: 15px;

    &__item {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }

    .content-name,
    ul li,
    .content-count {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2px;

      span {
        &:last-child {
          flex-shrink: 0;
          margin-left: 10px;
        }
      }
    }

    ul {
      padding-left: 20px;
    }

    .content-count {
      font-weight: 500;
    }
  }

  .button-container {
    margin-top: 20px;

    button {
      width: max-content;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }

  .cheque-cancel {
    margin-bottom: 20px;
    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .p-button {
      text-align: right;
      font-weight: 600;
      font-size: 16px;
      color: var(--button-text);
      cursor: pointer;
    }

    p {
      font-weight: 500;
      font-size: 16px;
    }
  }
}
</style>
