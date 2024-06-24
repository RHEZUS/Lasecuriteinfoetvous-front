<template>
    <div class="bg-white p-4 rounded-lg">
        <!-- Search section -->
        <div class="mb-4">
            <h2 class="text-lg font-bold mb-2 border-b-2 p-2 border-blue-800" style="color: black;">Search</h2>
            <div>
                <label for="hs-trailing-button-add-on-with-icon" class="sr-only">Label</label>
                <div class="flex rounded-lg h-11">
                  <input type="text" placeholder="Search..." class="py-3 px-4 block w-full border-gray-200 shadow-sm border text-sm focus:z-10 focus:right-0 focus:outline-0 disabled:opacity-50 disabled:pointer-events-none">
                  <button type="button" class="w-[2.875rem] h-full flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </button>
                </div>
              </div>
        </div>

        <!-- Recent posts section -->
        <div class="mb-4">
            <h2 class="text-lg font-bold mb-2 border-b-2 p-2 border-blue-800" style="color: black;">Recent Posts</h2>
            <!-- Add your recent posts list here -->

            <div v-if="recentStories" v-for="story in recentStories" class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <a href="#" class="w-20">
                        <div class="w-20">
                            <img :src="API_URL + 'storage/' + story.image_url" alt="blog" class="w-full h-20 object-cover rounded-lg">
                        </div>
                    </a>
                    <div>
                        <a href="#"class="text-lg font-semibold text-black-500 hover:text-blue-800">{{story.title}}</a>
                        <p class="text-base text-gray-500">{{formatDate(story.created_at)}}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Categories section -->
        <div class="mb-4">
            <h2 class="text-lg font-bold mb-2 border-b-2 p-2 border-blue-800" style="color: black;">Categories</h2>
            <!-- Add your categories list here -->
            <ul>
                <a v-for="category in categories" href="#" class="p-1"><li class="flex items-center justify-between">{{category.name}} <span>{{ category.articles_count }}</span></li></a>
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
export default {
    name: 'BlogSidebar',
    data(){
        return{
            recentStories: [],
            categories: [],
            toast: useToast(),
            API_URL: API_URL,
        }
    },
    methods:{
        async getRecentPosts(){
            await apiClient.get(`/api/stories/recent`)
            .then(response => {
                this.recentStories = response.data.stories;
                console.log(this.recentStories);
            }).catch(error => {
                this.toast.error('Failed to fetch recent posts', { timeout: 2000 });
                console.log(error);
            });
        },
        async getCategories(){
          await apiClient.get(`api/top/story/categories`)
          .then(response => {
              this.categories = response.data.categories;
              console.log(response.data);
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
        }
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