
//import router from './urlManger.js'


const proccess = {
    init(router) {
        //this.$router = router
        this.$proccess =  $('.progress-track')
        this.$proccessBar = $('.progress-bar')
        this.$albumMask = $('.gallery-list__mask')
        this.$albumCenterBox = $('.gallery-list__centering')
        this.$albumContainer = $('.album-container')
        this.$arrowLeft = $('.arrow-button--left')
        this.$arrowRight = $('.arrow-button--right')
        this.$backButton = $('.gallery-list-button')
        this.$albumStrip = $('.album-strip')
        this.$galleryList = $('.gallery-list')
        

        this.$albumShowSlider = $('.album-slideshow-container')



        this.$labelDom = $('.home-list-label')
        this.$homeMenuChilds  = $('.home-button-text')


        this.duration = 1
        this.delay = 0.05
        this.minDurarion = 0.5
        this.currentSliderIndex = 1
        this.albumIsSlide = false
        this.toggleBarLeftDesc = 2

        this.initalProY =  parseInt( this.$proccess.css('top') ) + this.$proccess.outerHeight(true)
        this.initalArrow = parseInt( this.$arrowLeft.css('margin-top') )
        this.initalBack = parseInt( this.$backButton.css('top') ) + this.$backButton.outerHeight(true)


        
        this.$arrowLeft.addClass('inactive')

        TweenMax.set(this.$proccess,{
            y:- this.initalProY,
            ease:Quad.easeInOut
        })

        TweenMax.set(this.$backButton,{
            y:- this.initalBack,
            ease:Quad.easeInOut
        })

        TweenMax.set([this.$arrowLeft, this.$arrowRight],{
            y:-this.initalArrow,
            ease:Quad.easeInOut
        })

        TweenMax.set(this.$albumStrip,{
            opacity: 0,
            display:'block'
        })


        


        setTimeout(()=>{
            this.clickProccess()
            this.clickArrowLeft()
            this.clickArrowRight()
            this.leave()
        },20)
    },
    show() {
        this.chidsLen = this.$albumStrip.children().length
        

        this.proccessWidth = this.$proccess.width()
        this.proccessBarWidth = this.proccessWidth / this.chidsLen

        this.$proccessBar.css({
            width: this.proccessBarWidth + 'px'
        })
        

        TweenMax.staggerTo([this.$arrowLeft, this.$arrowRight],this.duration,{
            y:0,
            ease:Quad.easeInOut
        },this.delay)

        TweenMax.to(this.$proccess,this.duration,{
            y:0,
            ease:Quad.easeInOut
        })

        TweenMax.set(this.$albumStrip,{
            opacity: 1,
            display: 'block'
        })


        TweenMax.to(this.$backButton,this.duration,{
            y:0,
            ease:Quad.easeInOut
        })

        this.albumContainerArr = []

        let childs = this.$albumStrip.children()

        childs.each((index, item) => {
            this.albumContainerArr.push(parseInt( $(item).css('left') ) )
        })

        
    },
    leave() {
        this.$backButton.click(() => {
            this.homePageEnter()
        })
    },
    navSliderEnter() {
        
    },
    homePageEnter() {
        //this.$router.push('', '')
        TweenMax.to([this.$arrowLeft, this.$arrowRight],this.minDurarion,{
            y:-this.initalArrow,
            ease:Quad.easeInOut
        })

        TweenMax.to(this.$proccess,this.minDurarion,{
            y:- this.initalProY,
            ease:Quad.easeInOut
        })

        TweenMax.to(this.$backButton,this.minDurarion,{
            y:-this.initalBack,
            ease:Quad.easeInOut
        })

        

        TweenMax.to(this.$albumCenterBox,this.duration,{
            x:0,
            ease:Quad.easeInOut,
            delay:this.minDurarion
        })

        TweenMax.to(this.$galleryList,this.duration,{
            x:document.documentElement.clientWidth,
            ease:Quad.easeInOut,
            delay:this.minDurarion
        })
        
        
        

        TweenMax.to(this.$albumMask,this.duration ,{
            x:0,
            ease:Quad.easeInOut,
            delay:this.minDurarion,
            onComplete:(() =>{
                
                this.$albumShowSlider.css({
                    display:'block'
                })
                this.$albumContainer.css({
                    width: this.$albumShowSlider.width()
                })

                this.$albumStrip.css({
                    opacity: 0,
                    display:'none',
                    width: 0
                })
                
                let len = this.$homeMenuChilds.length

                for (let i = 0; i <= len; i++) {
                    TweenMax.to($(this.$homeMenuChilds[i]), this.duration, {
                        x: 0,
                        delay: this.delay * i,
                        ease: Quad.easeInOut
                    })
                }

                TweenMax.to(this.$labelDom, this.minDurarion, {
                    x: 0,
                    ease: Quad.easeInOut,
                    delay: this.minDurarion,
                    onComplete:() => {
                        TweenMax.to(this.$albumMask,this.duration ,{
                            x:- this.$albumShowSlider.width(),
                            ease:Quad.easeInOut,
                        })
                    }
                })
            })
        })
    },
    clickProccess() {
        

        this.$proccess.click(e => {
            console.log(document.getElementsByClassName('progress-track')[0].getBoundingClientRect())
            let scrollLeft = document.getElementsByClassName('progress-track')[0].getBoundingClientRect().x
            let clickPX = e.clientX - scrollLeft
            let positionArr = []
            let len = this.proccessWidth / this.proccessBarWidth
            let clickIndex = 0
            for(let i = 0;i <= len;i++) {
                positionArr.push( this.proccessBarWidth * i )
            }

            for(let i = 0; i < positionArr.length; i++) {
                if(positionArr[i] > clickPX ) {
                    clickIndex = i - 1
                    break;
                }
            }
            

            

            TweenMax.to(this.$proccessBar, 1, {
                x: positionArr[clickIndex],
                ease:Quad.easeInOut
            })
            

            

            TweenMax.to(this.$albumContainer, 1, {
                x: -this.albumContainerArr[clickIndex],
                ease:Quad.easeInOut,
                onComplete:(()=>{
                   let index =  this.albumContainerArr.indexOf(this.albumContainerArr[clickIndex])
                    console.log(index == 0)
                    console.log(index == this.albumContainerArr.length - 1)
                   if(index == 0) {
                       this.$arrowLeft.addClass('inactive')
                       this.$arrowRight.removeClass('inactive')
                   }else if(index == this.albumContainerArr.length - 1){
                        this.$arrowLeft.removeClass('inactive')
                        this.$arrowRight.addClass('inactive')
                   }else {
                        this.$arrowLeft.removeClass('inactive')
                        this.$arrowRight.removeClass('inactive')
                   }
                })
            })
        })
    },
    toggleProcessBar(index,type) {
        if(type == 'right') {
            TweenMax.to(this.$proccessBar, 1, {
                x: this.proccessBarWidth * index,
                ease:Quad.easeInOut,
                onComplete:() => {
                    console.log(this.proccessWidth - (this.proccessBarWidth * this.toggleBarLeftDesc),'1234')

                }
            })


        }else {
            TweenMax.to(this.$proccessBar, 1 ,{
                x: this.proccessWidth - (this.proccessBarWidth * this.toggleBarLeftDesc),
                ease:Quad.easeInOut,
                onComplete:() => {
                    console.log(this.proccessWidth - (this.proccessBarWidth * this.toggleBarLeftDesc),'1234')
                    return this.toggleBarLeftDesc =  this.toggleBarLeftDesc + 1
                }
            })
        }
    },
    clickArrowLeft() {
        this.$arrowLeft.click((e) => {    

            if(this.currentSliderIndex > 1) {
                if(this.albumIsSlide) return
                console.log(this.currentSliderIndex,'clickArrowLeft')
                this.albumIsSlide = true

                this.toggleProcessBar(this.currentSliderIndex,'left')

                let transformX = parseInt( this.$albumStrip.children().eq(this.currentSliderIndex - 2).css('left') ) 

                this.albumLeftSlider = TweenMax.to(this.$albumContainer,1,{
                    x: -transformX,
                    ease:Quad.easeInOut,
                    onComplete: () => {
                        if(this.currentSliderIndex == 2){
                            this.toggleBarLeftDesc = 2
                            this.$arrowLeft.addClass('inactive')
                        }else if(this.currentSliderIndex == 6){
                            this.$arrowRight.removeClass('inactive')
                        }
                        return this.currentSliderIndex = this.currentSliderIndex - 1,this.albumIsSlide = false
                    }
                })
            }
            
        })
    },
    clickArrowRight() {
        this.$arrowRight.click((e) => {

            if(this.currentSliderIndex < this.chidsLen) {
                if(this.albumIsSlide) return
                console.log(this.currentSliderIndex,'clickArrowRight')
                this.toggleProcessBar(this.currentSliderIndex,'right')
                this.albumIsSlide = true

                let transformX = parseInt( this.$albumStrip.children().eq(this.currentSliderIndex).css('left') ) 

                this.albumLeftSlider = TweenMax.to(this.$albumContainer,1,{
                    //webkitTransform: `translate3d(${-transformX}px,0,0)`,
                    x: -transformX,
                    ease:Quad.easeInOut,
                    onComplete: () => {
                        if(this.currentSliderIndex == 1 ) {
                            this.$arrowLeft.removeClass('inactive')
                        }else if(this.currentSliderIndex == this.chidsLen -1){
                            this.$arrowRight.addClass('inactive')
                        }
                        return this.currentSliderIndex = this.currentSliderIndex + 1,this.albumIsSlide = false
                    }
                })
            }
        })
    },
    update() {

    }
}



export default proccess