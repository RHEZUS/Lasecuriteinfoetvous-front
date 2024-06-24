<template>
    <div class="w-full min-h-[350px] bg-cover bg-center relative before:block before:w-full before:h-full before:top-0 before:left-0 before:absolute before:-inset-1 before:bg-[rgba(0,0,0,0.61)] hover:before:bg-[#1e40afb4]" :style="{ backgroundImage: `url(${imageUrl})` }">
        <div class="cart-content absolute bottom-4 p-4 text-white text-base">
            <a :href="link"><h2 class="font-semibold py-3">{{title}}</h2></a>
            <a :href="link" class="text-white border border-white rounded-full w-8 h-8 flex items-center justify-center text-2xl">
                <i class='bx bx-right-arrow-alt'></i>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showOverlay: false,
            //imageUrl: 'https://validthemes.net/site-template/solion/assets/img/blog/2.jpg',
        }
    },
    props: {
        title: {
            type: String,
            default: 'The Steps to Gaining Privileged Access Security'
        },
        imageUrl: {
            type: String,
            default: 'https://validthemes.net/site-template/solion/assets/img/blog/2.jpg'
        },
        link: {
            type: String,
            default: '#'
        }
    }
}
</script>
<style scoped>
</style>

