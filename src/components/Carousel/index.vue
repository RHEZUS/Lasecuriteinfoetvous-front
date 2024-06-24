<template>
  <swiper
    :modules="modules"
    :slides-per-view="sliderPreview"
    :space-between="space"
    navigation
    :pagination="{ clickable: true }"
    class="main-caro"
  >
    <swiper-slide v-for="(item, i) in carousels" :key="i">
      <div
        class="single-slide bg-no-repeat bg-cover bg-center min-h-[300px]"
        :style="{
          backgroundImage: 'url(' + item.img + ')',
        }"
        :class="classes"
      >
        <div
          class="pt-20 container text-center px-4 slider-content h-full w-full min-h-[300px] rounded-md flex flex-col items-center justify-center text-white"
        >
          <div class="max-w-3xl">
            <h2 v-if="item.title" class="text-4xl font-medium text-white">
              {{ item.title }}
            </h2>
            <p v-if="item.description" class="text-xl mb-4">
              {{ item.description }}
            </p>
            <a 
              class="bg-blue-800 text-lg text-white py-2 px-3 capitalize hover:bg-[#1e40afb4]"
              :href="item.link" v-if="item.link">{{item.linkLabel ? item.linkLabel : 'Read More'}}</a>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script>
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

// Import Swiper styles
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    sliderPreview: {
      type: Number,
      default: 1,
    },
    space: {
      type: Number,
      default: 0,
    },

    carousels: {
      type: Array,
      default: [],
    },
    classes: {
      type: String,
      default: "",
    },
  },

  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade],
    };
  },
};
</script>

<style lang="scss">
.main-caro {
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-family: unset !important;
    @apply rtl:rotate-180;
  }
  .swiper-button-next:after {
    content: url("https://api.iconify.design/heroicons-outline/chevron-right.svg?color=white&width=24");
    margin-right: 64px;
  }
  .swiper-button-prev:after {
    content: url("https://api.iconify.design/heroicons-outline/chevron-left.svg?color=white&width=24");
    margin-left: 64px;
  }
  .swiper-pagination-bullet {
    height: 2px;
    width: 24px;
    @apply rounded-[1px] bg-white bg-opacity-70;
    &.swiper-pagination-bullet-active {
      @apply bg-opacity-100;
    }
  }
}
</style>
