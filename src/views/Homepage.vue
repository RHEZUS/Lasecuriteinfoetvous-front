<template>
    <div class="bg-white max-h-max text-black">
        <Header/>
        <section class="hero px-4 md:px-12 py-12 mt-10 flex items-center bg-[#f3f6fd]">
           <div class="w-full sm:w-1/2 px-16 flex flex-col gap-2">
                <h5 class="text-xl font-semibold">Cyber Security Solutions for</h5>
                <h1 class="text-[40px] font-semibold">Organizations with Critical Infrastructure</h1>
                <p class="text-lg">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusm tempor incididunt ut labore et dolore magna aliqua.
                </p>
           </div> 
           <div class="w-1/2 flex justify-center items-center">
                <img src="../assets/images/all-img/banner-img.png" alt="hero" class="w-full md:w-[65%]"/>
           </div>
        </section>
        <section class="blog px-4 md:px-12 pt-16 pb-8">
            <div class="section-title text-center">
                <h2 class="font-extrabold text-3xl">
                    <span class="text-black-500">OUR BLOG</span>
                </h2>
                <p class="text-lg py-4">Discover the latest news and updates from our blog</p>
            </div>
            <div class="grid grid-cols-12 gap-4">
                <div v-for="(article) in recentPosts" class="col-span-12 sm:col-span-6 lg:col-span-4 bg-blue-800 mt-2 mb-2">
                    <Card 
                    :title="article.title"
                    :img="API_URL + 'storage/' + article.image_url"
                    :author="article.user.name"
                    :date="article.created_at"
                    :authorLink="'/author/' + article.user.id"
                    :link="'//blog/article/' + article.slug"
                    />
                </div>
            </div>
        </section>
        <section class="px-4 border md:px-12 py-8">
            <div class="section-title text-center">
                <h2 class="font-extrabold text-3xl">
                    <span class="text-black-500">OUR STORIES</span>
                </h2>
                <p class="text-lg py-4">Discover the latest news and updates from our blog</p>
            </div>
            <div class="grid w-full grid-cols-12 mt-6 gap-6">
                <div v-for="item in recentStories" class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                    <StoryCart  :title="item.title" :imageUrl="API_URL + 'storage/' + item.image_url" :link="'/stories/' + item.slug"/>
                </div>
            </div>
        </section>
        <div class="">
            

        </div>
        <Footer/>
    </div>
</template>
<script>
    import Card from '@/components/BlogCard/index.vue';
    import StoryCart from '@/components/StoriesCard/index.vue';
    import Header from '@/components/FrontOfficeHeader/index.vue';
    import Footer from '@/components/FrontOfficeFooter/index.vue';
    import axios from 'axios';
    import { API_URL } from '@/constant/data';
    import apiClient from "@/plugins/axios";
    import { useToast } from "vue-toastification";
    export default{
        components:{
            Header,
            Card,
            StoryCart,
            Footer,
        },
        data(){
            return {
                user: [],
                recentPosts: [],
                recentStories: [],
                toast: useToast(),
                API_URL: API_URL,
            }
        },
        methods:{
            async getRecentPosts(){
                await apiClient.get(`/api/articles/recent`)
                .then(response => {
                    this.recentPosts = response.data.articles.slice(0, 3);
                    console.log(this.recentPosts);
                }).catch(error => {
                    this.toast.error('Failed to fetch recent posts', { timeout: 2000 });
                    console.log(error);
                });
            },
            async getRecentStories(){
                await apiClient.get(`/api/stories/recent`)
                .then(response => {
                    this.recentStories = response.data.stories.slice(0, 4);
                    console.log(this.recentStories);
                }).catch(error => {
                    this.toast.error('Failed to fetch recent posts', { timeout: 2000 });
                    console.log(error);
                });
            },
        },
        mounted(){
            this.getRecentPosts();
            this.getRecentStories();
        }
    } 
</script>
<style lang=""></style>
  