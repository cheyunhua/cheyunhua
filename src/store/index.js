import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import account from './modules/account'
import wx from './modules/wx'

Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    modules: {
        account,
        wx,
    },
    strict: process.env.NODE_ENV !== 'production',
})
