<template>
<div class="fixed  z-50 w-full top-0 right-0">
<div class="px-4 md:px-12 py-2 border relative w-full  bg-white flex items-center justify-between gap-10">
    
    <div class="logo w-fit text-center text-3xl flex items-center justify-start bg-white">
      <a  href="/" class="flex items-center gap-1">
          <img src="../../assets/images/logo/logo-c.svg" alt="logo" class="w-9 h-9">
          <span class="text-xl">DashCode</span>
      </a>
    </div>
    <div class="hidden md:flex">
      <ul class="flex gap-8 font-semibold text-lg w-full">
        <a href="/" class="text-black-500 hover:text-blue-800"> <li>Home</li> </a>
        <a href="/blog" class="text-black-500 hover:text-blue-800"> <li>Blog</li> </a>
        <a href="/stories" class="text-black-500 hover:text-blue-800"> <li>Stories</li> </a>
        <a href="" class="text-black-500 hover:text-blue-800"> <li>About Us</li> </a>
        <a href="" class="text-black-500 hover:text-blue-800"> <li>Contact Us</li> </a>
      </ul>
    </div>
    <div class="">
      <a href="#" class="bg-blue-800 text-white hover:text-blue-800 hover:bg-white px-3 py-3 rounded-md ring-blue-800 hover:ring-2 text-lg font-semibold">Contact Us</a>
    </div>
    
    <ResponsiveNavbar></ResponsiveNavbar>
  </div>
</div>
</template>
<style scoped>
  
</style>

<script>

import ResponsiveNavbar from './ResponsiveNavbar.vue';
import { API_URL } from "@/constant/data";
import axios from "axios";
export default {
  data() {
    return {
      token: localStorage.getItem('authToken'),
      pageTitle: this.$route.name,
      //categories: [],
      apiUrl: API_URL,
      isScrolled: false,
      showSidebar: false,
      showCard: false,
      numberOfItemInCart: localStorage.getItem('numberOfItemInCart'),
    };
  },
  mounted(){
    //this.getChildData();
  },
  components: {
    ResponsiveNavbar,

  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
    //this.fetchCategories();
    //window.addEventListener('click', this.handleGlobalClick);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    //window.removeEventListener('click', this.handleGlobalClick);
  },
  methods: {
    handleScroll() {
      if (window.pageYOffset > 100) { // Change 100 to the position where you want the background to change
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    },
    computedClass(categoryName) {
      const currentPath = '/product/category/' + categoryName;
      return this.$route.path === currentPath;
    },

    async logout() {
        try {
            // Make a request to the logout endpoint provided by Sanctum
            await axios.post(`${API_URL}/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            
            // Clear the authToken from localStorage
            localStorage.removeItem('authToken');

            // Redirect the user to the login page or any other page as needed
            this.$router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            // Handle error as needed
        }
    },


    prodByCategory(name) {
      this.$router.push({name: 'Category Products', params: {name: name}});
      this.showSidebar=false;
    },
  }
};
</script>