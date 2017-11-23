<script>
export default {

}

</script>
<template>
    <div class="esi">
        <v-service-icon label="开办公司"
                        icon="icon-qiye1"
                        url="/product/kbgs"
                        bgcolor="#F29F3F" />
        <v-service-icon label="财税外包"
                        icon="icon-taizhangjilu"
                        url="/product/dljz"
                        bgcolor="#FF6633" />
        <v-service-icon label="财富增值"
                        icon="icon-jingwaifalv"
                        url="/appreciation"
                        bgcolor="#E87E51" />

        <v-service-icon label="财税咨询"
                        icon="icon-zixun1"
                        url="/product/cszx"
                        bgcolor="#F2D309" />
    </div>
</template>
<style scoped>
.esi {
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
}
</style>
