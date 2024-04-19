import service from '..'
export function getBanner(){
    return service({
        method:'Get',
        url:'/banner?type=2'
    })
}

export function getMusicList(){
    return service({
        method:'Get',
        url: '/personalized?limit=10'
    })
}

//搜索
export function getSearchMusic(keyWord){
    return service({
        method:'Get',
        url: `/search?keywords=${keyWord}`
    })
}

/* 发送手机验证码 */
export function postNumber(phone) {
    return service({
        method:'Get',
        url: `/captcha/sent?phone=${phone}`
    })
}

/* 验证手机验证码是否正确 */
export function checkVerCode(phone, code)
{
    return service({
        method:'Get',
        url: `/captcha/verify?phone=${phone}&captcha=${code}`
    })
}

//登录
export function getPhoneLogin(data){
    return service({
        method:"GET",
        url:`/login/cellphone?phone=${data.phone}&captcha=${data.password}`
    })
}
