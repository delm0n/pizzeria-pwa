<template>
  <div class="filter">
    <div class="caption" @click="setBody(!body)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="37"
        height="37"
        viewBox="0 0 37 37"
        fill="none"
      >
        <circle
          cx="18.5"
          cy="18.5"
          r="17.75"
          stroke="black"
          stroke-width="1.5"
        />
        <g clip-path="url(#clip0_25_6)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23.0938 10.625C22.8352 10.625 22.5792 10.6759 22.3403 10.7749C22.1015 10.8738 21.8844 11.0188 21.7016 11.2016C21.5188 11.3844 21.3738 11.6015 21.2749 11.8403C21.1759 12.0792 21.125 12.3352 21.125 12.5937C21.125 12.8523 21.1759 13.1083 21.2749 13.3472C21.3738 13.586 21.5188 13.803 21.7016 13.9859C21.8844 14.1687 22.1015 14.3137 22.3403 14.4126C22.5792 14.5116 22.8352 14.5625 23.0938 14.5625C23.6159 14.5625 24.1167 14.3551 24.4859 13.9859C24.8551 13.6166 25.0625 13.1159 25.0625 12.5937C25.0625 12.0716 24.8551 11.5708 24.4859 11.2016C24.1167 10.8324 23.6159 10.625 23.0938 10.625ZM19.8781 11.9375C20.0287 11.1957 20.4312 10.5289 21.0172 10.0499C21.6032 9.57087 22.3369 9.3092 23.0938 9.3092C23.8506 9.3092 24.5843 9.57087 25.1703 10.0499C25.7563 10.5289 26.1588 11.1957 26.3094 11.9375H29V13.25H26.3094C26.1588 13.9917 25.7563 14.6586 25.1703 15.1376C24.5843 15.6166 23.8506 15.8783 23.0938 15.8783C22.3369 15.8783 21.6032 15.6166 21.0172 15.1376C20.4312 14.6586 20.0287 13.9917 19.8781 13.25H8V11.9375H19.8781ZM13.9062 17.1875C13.3841 17.1875 12.8833 17.3949 12.5141 17.7641C12.1449 18.1333 11.9375 18.6341 11.9375 19.1562C11.9375 19.6784 12.1449 20.1791 12.5141 20.5484C12.8833 20.9176 13.3841 21.125 13.9062 21.125C14.4284 21.125 14.9292 20.9176 15.2984 20.5484C15.6676 20.1791 15.875 19.6784 15.875 19.1562C15.875 18.6341 15.6676 18.1333 15.2984 17.7641C14.9292 17.3949 14.4284 17.1875 13.9062 17.1875ZM10.6906 18.5C10.8412 17.7582 11.2437 17.0914 11.8297 16.6124C12.4157 16.1334 13.1494 15.8717 13.9062 15.8717C14.6631 15.8717 15.3968 16.1334 15.9828 16.6124C16.5688 17.0914 16.9713 17.7582 17.1219 18.5H29V19.8125H17.1219C16.9713 20.5542 16.5688 21.2211 15.9828 21.7001C15.3968 22.1791 14.6631 22.4408 13.9062 22.4408C13.1494 22.4408 12.4157 22.1791 11.8297 21.7001C11.2437 21.2211 10.8412 20.5542 10.6906 19.8125H8V18.5H10.6906ZM23.0938 23.75C22.5716 23.75 22.0708 23.9574 21.7016 24.3266C21.3324 24.6958 21.125 25.1966 21.125 25.7187C21.125 26.2409 21.3324 26.7416 21.7016 27.1109C22.0708 27.4801 22.5716 27.6875 23.0938 27.6875C23.6159 27.6875 24.1167 27.4801 24.4859 27.1109C24.8551 26.7416 25.0625 26.2409 25.0625 25.7187C25.0625 25.1966 24.8551 24.6958 24.4859 24.3266C24.1167 23.9574 23.6159 23.75 23.0938 23.75ZM19.8781 25.0625C20.0287 24.3207 20.4312 23.6539 21.0172 23.1749C21.6032 22.6959 22.3369 22.4342 23.0938 22.4342C23.8506 22.4342 24.5843 22.6959 25.1703 23.1749C25.7563 23.6539 26.1588 24.3207 26.3094 25.0625H29V26.375H26.3094C26.1588 27.1167 25.7563 27.7836 25.1703 28.2626C24.5843 28.7416 23.8506 29.0033 23.0938 29.0033C22.3369 29.0033 21.6032 28.7416 21.0172 28.2626C20.4312 27.7836 20.0287 27.1167 19.8781 26.375H8V25.0625H19.8781Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_25_6">
            <rect
              width="21"
              height="21"
              fill="white"
              transform="translate(8 8)"
            />
          </clipPath>
        </defs>
      </svg>

      <span v-show="!!storePizza.getFilterCount" class="caption-count">
        {{ storePizza.getFilterCount }}
      </span>
    </div>

    <div class="body" v-show="body">
      <div class="body-list">
        <div
          v-for="item in list"
          :key="item.key"
          class="body-list__item pizza-checkbox"
        >
          <label class="checkbox">
            <input
              type="checkbox"
              :checked="storePizza.filters[item.key]"
              @click="setValue(item.key)"
            />
            <div class="box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
              >
                <path
                  d="M1 7.56424L5.92308 12.4531L17 1.45312"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <span v-text="item.title"></span>
          </label>
        </div>
      </div>

      <div @click="storePizza.setFilterFalse" class="clear">
        Сбросить фильтр
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  mounted() {
    // Элемент, за которым мы следим
    const elem = document.querySelector(".filter")!;

    // Настраиваем обработку кликов
    document.addEventListener("click", (e) => {
      const target = e.target as Node;

      if (!elem.contains(target)) {
        this.setBody(false);
      }
    });
  },

  setup() {
    const storePizza = usePizzaStore();
    const list = ref([
      {
        title: "Без лука",
        key: PizzaType.NoOnion,
      },

      {
        title: "Острая",
        key: PizzaType.Spicy,
      },

      {
        title: "Без мяса",
        key: PizzaType.NoMeat,
      },

      {
        title: "С грибами",
        key: PizzaType.Mushroom,
      },
    ]);

    const setValue = (key: PizzaType) => {
      storePizza.filters[key] = !storePizza.filters[key];
    };

    const body = ref(false);
    const setBody = (val: boolean) => {
      body.value = val;
    };

    return {
      storePizza,
      list,
      setValue,
      body,
      setBody,
    };
  },
});
</script>

<style lang="scss">
.filter {
  position: relative;

  .caption {
    cursor: pointer;
    position: relative;
    svg {
      circle {
        stroke: var(--text-color);
      }

      path {
        fill: var(--text-color);
      }
    }

    &-count {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;
      text-align: center;

      background: var(--accent);
      color: rgb(252 252 253);

      width: 20px;
      height: 20px;
      font-size: 13px;
      font-weight: 500;
      border-radius: 100%;

      position: absolute;
      right: -3px;
      top: 0;
      transform: translateY(-55%);
    }
  }

  .body {
    background: var(--background-vs-opacity);
    transition: all 0.2s;
    position: absolute;
    right: 0;
    padding: 15px;
    z-index: 9;
    border-radius: 5px;
    box-shadow: 0 15px 15px -10px var(--shadow);
    width: 200px;
    top: calc(100% + 5px);

    &-list {
      &__item {
        &:not(:last-child) {
          margin-bottom: 10px;
        }

        span {
          font-size: 16px;
          color: var(--placeholder);
        }
      }
    }

    .clear {
      color: var(--accent);
      cursor: pointer;
      margin-top: 20px;
      font-weight: 500;
      text-align: center;
    }
  }
}
</style>
