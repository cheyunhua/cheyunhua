import api from 'src/api/'
import { Toast, Indicator } from 'mint-ui'

/**
 * 根据响应规范封装的异步处理流
 * @export
 * @param {any} that Vue的this
 * @param {any} method api里的方法名
 * @param {any} paramObj 参数对象
 * @param {any} callback 回调函数，其参数为服务器返回的json
 *
 * 使用示例见 src/pages/wxIndex/vHeadline.vue
 */
export default function(that, method, paramObj, callback) {
    Indicator.open({
        text: '加载中...',
        spinnerType: 'triple-bounce',
    })
    api[method](paramObj)
        .then(response => {
            Indicator.close()
            // HTTP OK
            if (response.status === 200) {
                // head存在判断
                if (response.data.head) {
                    // 服务响应成功
                    if (response.data.head.errorCode === '0') {
                        // 回调
                        callback.bind(that)(response.data)
                    } else {
                        // errorMsg存在判断
                        response.data.head.errorMsg
                            ? Toast(response.data.head.errorMsg)
                            : Toast('no errorMsg found in head')
                    }
                } else {
                    Toast('服务端返回的数据格式错误：缺少head')
                }
            } else {
                // status==2xx && status!=200
                Toast(response.status + ' ' + response.statusText)
            }
        })
        .catch(error => {
            Indicator.close()
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                Toast(error.response.status + ' ' + error.response.statusText)
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                Toast(error.request)
                console.log(error.request)
            } else {
                // Something happened in setting up the request that triggered an Error
                Toast('Error: ' + error.message)
                console.log('Error: ', error.message)
            }
            console.log(error.config)
        })
}
