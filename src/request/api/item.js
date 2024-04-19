import service from '..'

//获取歌单详情页的数据
export function getMusicItemList(id){
    return service({
        method:'Get',
        url:`/playlist/detail?id=${id}`
    })
}

//获取歌单的所有歌曲
export function getItemList(id){
    return service({
        method:'Get',
        url:`/playlist/track/all?id=${id}&limit=20&offset=0`
    })
}

//获取歌词
export function getMusicLyric(id){
    return service({
        method:'Get',
        url:`/lyric?id=${id}`
    })
}

