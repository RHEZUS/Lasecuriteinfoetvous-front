<template>
    <div class="min-h-full bg-white">
        <Header></Header>
        <Hero :title="'Blog'">
            <ul class="text-lg mt-4 flex gap-2 font-medium text-white uppercase">
                <a href="/"> <li><i class='bx bx-home'></i> Home </li> </a>
                <li> / </li>
                <a href="#"> <li>Blog </li> </a>
            </ul>
        </Hero>
    
        <div class="grid grid-cols-12 mt-6 px-4 md:px-12  py-12 gap-6">
            <div class="col-span-12">
                <h2 class="text-2xl font-bold mb-4">Search Results for "{{ $route.params.keyword }}"</h2>
            </div>
            <div class="col-span-12">
                <form @submit.prevent="runSearch()" class="flex rounded-lg h-11">
                    <input type="text" v-model="keyword" placeholder="Search..." class="py-3 px-4 block w-full border-gray-200 shadow-sm border text-sm focus:z-10 focus:right-0 focus:outline-0 disabled:opacity-50 disabled:pointer-events-none">
                    <button v-if="loadSearch" type="button" class="w-[2.875rem] h-full flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                        <svg class="h-10 w-10 animate-spin stroke-white" viewBox="0 0 256 256">
                            <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"></line>
                            <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="14"></line>
                            <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="14">
                            </line>
                            <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="14"></line>
                            <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="14">
                            </line>
                            <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="14"></line>
                            <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"></line>
                            <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="14">
                            </line>
                        </svg>              
                      </button>
                      <button v-else type="submit" class="w-[2.875rem] h-full flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                        <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.3-4.3"></path>
                        </svg>
                      </button>
                </form>
            </div>
            <div class="grid w-full grid-cols-12 mt-6 px-4 md:px-12  py-12 gap-6">
                <div v-for="item in stories" class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                    <Cart  :title="item.title" :imageUrl="API_URL + 'storage/' + item.image_url" :link="'/stories/' + item.slug"/>
                </div>
            </div>
            <div class="col-span-12 lg:col-span-4">
                <SideBar></SideBar>
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

export default{
    data(){
        return{
            stories: [],
            toast: useToast(),
            API_URL: API_URL,
            keyword: this.$route.params.keyword,
            loadSearch: false,
        }
    },
    watch: {
        '$route.params.keyword': {
            immediate: true,
            handler(newKeyword) {
                this.keyword = newKeyword;
                this.getArticles();
            }
        }
    },
    components: {
        Header,
        Hero,
        Card,
        SideBar,
    },
    methods: {
        async getArticles() {
            try {
                const keyword = this.$route.params.keyword;
                const response = await apiClient.get(`/api/stories/search/${keyword}`);
                this.stories = response.data.stories;
                console.log('search result: ', this.stories);
            } catch (error) {
                this.toast.error("Failed to fetch recent posts");
                console.log(error);
            }
        },
        async runSearch() {
            this.loadSearch = true;
            if (this.keyword.trim() === '') {
                this.toast.error('Please enter a keyword to search', { timeout: 2000 });
                this.keyword = '';
                this.loadSearch = false;
                return;
            }
            await this.$router.push({ name: 'BlogSearch', params: { keyword: this.keyword } });
            this.loadSearch = false;
        },
    },
    mounted() {
        this.getArticles();
    }
}
</script>

<style lang=""></style>
      