
//首页右侧展示
let  homeAlbum =  {
    getDom() {
        this.$slidLabel = $('.album-slideshow__label') 
        this.$galleryList = $('.gallery-list') 
        this.$galleryMask = $('.gallery-list__mask') 
        this.$galleryCentering = $('.gallery-list__centering') 
        this.$albumContainer = $('.album-slideshow-container')

    },
    showLabel() {
        TweenMax.to(this.$slidLabel,1,{
            opacity:1,ease:Quad.easeInOut
        })
    },
    hideLabel() {
        TweenMax.set(this.$slidLabel,{
            opacity: 0
        })
    },
    homeEnter() {
        
    },
    enter(albumShowTranformX,callback) {
        let that = this
        TweenMax.to(this.$galleryList,.8,{
            x:0,
            ease:Quad.easeInOut
        })
        
        let albumEnter = new TweenMax(this.$galleryCentering,.8,{
            x:albumShowTranformX,
            ease:Quad.easeInOut,
            onComplete:function(){
                that.$albumContainer.css({
                    display: 'none'
                })

                callback && callback()
            }
        })
        
        TweenMax.to(this.$galleryMask,.8,{
            x:0,
            ease:Quad.easeInOut
        })

        $('.album-strip').css({
            display:'block'
        })

        window.showNavSlider = false
    }
}

homeAlbum.getDom()


export default homeAlbum