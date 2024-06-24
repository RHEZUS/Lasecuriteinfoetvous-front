<template>
    <div class="min-h-full w-full bg-white">
        <Header></Header>
        <Hero :title="'Stories'">
            <ul class="text-lg mt-4 flex gap-2 font-medium text-white uppercase">
                <a href="/"> <li><i class='bx bx-home'></i> Home </li> </a>
                <li> / </li>
                <li>Stories</li>
            </ul>
        </Hero>
        <div class="">
            <div class="grid w-full grid-cols-12 mt-6 px-4 md:px-12  py-12 gap-6">
                <div v-for="item in stories" class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                    <Cart  :title="item.title" :imageUrl="API_URL + 'storage/' + item.image_url" :link="'/stories/' + item.slug"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import apiClient from '@/plugins/axios';
import { API_URL } from '@/constant/data';
import { useToast } from "vue-toastification";
import Cart from '@/components/StoriesCard/index.vue';
import Header from '@/components/FrontOfficeHeader/index.vue';
import Hero from '@/components/BlogHero/index.vue';
export default {
    data() {
        return {
            showOverlay: false,
            stories: [],
            API_URL: API_URL,
        }
    },
    components:{
        Cart,
        Header,
        Hero,
    },
    methods:{
        async getStories(){
            try {
                const response = await apiClient.get('/api/stories/published');
                this.stories = response.data.stories;
                console.log(this.stories);
            } catch (error) {
                this.toast.error("Failed to fetch recent posts");
                console.log(error);
            }
        },
        async getCategories(){
          await apiClient.get(`/api/story/categories`)
          .then(response => {
              this.categories = response.data.categories;
              console.log(response.categories);
          }).catch(error => {
              this.toast.error('Failed to fetch categories', { timeout: 2000 });
              console.log(error);
          });
        },
    },
    mounted(){
        this.getStories();
        this.getCategories();
    },
}
</script>
<style scoped>
</style>