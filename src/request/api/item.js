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

//音乐是否可用
export function getMusicPlay(id){
    return service({
        method:'Get',
        url:`/check/music?id=${id}`
    })
}

//歌曲评论
export function getSongComments(id){
    return service({
        method:'Get',
        url:`/comment/music?id=${id}&limit=20`
    })
}