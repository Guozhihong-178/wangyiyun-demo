import { Swipe, SwipeItem, Button, Popup, Lazyload, PasswordInput, NumberKeyboard, Toast } from 'vant';
// 放入数组中
let plugins = [
    Swipe, SwipeItem, Button, Lazyload, Popup, PasswordInput, NumberKeyboard, Toast
]
export default function getVant(app) {
    plugins.forEach((item) => {
        return app.use(item)
    })
}
