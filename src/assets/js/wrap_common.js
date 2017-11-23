export default function refresh(l, n) {
    if (
        Object.prototype.toString.call(l) !== '[object Array]' ||
        Object.prototype.toString.call(n) !== '[object Number]'
    ) {
        throw 'wrap_common.js参数错误'
    }
    while (n--) {
        // 人体蜈蚣loop
        l.push(l.shift())
    }
}
