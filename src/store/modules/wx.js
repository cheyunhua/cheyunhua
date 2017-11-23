const SET_SELECTED_CITY = 'SET_SELECTED_CITY'

export default {
    state: {
        selectedCity: {
            // 默认值
            name: '广州市',
            encode: '440100',
        },
    },
    mutations: {
        [SET_SELECTED_CITY](state, payload) {
            state.selectedCity = payload
        },
    },
    actions: {},
    getters: {},
}
