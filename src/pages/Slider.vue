<template>
    <div class="flex flex-wrap w-full relative">
        <div v-for="(color, index) in colors" :key="color" class="absolute w-full" >
            <transition name="fade">
                <div 
                    :class="color" 
                    style="height:350px" 
                    v-if="currentSlide == index"></div>
            </transition>
        </div>

        <div class="w-full" style="height: 340px">
            <div class="absolute bottom-0 w-full flex justify-center">
                <div 
                    v-for="(color, index) in colors" 
                    @click="makeActive(index)"
                    :key="color" :class="currentSlide == index? 'bg-gray-700' : 'bg-gray-300' "
                    class="w-4 h-4 mx-2 rounded-full cursor-pointer"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentSlide: 0,
            interval: "",
            colors: ['bg-blue-600', 'bg-yellow-600', 'bg-teal-600']
        }
    },
    methods: {
        makeActive(index) {
            this.currentSlide = index;
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.currentSlide = this.currentSlide === 2? 0 : this.currentSlide + 1
        }, 2000);
    },
    beforeUnmount() {
        clearInterval(this.interval);
    }
}
</script>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition: all 2s ease
    }

    .fade-enter-from {
        opacity: 0;
        transform: translateX(-100%);
    }

    .fade-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }
</style>