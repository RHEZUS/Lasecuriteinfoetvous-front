<template>
    <div class="card  w-full p-3  relative" :class="class">
        <div class="card-header  relative bg-black-500">
            <img :src="img" alt="" class="" style="width: 100%; max-height: 200px;">
            <div class="absolute bg-white text-center p-2 -bottom-9 left-3  mb-3" style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">
                <div class="text-blue-800 text-4xl font-bold">{{formatDate(date)[0]}}</div>
                <div class="font-medium">{{formatDate(date)[1]}}</div>
            </div>
        </div>
        <div class="card-body  text-black-500 mt-8 px-4 flex flex-col">
            <div class="group flex gap-4 pt-3 mb-3">
                <a :href="authorLink" class="flex items-center gap-2 text-black-500 hover:text-blue-800"><Icon class="text-blue-800" icon="heroicons:user" /> <span>{{ author }}</span></a>
                <a :href="link" class="flex items-center gap-2 text-black-500 hover:text-blue-800"><Icon class="text-blue-800" icon="heroicons:chat-bubble-left-right" /> <span>{{ commentCount }}</span></a>
            </div>
            <a :href="link" class="titles text-black-500 hover:text-blue-800 font-bold text-xl">{{ title }}</a>
            <p class="text-slate-700 pt-3 pb-16 mb-auto">
                Easy mind life fact with see has bore ten. Parish any chatty can elinor direct for former. Up as meant widow...
            </p>
            <a :href="link" class="text-black-500 hover:text-blue-800 w-fit px-3 py-2 h-10 border border-black-400 hover:border-blue-800 font-medium flex items-center absolute bottom-5"><span>Read More</span>  <i class='bx bxs-chevron-right  text-2xl' ></i></a>
        </div>
    </div>
</template>
<script>
    import Icon from "@/components/Icon";
    import { cn } from "@/lib/utils";
    export default{
        data(){
            return {

            }
        },
        components:{
            Icon,
        },
        props:{
            date:{
                type: String,
                default: '2024-06-16T15:24:39.000000Z',
            },
            authorLink:{
                type: String,
                default: '#',
            },
            link:{
                type: String,
                default: '#',
            },
            commentCount:{
                type: Number,
                default: 0,
            },
            author:{
                type: String,
                default: '',
            },
            class: {
                type: String,
                default: "bg-white",
            },
            title: {
                type: String,
                default: "",
            },
            titleClass: {
                type: String,
                default: "",
            },
            img: {
                type: String,
                default: "",
            },
            imaClass: {
                type: String,
                default: "",
            },
        },
        methods:{
            formatDate(dateString) {
                const date = new Date(dateString);
                const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
                const month = date.toLocaleString('en-US', { month: 'short' });
                const year = date.getFullYear();
                return [day, month + ', ' + year];
            }
        }
    }
    
</script>
<style lang="css" scoped>
    .card{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .card-header{
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .title{
        color: black;
    }
    .title:hover{
        color: blue;
    }
</style>
  