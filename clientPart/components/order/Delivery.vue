<template>
  <section class="address-map">
    <h2>Доставка</h2>

    <div class="address-map__container">
      <div id="my-map"></div>
    </div>

    <div class="address-map__box">
      <div class="input-row address-map__input">
        <label class="pizza-input" :style="'position: relative;'">
          <span>Адрес:</span>
          <div class="input-container">
            <input
              name="locality"
              type="text"
              v-model="storeOrder.orderAddress.locality"
              autocomplete="off"
            />
          </div>

          <div v-show="errorMap" class="pizza-error">
            <span>Точка не найдена</span>
          </div>
        </label>

        <label class="pizza-input">
          <span>Улица:</span>
          <div class="input-container">
            <input
              name="street"
              type="text"
              v-model="storeOrder.orderAddress.street"
              autocomplete="off"
            />
          </div>
        </label>
      </div>

      <div class="input-row address-map__input input-row-nowrap">
        <label class="pizza-input">
          <span>Дом:</span>
          <div class="input-container">
            <input
              name="house"
              type="text"
              v-model="storeOrder.orderAddress.house"
              autocomplete="off"
            />
          </div>
        </label>

        <label class="pizza-input">
          <span>Квартира:</span>
          <div class="input-container">
            <input
              name="flat"
              type="text"
              v-model="storeOrder.orderAddress.flat"
              @input="onInputFlat"
              autocomplete="off"
              maxlength="4"
            />
          </div>
        </label>

        <label class="pizza-input">
          <span>Этаж:</span>
          <div class="input-container">
            <input
              name="floor"
              type="text"
              v-model="storeOrder.orderAddress.floor"
              @input="onInputFloor"
              autocomplete="off"
              maxlength="3"
            />
          </div>
        </label>
      </div>
    </div>

    <button
      :disabled="loading"
      @click="setAddress"
      class="button map-button loading"
    >
      Поиск
    </button>

    <label class="pizza-input">
      <span> Комментарий курьеру:</span>
      <div class="input-container">
        <textarea
          v-model="storeOrder.orderComment"
          name="address"
          type="text"
          autocomplete="off"
          rows="3"
          maxlength="400"
        />
      </div>
    </label>
  </section>
</template>

<script lang="ts" setup>
const storeOrder = useOrderStore();

const token = "e6ddd505-3fdb-4820-ac43-6f27c0ebfb31";
const loading = ref(false);
const errorMap = ref(false);
let myPlacemark: any;

const onInputFlat = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  const numericValue = value.replace(/[^0-9]/g, "");
  storeOrder.orderAddress.flat = numericValue;
};

const onInputFloor = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  const numericValue = value.replace(/[^0-9]/g, "");
  storeOrder.orderAddress.floor = numericValue;
};

async function getMap() {
  try {
    loading.value = true;
    let script = document.createElement("script");
    script.setAttribute("async", "");
    script.type = "text/javascript";
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU`;
    document.querySelector("body")!.appendChild(script);

    script.onload = function () {
      //@ts-ignore
      ymaps.ready(function () {
        //@ts-ignore
        let myMap = new ymaps.Map("my-map", {
          center: [58.603562, 49.668],
          zoom: 14,
          controls: ["zoomControl"],
        });

        myMap.cursors.push("pointer");

        myMap.events.add("click", function (e: any) {
          const coords = e.get("coords");
          getAddress(coords);

          if (!!myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
            console.log(coords);
          } else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
          }
        });
      });
    };
  } catch {
    mapError();
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 400);
  }
}

async function getAddress(coords: any) {
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${token}&geocode=${coords[1]},${coords[0]}&format=json`;

  try {
    loading.value = true;
    const response = await fetch(url);
    const data = await response.json();

    if (data.response.GeoObjectCollection.featureMember.length > 0) {
      const address =
        data.response.GeoObjectCollection.featureMember[0].GeoObject
          .metaDataProperty.GeocoderMetaData.Address;

      address.Components.forEach((item: any) => {
        if (item.kind === "locality") {
          storeOrder.orderAddress.locality = item.name;
        } else if (item.kind === "street") {
          storeOrder.orderAddress.street = item.name;
        } else if (item.kind === "house") {
          storeOrder.orderAddress.house = item.name;
        }
      });
    } else {
      mapError();
    }
  } catch (error) {
    mapError();
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 400);
  }
}

