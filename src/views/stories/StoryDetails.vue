<template>
    <div class="min-h-full bg-white">
        <Header></Header>
        <Hero :title="'Stories'">
            <ul class="text-lg mt-4 flex gap-2 font-medium text-white uppercase">
                <a href="/"> <li><i class='bx bx-home'></i> Home </li> </a>
                <li> / </li>
                <a href="/stories"> <li>Stories </li> </a>
                <li> / </li>
                <li> Single </li>
            </ul>
        </Hero>
    
        <div class="grid grid-cols-12 mt-6 px-4 md:px-12  py-12 gap-6">
            <div class="col-span-12 lg:col-span-8">
                <div class="shadow-2xl p-4">
                    <img :src="API_URL + 'storage/' + story.image_url" class="w-full border" alt="">
                    <div class="px-5">
                        <div class="flex pt-5 items-center gap-4">
                            <div class="flex items-center gap-2">
                                <img v-if="story.user != null" :src="API_URL + 'storage/' + story.user.avatar" alt="profile" class="w-7 h-7 rounded-full">
                                <img v-else src="../../assets/images/all-img/thumb-6.png" alt="profile" class="w-10 h-10 rounded-full">
                                <a v-if="story.user" :href="'/profile/' + story.user.id" class="text-lg font-semibold text-black-500 hover:text-blue-800">{{story.user.name}}</a>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class='text-blue-800 bx bxs-calendar'></i>
                                <span>{{formatDate(story.created_at)}}</span>
                            </div>
                            <a href="#">
                                <div class="flex items-center gap-2 text-gray-500 hover:text-blue-800">
                                    <i class='text-blue-800 bx bxs-collection' ></i>
                                    <span v-if="story.category" class="text-base">{{story.category.name}}</span>
                                </div>
                            </a>
                            
                        </div>
                        <h1 class="text-slate-950 pt-5">{{story.title}}</h1>
                        <div class="w-full mt-1">
                            <audio controls class="relative">
                                <source :src="API_URL + 'storage/' + story.audio" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                        <div class="content pt-2" v-html="story.content">
    
                        </div>
                    </div>
                </div>
                
                
            </div>
            <div class="col-span-12 lg:col-span-4">
                <SideBar/>
            </div>
        </div>
        
    </div>
    </template>
    <script>
    import SideBar from '@/components/StorySidebar/index.vue';
    import Card from '@/components/BlogCard/index.vue';
    import Header from '@/components/FrontOfficeHeader/index.vue';
    import Hero from '@/components/BlogHero/index.vue';
    import apiClient from '@/plugins/axios';
    import { API_URL } from '@/constant/data';
    import { useToast } from "vue-toastification";
    export default{
        data(){
            return{
                story:[],
                toast: useToast(),
                API_URL: API_URL,
                categories: [],
                recentPosts: [],
            }
        },
        components:{
            Header,
            Hero,
            Card,
            SideBar,
        },
        methods:{
            async getArticle(){
                try {
                    const response = await apiClient.get(`/api/story/${this.$route.params.slug}`);
                    this.story = response.data.story;
                    console.log(response.data);
                } catch (error) {
                    this.toast.error("Failed to fetch recent posts");
                    console.log(error);
                }
            },
            async getCategories(){
                await apiClient.get(`/api/story/categories`)
                .then(response => {
                    this.categories = response.data.categories;
                    console.log(response);
                }).catch(error => {
                    this.toast.error('Failed to fetch categories', { timeout: 2000 });
                    console.log(error);
                });
            },
            formatDate(dateString) {
                const date = new Date(dateString);
                const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
                const month = date.toLocaleString('en-US', { month: 'short' });
                const year = date.getFullYear();
                return day  + ' ' + month + ', ' + year;
            },
        },
        mounted(){
            this.getArticle();
            this.getCategories();
        }
    }
    </script>
<style lang="scss">
h1{
    @apply text-[27px] py-2 font-semibold text-black-500;
}
h2{
    @apply text-[27px] py-2 font-medium text-black-500;
}
  
h3 {
    @apply text-2xl font-medium py-2 text-black-500;
}
h4 {
    @apply text-xl font-medium py-2 text-black-500;
}
h5 {
    @apply text-lg font-medium py-2 text-black-500;
}
h6 {
    @apply text-base leading-[20px] py-2 font-medium text-black-500;
}

p{
    @apply text-base leading-[20px] py-2 text-[#666666];
    line-height: 1.7;
}

.content ul{
    @apply list-disc list-inside;
    li{
        @apply text-base leading-[20px] py-2 text-[#666666];
        line-height: 1.7;
    }
}
</style>
      