<template>
  <main class="flex col" style="gap: 1.6rem">
    <wc-xscroll style="height: 400px">
      <div class="flex">
        <div v-for="(img, index) in imgs" :key="index" class="flex center img-container">
          <img :src="img" alt="随机图片" style="width: 100%; height: 100%; object-fit: cover; object-position: center center" />
        </div>
      </div>
    </wc-xscroll>
    <div role="row" style="--gutter: 1.6rem; gap: 1.6rem 0">
      <div role="col" class="span-12 xs-24">
        <div role="carousel" :style="{ '--anchor-name': '--carousel-name-' + useId() }">
          <div v-for="(img, index) in imgs" :key="index" class="carousel-item">
            <figure>
              <img :src="img" alt="随机图片" />
              <figcaption>
                <h3>Slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <div role="col" class="span-12 xs-24">
        <wc-carousel>
          <div v-for="(img, index) in imgs" :key="index" class="carousel-item">
            <figure>
              <img :src="img" alt="随机图片" />
              <figcaption>
                <h3>Slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </figcaption>
            </figure>
          </div>
        </wc-carousel>
      </div>
      <div role="col" class="span-12 xs-24">
        <wc-carousel loop="false">
          <div v-for="(img, index) in imgs" :key="index" class="carousel-item">
            <img :src="img" alt="随机图片" />
          </div>
        </wc-carousel>
      </div>
    </div>
  </main>
</template>
<script setup>
import { useId } from 'vue'
let imgs = ['everything-you-need-to-work-from-your-bed.jpg', 'finances-us-dollars-and-bitcoins-currency-money-2.jpg', 'home-office-desk-with-macbook-iphone-calendar-watch-and-organizer.jpg', 'young-entrepreneur-working-from-a-modern-cafe.jpg', 'young-woman-working-in-a-cafe.jpg'].map((path) => new URL(`../../assets/img/carousel/${path}`, import.meta.url))
</script>
<style scoped lang="scss">
wc-xscroll > .flex {
  width: 100%;
  height: 100%;
  & > * {
    height: 100%;
    flex: 1 0 100%;
    color: var(--color);
  }
}
figure {
  margin: 0;
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80%;
    background: linear-gradient(0deg, rgba(31, 41, 55, 0.9), rgba(31, 41, 55, 0));
  }
  figcaption {
    position: absolute;
    bottom: 0;
    left: 15%;
    right: 15%;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    text-align: center;
    & > :not(p) {
      font-size: 1.6rem;
      margin: 0 0 0.8rem 0;
    }
    & > p {
      font-size: 1.4rem;
      margin: 0 0 1.6rem 0;
    }
  }
}
.carousel-item img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center center;
}
</style>