async function setAddress(coords: any) {
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${token}&geocode=${encodeURIComponent(
    `${storeOrder.orderAddress.locality}, ${storeOrder.orderAddress.street}, ${storeOrder.orderAddress.house}`
  )}&format=json`;

  try {
    loading.value = true;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    if (data.response.GeoObjectCollection.featureMember.length > 0) {
      const coords =
        data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          .split(" ")
          .map(Number);
      myPlacemark.geometry.setCoordinates([coords[1], coords[0]]);
    } else {
      mapError();
    }
  } catch (error) {
    mapError();
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 400);
  }
}

function createPlacemark(coords: any) {
  //@ts-ignore
  return new ymaps.Placemark(
    coords,
    {},
    {
      iconLayout: "default#image",
      iconImageHref:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAzOCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMxLjc3MjIgNS4yMTQzQzI4LjI1NjkgMS43MzgwNiAyMy45OTk2IDAgMTkuMDAwMSAwQzE0LjAwMDYgMCA5Ljc0MzIzIDEuNzM4MDYgNi4yMjc5NyA1LjIxNDNDMi43MTI3MSA4LjY5MDU1IDAuOTU1MDc4IDEyLjg4OTMgMC45NTUwNzggMTcuODEwN0MwLjk1NTA3OCAyMC43NzkxIDIuNDU4NzkgMjUuNzM5NiA1LjQ2NjMzIDMyLjY5MTlDOC40NzM4NyAzOS42NDQ0IDExLjQ4MTMgNDUuOTcxOSAxNC40ODg4IDUxLjY3NDNDMTcuNDk2NCA1Ny4zNzY4IDE5LjAwMDEgNjAuMTUwMSAxOS4wMDAxIDU5Ljk5MzhDMTkuNDY4OCA1OS4xMzQ0IDIwLjExMzMgNTcuOTYyNyAyMC45MzM1IDU2LjQ3ODVDMjEuNzUzNyA1NC45OTQ0IDIzLjE5ODggNTIuMjAxNiAyNS4yNjkgNDguMTAwNUMyNy4zMzkxIDQzLjk5OTQgMjkuMTU1MyA0MC4yMzAzIDMwLjcxNzYgMzYuNzkzMUMzMi4yOCAzMy4zNTYxIDMzLjcyNTIgMjkuODAxNiAzNS4wNTMxIDI2LjEzMDFDMzYuMzgxMSAyMi40NTg3IDM3LjA0NTEgMTkuNjg1NSAzNy4wNDUxIDE3LjgxMDdDMzcuMDQ1MSAxMi44ODkzIDM1LjI4NzUgOC42OTA1NSAzMS43NzIyIDUuMjE0M1pNMjIuODY2OSAyMS41NjAzQzIxLjc3MzMgMjIuNjUzOSAyMC40NjQ4IDIzLjIwMDcgMTguOTQxNSAyMy4yMDA3QzE3LjQxODIgMjMuMjAwNyAxNi4xMDk3IDIyLjY1MzkgMTUuMDE2MSAyMS41NjAzQzEzLjkyMjUgMjAuNDY2NyAxMy4zNzU3IDE5LjE1ODIgMTMuMzc1NyAxNy42MzQ5QzEzLjM3NTcgMTYuMTExNiAxMy45MjI1IDE0LjgyMjcgMTUuMDE2MSAxMy43NjgxQzE2LjEwOTcgMTIuNzEzNSAxNy40MTgyIDEyLjE4NjIgMTguOTQxNSAxMi4xODYyQzIwLjQ2NDggMTIuMTg2MiAyMS43NzMzIDEyLjcxMzUgMjIuODY2OSAxMy43NjgxQzIzLjk2MDUgMTQuODIyNyAyNC41MDczIDE2LjExMTYgMjQuNTA3MyAxNy42MzQ5QzI0LjUwNzMgMTkuMTU4MiAyMy45NjA1IDIwLjQ2NjcgMjIuODY2OSAyMS41NjAzWiIgZmlsbD0iI0Y0NTc2RCIvPgo8L3N2Zz4K",
      draggable: true,
    }
  );
}

const mapError = () => {
  errorMap.value = true;
  setTimeout(() => {
    errorMap.value = false;
  }, 5000);
};

onMounted(() => {
  getMap();
});
</script>

<style lang="scss">
.address-map {
  margin-top: 50px;

  @media (max-width: 576px) {
    margin-top: 30px;
  }

  &__container {
    background: var(--background-secondary);
    max-width: 100%;
    width: 100%;
    height: 55vh;
    max-height: 405px;
    overflow: hidden;

    #my-map {
      width: 100%;
      height: 100%;
    }
  }

  &__box {
    margin: 40px 0 10px;
  }

  &__input {
    &.input-row-nowrap {
      @media (max-width: 1200px) {
        flex-direction: row !important;
        gap: 20px;
        margin-top: 20px;
      }

      @media (max-width: 768px) {
        gap: 10px;
      }

      @media (max-width: 576px) {
        gap: 10px;
        margin-top: 10px;
      }
    }
  }

  .map-button {
    max-width: 180px;
    height: 48px;
    margin-bottom: 30px;

    @media (max-width: 576px) {
      max-width: 140px;
      height: 41px;
    }
  }
}
</style>
