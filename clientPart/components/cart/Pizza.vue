<template>
  <section class="addish-cart">
    <transition-group name="expand" @after-enter="afterEnter" @leave="leave">
      <div
        v-for="(cart, index) in storeCart.pizzas"
        :key="index"
        class="addish-cart__container"
      >
        <article class="container-small addish-item">
          <button
            aria-label="Удалить"
            @click="storeCart.removePizzaCart(index)"
            class="remove-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000"
                d="M17.3 5.3a1 1 0 1 1 1.4 1.4L13.42 12l5.3 5.3a1 1 0 1 1-1.42 1.4L12 13.42l-5.3 5.3a1 1 0 0 1-1.4-1.42l5.28-5.3-5.3-5.3A1 1 0 0 1 6.7 5.3l5.3 5.28 5.3-5.3Z"
              ></path>
            </svg>
          </button>

          <div class="addish-item__img">
            <NuxtPicture
              format="avif,webp"
              sizes="90px"
              :src="
                '/images/pizzas/' +
                storePizza.getPizza(cart.PizzaId).UrlImg +
                '.png'
              "
            />
          </div>

          <div class="addish-item__content">
            <p
              class="content-name"
              v-html="storePizza.getPizza(cart.PizzaId).PizzaName"
            ></p>

            <p
              class="content-description"
              v-html="
                storePizza.getPizzaSizeDescription(
                  cart.PizzaId,
                  cart.PizzaSizeId,
                  cart.IngredientsId
                )
              "
            ></p>

            <p class="content-ingredient" v-show="!!cart.IngredientsId.length">
              +
              <span
                v-for="(ingredient, idx) in storeCart.getPizzaIngredients(
                  cart.IngredientsId
                )"
                :key="ingredient.IngredientId"
              >
                {{ ingredient.Name.toLowerCase()
                }}<template
                  v-if="
                    idx !=
                    storeCart.getPizzaIngredients(cart.IngredientsId).length - 1
                  "
                  >,
                </template>
              </span>
            </p>
          </div>

          <div class="addish-item__bottom">
            <b class="price">
              {{ storeCart.getPizzaPrice(cart) }}
              ₽
            </b>

            <div class="bottom-controller">
              <p @click="storeModal.setModalCart(cart, index)" class="edit">
                Изменить
              </p>
              <count-calculate
                :count="cart.Count"
                @increment="(i: number) => storeCart.setPizzaCount(cart, i)"
                @decrement="(i: number) => storeCart.setPizzaCount(cart, i)"
                @remove="storeCart.removePizzaCart(index)"
              />
            </div>
          </div>
        </article>
      </div>
    </transition-group>
  </section>
</template>

<script setup lang="ts">
import CountCalculate from "../UI/CountCalculate.vue";
import { afterEnter, leave } from "@/utils/animationCart";

const storeCart = useCartStore();
const storeModal = useModalStore();
const storePizza = usePizzaStore();
</script>
