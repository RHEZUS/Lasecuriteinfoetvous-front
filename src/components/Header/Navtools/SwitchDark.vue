<template>
  <span
    @click="toogleDark"
    class="h-[28px] w-[28px] lg:h-[32px] lg:w-[32px] lg:bg-slate-100 lg:dark:bg-slate-900 dark:text-white text-slate-900 cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center"
  >
    <Icon
      icon="heroicons-outline:moon"
      v-if="!this.$store.themeSettingsStore.isDark"
    />
    <Icon
      icon="heroicons-outline:sun"
      v-else-if="this.$store.themeSettingsStore.isDark"
    />
  </span>
</template>
<script>
import Icon from "@/components/Icon";
import { useThemeSettingsStore } from "@/store/themeSettings";
const themeSettingsStore = useThemeSettingsStore();

export default {
  components: {
    Icon,
  },
  methods: {
    toogleDark() {
      themeSettingsStore.toogleDark();
    },
  },
};
</script>
<style lang=""></style>
