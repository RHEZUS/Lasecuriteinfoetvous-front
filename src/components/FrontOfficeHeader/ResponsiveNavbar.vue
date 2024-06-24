<template>
    <div ref="RespNav" class="visible md:hidden col-span-2">
        <div  @click="showSidebar = !showSidebar"  class="col-span-2 text-black visible text-3xl hover:cursor-pointer relative flex items-center">
            <!--Show when the responsive menu is closed-->
            <div v-if="!showSidebar" class="pointer-events-none">
                <Icon :icon="'heroicons-outline:bars-3'"></Icon>
            </div>
            <!--Show when the responsive menu is opened-->
            <div v-if="showSidebar" class="md:hidden">
                <Icon :icon="'heroicons-outline:bars-3'"></Icon>
            </div>
            
        </div>
        <!-- Responsive Sidebar -->
        <div :class="{'translate-y-0' : showSidebar, '-translate-y-[500px]': !showSidebar}" class="overflow-hidden duration-700 border md:hidden absolute left-0 top-[53px] px-12 py-5  w-full bg-white text-black -z-40"  ref="sidebar" style="box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;">
            <ul class="flex flex-col gap-5 font-normal">
                <a href="" class="text-black-500 py-1 border-b border-slate-400"> <li>Home</li> </a>
                <a href="" class="text-black-500 py-1 border-b border-slate-400"> <li>Blog</li> </a>
                <a href="" class="text-black-500 py-1 border-b border-slate-400"> <li>Stories</li> </a>
                <a href="" class="text-black-500 py-1 border-b border-slate-400"> <li>About Us</li> </a>
                <a href="" class="text-black-500 py-1 border-slate-400"> <li>Contact Us</li> </a>
            </ul>
        </div>
    </div>
    
</template>
<script>
import Icon from '@/components/Icon/index.vue'
export default {
    data(){
        return{
            showSidebar: false,
            categories: {},
        }
    },
    components:{
        Icon,
    },
    methods:{
        handleClickOutside(event) {
            // Check if the click was outside the referenced element
            if (this.$refs.RespNav && !this.$refs.RespNav.contains(event.target)) {
                this.showSidebar = false;
                //console.log('check if the click was outside the referenced element');
            }
        },
    },
    mounted() {
        // Add the event listener when the component is mounted
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        // Remove the event listener when the component is destroyed
        document.removeEventListener('click', this.handleClickOutside);
    },
}
</script>
<style scoped>

</style>