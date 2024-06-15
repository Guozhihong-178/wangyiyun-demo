后端环境：
进入NeteaseCloudMusicApi-master文件夹
在我就资源路径中输入cmd打开终端
输入命令行node app.js即可运行


因为网易云音乐 NodeJS 版开源 API的登录接口调用不了，所以在判断完验证码是否正确之后，直接调用getLoginUser()函数，在api/home.js里
export function getLoginUser(){
    return service({
        method:"GET",
        url:`/user/detail?uid=1443539***`
    })
}

uid直接写死了自己网易云音乐账号的id，查询方法在我的-设置-账号与安全-顶部ID