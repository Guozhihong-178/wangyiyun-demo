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
