<template>
    <div>
        <v-product-card v-for="item in arr"
                        :product="item"
                        deadline="item.deadline" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            arr: [
                {
                    title: "小规模纳税人代理记帐（内资）-零申报",
                    price: "1980.00",
                    deadline: "年起",
                    hint: "代理记账",
                    content: "专业资深会计为小规模纳税人提供代理记账、纳税申报等服务，VIP客户经理上门服务.....",
                },
                {
                    title: "小规模纳税人代理记帐（内资）",
                    img: "",
                    price: "2980.00",
                    deadline: "年起",
                    hint: "代理记账",
                    content: "专业资深会计为小规模纳税人提供代理记账、纳税申报等服务，VIP客户经理上门服务.....",
                }, {
                    title: "一般纳税人代理记帐（内资）",
                    img: "",
                    price: "5478.00",
                    deadline: "年起",
                    hint: "代理记账",
                    content: "专业资深会计为小规模纳税人提供代理记账、纳税申报等服务，VIP客户经理上门服务.....",
                }, {
                    title: "更换三证合一营业执照",
                    img: "",
                    price: "200.00",
                    deadline: "年起",
                    hint: "代理记账",
                    content: "专业资深会计为小规模纳税人提供代理记账、纳税申报等服务，VIP客户经理上门服务.....",
                }
            ]
        }
    }
}
</script>
