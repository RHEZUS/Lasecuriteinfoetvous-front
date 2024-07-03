<template>
    <div class="bg-white p-4 rounded-lg">
        <!-- Search section -->
        <div class="mb-4">
            <h2 class="text-lg font-bold mb-2 border-b-2 p-2 border-blue-800" style="color: black;">Search</h2>
            <div>
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
        </div>

        <!-- Recent posts section -->
        <div class="mb-4">
            <h2 class="text-lg font-bold mb-2 border-b-2 p-2 border-blue-800" style="color: black;">Recent Posts</h2>
            <!-- Add your recent posts list here -->

            <div v-if="recentPosts" v-for="article in recentPosts" class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <a :href="'/blog/article/' + article.slug" class="w-20">
                        <div class="w-20">
                            <img :src="API_URL + 'storage/' + article.image_url" alt="blog" class="w-full h-20 object-cover rounded-lg">
                        </div>
                    </a>
                    <div>
                        <a :href="'/blog/article/' + article.slug" class="text-lg font-semibold text-black-500 hover:text-blue-800 hover:cursor-pointer">{{article.title}}</a>
                        <p class="text-base text-gray-500">{{formatDate(article.created_at)}}</p>
                    </div>
                </div>
            </div>

        </div>

        <!-- Categories section -->
        <div class="mb-4">
            <h2 class="text-lg font-bold mb-2 border-b-2 p-2 border-blue-800" style="color: black;">Categories</h2>
            <!-- Add your categories list here -->
            <ul>
                <a v-for="category in categories" :href="'/blog/category/'+category.slug" class="p-1"><li class="flex items-center justify-between">{{category.name}} <span>{{ category.articles_count }}</span></li></a>
            </ul>
        </div>

        <!-- Share on social media section -->
        <div class="hidden">
            <h2 class="text-lg font-bold mb-2 border-l-4 p-2 border-blue-800" style="color: black;">Share on Social Media</h2>
            <!-- Add your social media sharing buttons here -->
        </div>
    </div>
</template>
formatDate(article.created_at)
<script>
import apiClient from '@/plugins/axios';
import { API_URL } from '@/constant/data';
import { useToast } from "vue-toastification";
import { sleep } from '@amcharts/amcharts5/.internal/core/util/Time';
export default {
    name: 'BlogSidebar',
    data(){
        return{
            recentPosts: [],
            categories: [],
            keyword: '',
            toast: useToast(),
            API_URL: API_URL,
            loadSearch: false,
        }
    },
    methods:{
        async getRecentPosts(){
            await apiClient.get(`/api/articles/recent`)
            .then(response => {
                this.recentPosts = response.data.articles;
                console.log(this.recentPosts);
            }).catch(error => {
                this.toast.error('Failed to fetch recent posts', { timeout: 2000 });
                console.log(error);
            });
        },
        async getCategories(){
          await apiClient.get(`/api/top/article/categories`)
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
            return day + ' ' + month + ', ' + year;
        },
        async runSearch(){
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
    mounted(){
        this.getRecentPosts();
        this.getCategories();
    }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>