<template>
    <nav class="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-2">
        <router-link class="mx-2" v-for="link in links" :key="link.to" :to="link.to">{{link.title}}</router-link>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            links: [
                {title: "DC Heroes", to: "/dc-heroes"},
                {title: "Calendar", to: "/calendar"},
                {title: "Markdown", to: "/markdown"},
                {title: "Slider Carousel", to: "/slider"},
            ]
        }
    }
}
</script>