<template>
    <router-view>
    </router-view>
</template>
<script>
export default {
    mounted: function() {
        if (this.$route.query.wechatCode) {
            localStorage.setItem("wx.user.wechat.code", this.$route.query.wechatCode);
        }
    }
}
</script>
