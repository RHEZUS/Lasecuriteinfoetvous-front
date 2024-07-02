<template>
    <div class="min-h-full bg-white">
        <Header></Header>
        <Hero :title="'Blog'">
            <ul class="text-lg mt-4 flex gap-2 font-medium text-white uppercase">
                <a href="/"> <li><i class='bx bx-home'></i> Home </li> </a>
                <li> / </li>
                <a href="/blog"> <li>Blog </li> </a>
                <li> / </li>
                <a href="#"> <li> {{category.name}} </li> </a>
            </ul>
        </Hero>
    
        <div class="grid grid-cols-12 mt-6 px-4 md:px-12  py-12 gap-6">
            <div class="col-span-12 lg:col-span-8 grid grid-cols-12 gap-6">
                <div class="col-span-12 sm:col-span-6" v-for="article in articles">
                    <Card 
                    :title="article.title"
                    :img="API_URL + 'storage/' + article.image_url"
                    :author="article.user.name"
                    :date="article.created_at"
                    :authorLink="'#'"
                    :link="'/blog/article/' + article.slug"
                    />
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
                articles:[],
                category: {},
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
            async getArticles(){
                try {
                    const slug = this.$route.params.slug;
                    const response = await apiClient.get(`api/article/with/category/${slug}`);
                    this.articles = response.data.articles;
                    this.category = response.data.category;
                    console.log(this.articles);
                } catch (error) {
                    this.toast.error("Failed to fetch recent posts");
                    console.log(error);
                }
            },
        },
        mounted(){
            this.getArticles();
        }
    }
    </script>
    <style lang=""></style>
      