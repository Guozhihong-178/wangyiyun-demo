function remSize(){
    const width = document.documentElement.clientWidth || window.innerWidth
    if(width >= 750){
        width = 750
    }
    if(width <= 320){
        width = 320
    }
    document.documentElement.style.fontSize = (width/7.5)+'px'
    document.querySelector('body').style.fontSize = 0.3 + 'rem'
}
remSize()
window.onresize = function(){
    remSize()
}