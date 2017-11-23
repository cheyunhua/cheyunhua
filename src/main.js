import Vue from 'vue'
import App from './App'
import mint from 'mint-ui'
import components from './components/' //加载公共组件
import store from './store/'
import { sync } from 'vuex-router-sync'
import router from './router/index'
import $ from 'jquery'
import track from './api/trackinit'
import pages from './pages/' //加载页面
/** 引入elementUi库**/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import 'mint-ui/lib/style.css'
import 'src/assets/css/bootstrap.min.css'
import 'src/assets/css/commo.css'
import 'src/assets/css/common.css'
import 'src/assets/css/enterprise.css'
import 'src/assets/css/font-awesome.min.css'
import 'src/assets/css/style.css'
import 'src/assets/fonts/fontawesome-webfont.eot'
import 'src/assets/css/selectCity.css'

//新功能的iconfont
import 'src/assets/fonts/wxIconfont/iconfont.css'


Vue.use(mint)
Vue.use(ElementUI)
// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

Object.keys(components).forEach(key => {
    var name = key.replace(/(\w)/, v => v.toUpperCase()) //首字母大写
    console.log(name)
    Vue.component(`v${name}`, components[key])
})

Object.keys(pages).forEach((key) => {
	var name = key.replace(/(\w)/, (v) => v)
	//console.log(name)
    Vue.component(`${name}-page`, pages[key])
})

/* eslint-disable no-new */
new Vue({
    store,
    router: router,
    render: h => h(App),
}).$mount('#app')
