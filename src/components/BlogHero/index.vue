<template>
    <div class="hero min-h-72  px-4 md:px-12 flex flex-col items-center justify-center overflow-hidden mt-14 after:contents[''] after:absolute after:bg-black-500" :style="{ backgroundImage: `url(${image})` }">
        <div class="text-white text-6xl font-medium uppercase">{{title}}</div>
        <slot></slot>
    </div>
</template>
<script>
export default{
    data(){
        return{
        }
    },
    props:{
        image: {
            type: String,
            default: 'https://validthemes.net/site-template/solion/assets/img/blog/2.jpg'
        },
        title: {
            type: String,
            default: 'Blog'
        },
    }
}
</script>
<style lang="css">
.hero{
    background-size: cover;
    box-shadow: inset 0 0 0 2000px rgba(24, 23, 24, 0.842);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
.hero::after{
    content: '';
}
</style>
  