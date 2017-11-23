<template>
    <keep-alive>
        <router-view>
        </router-view>
    </keep-alive>
</template>

<script>
export default {
    mounted() {
        let dpr = window.devicePixelRatio
        document.querySelector('html').style.fontSize =
            dpr >= 3 ? '60%' : '75%'
    }
}
</script>
