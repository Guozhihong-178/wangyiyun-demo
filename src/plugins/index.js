import { Swipe, SwipeItem, Button, Popup, Lazyload } from 'vant';
// 放入数组中
let plugins = [
    Swipe, SwipeItem, Button, Lazyload, Popup
]
export default function getVant(app) {
    plugins.forEach((item) => {
        return app.use(item)
    })
}
