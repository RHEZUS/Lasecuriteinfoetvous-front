<template>
    <div class="min-h-full bg-white">
        <Header></Header>
        <Hero :title="'Blog'">
            <ul class="text-lg mt-4 flex gap-2 font-medium text-white uppercase">
                <a href="/"> <li><i class='bx bx-home'></i> Home </li> </a>
                <li> / </li>
                <a href="/blog"> <li>Blog </li> </a>
                <li> / </li>
                <li> Single </li>
            </ul>
        </Hero>
    
        <div class="grid grid-cols-12 mt-6 px-4 md:px-12  py-12 gap-6">
            <div class="col-span-12 lg:col-span-8">
                <div class="shadow-2xl p-4">
                    <img :src="API_URL + 'storage/' + article.image_url" class="w-full border" alt="">
                    
                    <div class="px-5">
                        <div class="flex pt-5 items-center gap-4">
                            <div class="flex items-center gap-2">
                                <img v-if="article.user != null" :src="API_URL + 'storage/' + article.user.avatar" alt="profile" class="w-7 h-7 rounded-full">
                                <img v-else src="../../assets/images/all-img/thumb-6.png" alt="profile" class="w-10 h-10 rounded-full">
                                <a v-if="article.user" :href="'/profile/' + article.user.id" class="text-lg font-semibold text-black-500 hover:text-blue-800">{{article.user.name}}</a>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class='text-blue-800 bx bxs-calendar'></i>
                                <span>{{formatDate(article.created_at)}}</span>
                            </div>
                            <a href="#">
                                <div class="flex items-center gap-2 text-gray-500 hover:text-blue-800">
                                    <i class='text-blue-800 bx bxs-collection' ></i>
                                    <span v-if="article.category" class="text-base">{{article.category.name}}</span>
                                </div>
                            </a>
                            
                        </div>
                        <h1 class="text-slate-950 pt-5">{{article.title}}</h1>
                        <div class="content pt-2" v-html="article.content">
    
                        </div>
                    </div>
                </div>
                
                
            </div>
            <div class="col-span-12 lg:col-span-4">
                <SideBar></SideBar>
            </div>
        </div>
        
    </div>
    </template>
    <script>
    import SideBar from '@/components/BlogSidebar/index.vue';
    import Card from '@/components/BlogCard/index.vue';
    import Header from '@/components/FrontOfficeHeader/index.vue';
    import Hero from '@/components/BlogHero/index.vue';
    import apiClient from '@/plugins/axios';
    import { API_URL } from '@/constant/data';
    import { useToast } from "vue-toastification";
    export default{
        data(){
            return{
                article:[],
                toast: useToast(),
                API_URL: API_URL,
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
                    const response = await apiClient.get(`/api/articles/${this.$route.params.slug}`);
                    this.article = response.data.article;
                    console.log(this.article);
                } catch (error) {
                    this.toast.error("Failed to fetch recent posts");
                    console.log(error);
                }
            },
            formatDate(dateString) {
                const date = new Date(dateString);
                const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
                const month = date.toLocaleString('en-US', { month: 'short' });
                const year = date.getFullYear();
                return day  + ' ' + month + ', ' + year;
            }
        },
        mounted(){
            this.getArticle();
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
      