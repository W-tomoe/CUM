
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
        
        this.$galleryList = $('.gallery-list')
        

        this.$albumShowSlider = $('.album-slideshow-container')



        this.$labelDom = $('.home-list-label')
        this.$homeMenuChilds  = $('.home-button-text')


        


        this.duration = 1
        this.delay = 0.05
        this.minDurarion = 0.5
        this.currentSliderIndex = 0
        this.albumIsSlide = false

        this.isBacking = false

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

    
        this.clickProccess()
        this.clickArrowLeft()
        this.clickArrowRight()
        this.leave()
    },
    show() {
        window.showNavSlider = true

        this.$albumStrip = $('.album-strip')
        this.albumContainerArr = []

        let childs = this.$albumStrip.children()

        childs.each((index, item) => {
            this.albumContainerArr.push(parseInt( $(item).css('left') ) )
        })

        this.chidsLen = this.$albumStrip.children().length
        

        this.proccessWidth = this.$proccess.width()
        this.proccessBarWidth = this.proccessWidth / this.chidsLen
        this.toggleBarLeftDesc = this.chidsLen
        this.$proccessBar.css({
            width: this.proccessBarWidth + 'px'
        })


        TweenMax.set(this.$albumStrip,{
            opacity: 1,
            display: 'block'
        })

        TweenMax.to([this.$arrowLeft, this.$arrowRight],this.duration,{
            y:0,
            ease:Quad.easeInOut,
            delay:  1
        })

        TweenMax.to(this.$backButton,this.duration,{
            y:0,
            ease:Quad.easeInOut,
            delay:1
        })

        TweenMax.to(this.$proccess,this.duration,{
            y:0,
            ease:Quad.easeInOut,
            delay:1
        })
    },
    leave() {
        this.$backButton.click(() => {
            console.log('enter')
            if(this.isBacking) return
            
            this.isBacking = true
            this.homePageEnter()
            
        })
    },
    homePageEnter() {
        //this.$router.push('', '')

        this.$arrowLeft.addClass('inactive')
        this.$arrowRight.removeClass('inactive')
        this.chidsLen = 0

        TweenMax.to($('.album-strip__name') ,1,{
            x: 150,
            opacity: 0
        })

        TweenMax.set(this.$albumContainer ,{
            x: 0
        })

        TweenMax.set(this.$proccessBar, {
            x: 0
        })

        this.currentSliderIndex = 0
        
        TweenMax.to([this.$arrowLeft, this.$arrowRight],this.minDurarion,{
            y:-this.initalArrow,
            ease:Quad.easeInOut,
            onComplete:() => {
                $('.album-slideshow__label').css({
                    opacity:1
                })
            }
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
                this.isBacking = false
                
                this.$albumShowSlider.css({
                    display:'block'
                })
                this.$albumContainer.css({
                    width: this.$albumCenterBox.width()
                })

                this.$albumStrip.css({
                    opacity: 0,
                    display:'none',
                    width: 0
                })

                $('.album-strip').remove()
                
                let len = this.$homeMenuChilds.length

                for (let i = 0; i <= len; i++) {
                    TweenMax.to($(this.$homeMenuChilds[i]), this.duration, {
                        x: 0,
                        delay: this.delay * i,
                        ease: Quad.easeInOut,
                        onComplete:() =>{
                            $('.home-button').css({
                                'pointer-events': 'auto'
                            })
                        }
                    })
                }

                TweenMax.to(this.$labelDom, this.minDurarion, {
                    x: 0,
                    ease: Quad.easeInOut,
                    delay: this.minDurarion,
                    onComplete:() => {
                        TweenMax.set($('.home-body-bg'),{
                            x: -('.home-body-bg').width
                        })

                        
       

                        if($('.body').width()-($('.home-button').outerWidth(true)+$('.album-slideshow-container').width()) <  50) {

                        }else {
                            TweenMax.to(this.$albumMask,this.duration ,{
                                x:- $('.album-slideshow-container').width(),
                                ease:Quad.easeInOut,
                                onComplete: () => {
                                    TweenMax.to($('.home-body-bg'),1,{
                                        x: 0,
                                        opacity: 0.3
                                    })
                                }
                            })
                        }
                    }
                })
            })
        })
    },
    clickProccess() {

        this.$proccess.click(e => {
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
            
            this.currentSliderIndex = clickIndex

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
                    //console.log(this.proccessWidth - (this.proccessBarWidth * this.toggleBarLeftDesc),'1234')

                }
            })


        }else {

            TweenMax.to(this.$proccessBar, 1 ,{
                x: this.proccessWidth - (this.proccessBarWidth * (this.chidsLen - this.currentSliderIndex)),
                ease:Quad.easeInOut,
                onComplete:() => {
                    //console.log(this.proccessWidth - (this.proccessBarWidth * this.toggleBarLeftDesc),'1234')
                    //return this.toggleBarLeftDesc =  this.toggleBarLeftDesc + 1
                }
            })
        }
    },
    clickArrowLeft() {
        this.$arrowLeft.click((e) => {    
        


            if(this.chidsLen,this.currentSliderIndex  >= 1 && this.currentSliderIndex <= this.chidsLen - 1) {
                if(this.albumIsSlide) return
                
                this.albumIsSlide = true
                this.toggleBarLeftDesc = this.toggleBarLeftDesc + 1 
                this.currentSliderIndex = this.currentSliderIndex - 1
                
                this.toggleProcessBar(this.currentSliderIndex,'left')
                console.log(this.currentSliderIndex,this.chidsLen,'left')

                this.albumLeftSlider = TweenMax.to(this.$albumContainer,1,{
                    x: -this.albumContainerArr[this.currentSliderIndex],
                    ease:Quad.easeInOut,
                    onComplete: () => {
                        
                        if(this.currentSliderIndex == 0){
                            this.$arrowLeft.addClass('inactive')
                            this.$arrowRight.removeClass('inactive')
                        }else if(this.currentSliderIndex){
                            
                        }
                        return this.albumIsSlide = false
                    }
                })
            }
            
        })
    },
    clickArrowRight() {
        this.$arrowRight.click((e) => {
            console.log(this.currentSliderIndex , this.chidsLen,'arrowRight')
            if(this.currentSliderIndex < this.chidsLen - 1) {
                if(this.albumIsSlide) return
                this.toggleBarLeftDesc = this.toggleBarLeftDesc  - 1
                this.currentSliderIndex = this.currentSliderIndex + 1
                this.toggleProcessBar(this.currentSliderIndex,'right')
                console.log(this.currentSliderIndex,'clickArrowRight')
                this.albumIsSlide = true

                let transformX = parseInt( $('.album-strip__album').eq(this.currentSliderIndex).css('left') ) 


                this.albumLeftSlider = TweenMax.to(this.$albumContainer,1,{
                    x: -this.albumContainerArr[this.currentSliderIndex],
                    ease:Quad.easeInOut,
                    onComplete: () => {
                        if(this.currentSliderIndex == 1 ) {
                            this.$arrowLeft.removeClass('inactive')
                            
                        }else if(this.currentSliderIndex == this.chidsLen -1){
                            this.$arrowRight.addClass('inactive')
                            /* this.$arrowRight.addClass('inactive').css({
                                'pointer-events': "none"
                            }) */
                        }
                        return this.albumIsSlide = false
                    }
                })
            }
        })
    },
    update() {

    }
}



export default proccess