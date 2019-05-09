

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

    }
}

homeAlbum.getDom()


/* class HomeSlider {
    constructor(){
        this.$slidLabel = $('.album-slideshow__label') 
        this.$slidSpan = $('.album-slideshow__label span')

        this.labelEvent()
    }
    showLabel() {
        TweenMax.to(this.$slidLabel,1,{
            opacity:1,ease:Quad.easeInOut
        })
    }
    hideLabel() {
        TweenMax.set(this.$slidLabel,{
            opacity: 0
        })
    }
    labelEvent() {
        TweenMax.to(this.$slidSpan ,{
            x: -10
        })
    }
} */

export default homeAlbum