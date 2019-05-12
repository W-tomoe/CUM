//import router from './urlManger.js'
//封装一个函数用于获取鼠标坐标
function getPos(ev) {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    return {
        x: ev.clientX + scrollLeft,
        y: ev.clientY + scrollTop
    };
}


const toggleProcessBar = (index, type) => {
    let $proccessBar = $('.progress-bar')
    let $process = $('.progress-track')
    let proccessBarWidth = $proccessBar.outerWidth(true)
    let chidsLen = $('.album').length
    let proccessWidth = $process.outerWidth(true)

    if(index == 0) {
        $('.arrow-button--left').addClass('inactive')
    }

    if(index > 0) {
        $('.arrow-button--left').removeClass('inactive')
    }

    if(index == chidsLen - 1) {
        $('.arrow-button--right').addClass('inactive')
    }
    if(index < chidsLen - 1) {
        $('.arrow-button--right').removeClass('inactive')
    }

    if (type == 'right') {
        TweenMax.to($proccessBar, 1, {
            x: proccessBarWidth * index,
            ease: Quad.easeInOut,
            onComplete: () => {
            }
        })
    } else {
        TweenMax.to($proccessBar, 1, {
            x: proccessBarWidth * index,
            ease: Quad.easeInOut,
            onComplete: () => {

            }
        })

        
    }
}


let scroll = 0
let canScrollRight = true
let canScrollLeft = false
let scrollL = 0
let scrollR = 0

const proccess = {
    init(router) {
        //this.$router = router
        this.$proccess = $('.progress-track')
        this.$proccessBar = $('.progress-bar')
        this.$galleryMask = $('.gallery-list__mask')
        this.$albumCenterBox = $('.gallery-list__centering')
        this.$albumContainer = $('.album-container')
        this.$arrowLeft = $('.arrow-button--left')
        this.$arrowRight = $('.arrow-button--right')
        this.$backButton = $('.gallery-list-button')

        this.$galleryList = $('.gallery-list')


        this.$albumShowSlider = $('.album-slideshow-container')



        this.$labelDom = $('.home-list-label')
        this.$homeMenuChilds = $('.home-button-text')





        this.duration = 1
        this.delay = 0.05
        this.minDurarion = 0.5
        window.currentSliderIndex =  this.currentSliderIndex = 0


        this.isBacking = false

        this.initalProY = parseInt(this.$proccess.css('top')) + this.$proccess.outerHeight(true)
        this.initalArrow = parseInt(this.$arrowLeft.css('margin-top'))
        this.initalBack = parseInt(this.$backButton.css('top')) + this.$backButton.outerHeight(true)



        this.$arrowLeft.addClass('inactive')

        TweenMax.set(this.$proccess, {
            y: -this.initalProY,
            ease: Quad.easeInOut
        })

        TweenMax.set(this.$backButton, {
            y: -this.initalBack,
            ease: Quad.easeInOut
        })

        TweenMax.set([this.$arrowLeft, this.$arrowRight], {
            y: -this.initalArrow,
            ease: Quad.easeInOut
        })



        

        this.clickProccess()
        this.clickArrowLeft()
        this.clickArrowRight()
        this.leave(this.$backButton)
        this.leave($('.logo'))
        this.sliderProduct()
        //this.clickAlbum()
        //this.dragProccessBar()

        this.addMouseWheelHandler()
        
        window.toggleProcessBar =  toggleProcessBar()
    },
    show() {
        window.showNavSlider = true

        this.$albumStrip = $('.album-strip')
        window.albumContainerArr = this.albumContainerArr = []

        let childs = this.$albumStrip.children()

        childs.each((index, item) => {
            this.albumContainerArr.push(parseInt($(item).css('left')))
        })

        this.chidsLen = this.$albumStrip.children().length


        this.proccessWidth = this.$proccess.width()
        this.proccessBarWidth = this.proccessWidth / this.chidsLen
        this.toggleBarLeftDesc = this.chidsLen
        this.$proccessBar.css({
            width: this.proccessBarWidth + 'px'
        })


        TweenMax.set(this.$albumStrip, {
            opacity: 1,
            display: 'block'
        })

        TweenMax.to([this.$arrowLeft, this.$arrowRight], this.duration, {
            y: 0,
            ease: Quad.easeInOut,
            delay: 1
        })

        TweenMax.to(this.$backButton, this.duration, {
            y: 0,
            ease: Quad.easeInOut,
            delay: 1
        })

        TweenMax.to(this.$proccess, this.duration, {
            y: 0,
            ease: Quad.easeInOut,
            delay: 1,
            onComplete: () => {
                this.clickAlbum()
            }
        })
    },
    leave(dom) {
        dom.click(() => {
            if(!window.showNavSlider) return
            if (this.isBacking) return

            

            this.isBacking = true

            TweenMax.killTweensOf([this.$arrowLeft,this.$arrowRight,this.$proccess,this.$backButton])

            this.homePageEnter()
        })
    },
    homePageEnter() {
        let that = this

        this.$arrowLeft.addClass('inactive')
        this.$arrowRight.removeClass('inactive')
        this.chidsLen = 0

        TweenMax.to($('.album-strip__name'), 1, {
            x: 150,
            opacity: 0
        })

        TweenMax.set(this.$albumContainer, {
            x: 0
        })

        TweenMax.set(this.$proccessBar, {
            x: 0
        })

        this.currentSliderIndex = 0

        TweenMax.to([this.$arrowLeft, this.$arrowRight], this.minDurarion, {
            y: -this.initalArrow,
            ease: Quad.easeInOut,
            onComplete: () => {
                $('.album-slideshow__label').css({
                    opacity: 1
                })
            }
        })

        TweenMax.to(this.$proccess, this.minDurarion, {
            y: -this.initalProY,
            ease: Quad.easeInOut
        })

        TweenMax.to(this.$backButton, this.minDurarion, {
            y: -this.initalBack,
            ease: Quad.easeInOut
        })



        TweenMax.to(this.$albumCenterBox, this.duration, {
            x: 0,
            ease: Quad.easeInOut,
            delay: this.minDurarion
        })

        TweenMax.to(this.$galleryList, this.duration, {
            x: document.documentElement.clientWidth,
            ease: Quad.easeInOut,
            delay: this.minDurarion
        })




        TweenMax.to(this.$galleryMask, this.duration, {
            x: 0,
            ease: Quad.easeInOut,
            delay: this.minDurarion,
            onComplete: (() => {
                this.isBacking = false

                this.$albumShowSlider.css({
                    display: 'block'
                })
                this.$albumContainer.css({
                    width: this.$albumCenterBox.width()
                })

                this.$albumStrip.css({
                    opacity: 0,
                    display: 'none',
                    width: 0
                })

                $('.album-strip').remove()

                let len = this.$homeMenuChilds.length

                for (let i = 0; i <= len; i++) {
                    TweenMax.to($(this.$homeMenuChilds[i]), this.duration, {
                        x: 0,
                        delay: this.delay * i,
                        ease: Quad.easeInOut,
                        onComplete: () => {
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
                    onComplete: () => {
                        TweenMax.set($('.home-body-bg'), {
                            x: -('.home-body-bg').width,
                            opacity:0.25 
                        })


                        let resizeMainH = window.resizeMainH

                        let resizeMainW = window.resizeMainW

                        let menuWidth = $('.home-list__button').outerWidth(true)


                        that.wW = document.documentElement.clientWidth
                        that.wH = document.documentElement.clientHeight

                        if ((that.wW - (resizeMainW + menuWidth)) < 50) {
                            if (that.wW <= 1460) {
                                TweenMax.to(that.$galleryMask, this.duration, {
                                    x: -600,
                                    ease: Quad.easeInOut
                                })
                            }

                            if (that.wW <= 786) {
                                TweenMax.to(that.$galleryMask, this.duration, {
                                    x: -400,
                                    ease: Quad.easeInOut
                                })
                            }

                            if (that.wW <= 414) {
                                TweenMax.to(that.$galleryMask, this.duration, {
                                    x: 0,
                                    ease: Quad.easeInOut
                                })
                            }

                        } else {
                            TweenMax.to(that.$galleryMask, this.duration, {
                                x: -resizeMainW,
                                ease: Quad.easeInOut
                            })
                        }
                    }
                })
            })
        })
    },
    clickProccess() {

        this.$proccess.click(e => {

            let scrollLeft = $('.progress-track').offset().left

            let clickPX = e.clientX - scrollLeft
            this.positionArr = []
            let len = this.proccessWidth / this.proccessBarWidth
            let clickIndex = 0
            for (let i = 0; i <= len; i++) {
                this.positionArr.push(this.proccessBarWidth * i)
            }

            for (let i = 0; i < this.positionArr.length; i++) {
                if (this.positionArr[i] > clickPX) {
                    clickIndex = i - 1
                    break;
                }
            }

            window.currentSliderIndex = this.currentSliderIndex = clickIndex

            TweenMax.to(this.$proccessBar, 1, {
                x: this.positionArr[clickIndex],
                ease: Quad.easeInOut
            })




            TweenMax.to(this.$albumContainer, 1, {
                x: -this.albumContainerArr[clickIndex],
                ease: Quad.easeInOut,
                onComplete: (() => {
                    let index = this.albumContainerArr.indexOf(this.albumContainerArr[clickIndex])
                    console.log(index == 0)
                    console.log(index == this.albumContainerArr.length - 1)
                    if (index == 0) {
                        this.$arrowLeft.addClass('inactive')
                        this.$arrowRight.removeClass('inactive')
                    } else if (index == this.albumContainerArr.length - 1) {
                        this.$arrowLeft.removeClass('inactive')
                        this.$arrowRight.addClass('inactive')
                    } else {
                        this.$arrowLeft.removeClass('inactive')
                        this.$arrowRight.removeClass('inactive')
                    }
                })
            })
        })
    },
    clickArrowLeft() {
        let that = this
        this.$arrowLeft.click((e) => {

            this.currentSliderIndex = window.currentSliderIndex

            if (this.chidsLen, this.currentSliderIndex >= 1 && this.currentSliderIndex <= this.chidsLen - 1) {

                this.toggleBarLeftDesc = this.toggleBarLeftDesc + 1

                window.currentSliderIndex = this.currentSliderIndex = this.currentSliderIndex - 1

                toggleProcessBar(this.currentSliderIndex, 'left')


                this.albumLeftSlider = TweenMax.to(this.$albumContainer, 1, {
                    x: -this.albumContainerArr[this.currentSliderIndex],
                    ease: Quad.easeInOut,
                    onComplete: () => {

                        
                    }
                })
            }

        })
    },
    clickArrowRight() {
        let that = this

        

        this.$arrowRight.click((e) => {
            console.log(this.currentSliderIndex, this.chidsLen, 'arrowRight')

            this.currentSliderIndex = window.currentSliderIndex
            if (this.currentSliderIndex < this.chidsLen - 1) {

                this.toggleBarLeftDesc = this.toggleBarLeftDesc - 1

                window.currentSliderIndex = this.currentSliderIndex = this.currentSliderIndex + 1

                toggleProcessBar(this.currentSliderIndex, 'right')

                let transformX = parseInt($('.album-strip__album').eq(this.currentSliderIndex).css('left'))


                this.albumLeftSlider = TweenMax.to(this.$albumContainer, 1, {
                    x: -this.albumContainerArr[this.currentSliderIndex],
                    ease: Quad.easeInOut,
                    onComplete: () => {

                    }
                })
            }
        })
    },
    //手机端滑动产品翻页
    sliderProduct() {
        let that = this

        let touchDom = document.getElementsByClassName('main-container')[0]

        touchDom.addEventListener('touchstart', onTouchStart, false);

        touchDom.addEventListener('touchmove', onTouchMove, false);

        touchDom.addEventListener('touchend', onTouchEnd, false);

        let touchStartX,touchStartY, touchEndX,touchEndY, touchDistance;


        function onTouchStart(e) {
            console.log(e, 'start')
            touchStartX = e.touches[0].clientX
            touchStartY = e.touches[0].clientY
        }

        function onTouchMove(e) {
            touchEndX = e.touches[0].clientX
            touchEndY = e.touches[0].clientY

            let touchX = Math.abs( touchEndX - touchStartX )
            let touchY = Math.abs( touchEndY - touchStartY )

            if(!window.showMenuPage) {
                e.preventDefault();
            }

            if(!window.showNavSlider) {
                return false
            }
        }

        function onTouchEnd(e) {
            if(!window.showNavSlider)  return
            if (touchEndX - touchStartX > 0) { //左边滑动

                if (that.currentSliderIndex >= 1 && that.currentSliderIndex <= that.chidsLen - 1) {
                    that.currentSliderIndex = that.currentSliderIndex - 1
                    toggleProcessBar(that.currentSliderIndex, 'left')

                    if (that.currentSliderIndex == 0) {
                        that.$arrowLeft.addClass('inactive')
                        that.$arrowRight.removeClass('inactive')
                    }

                    that.albumLeftSlider = TweenMax.to(that.$albumContainer, 0.5, {
                        x: -that.albumContainerArr[that.currentSliderIndex],
                        ease: Quad.easeInOut,
                        onComplete: () => {

                        }
                    })
                }

            } else { //右边滑动

                if (that.currentSliderIndex < that.chidsLen - 1) {

                    that.currentSliderIndex = that.currentSliderIndex + 1
                    toggleProcessBar(that.currentSliderIndex, 'right')

                    if (that.currentSliderIndex == 1) {
                        that.$arrowLeft.removeClass('inactive')

                    } else if (that.currentSliderIndex == that.chidsLen - 1) {
                        that.$arrowRight.addClass('inactive')
                    }

                    that.albumLeftSlider = TweenMax.to(that.$albumContainer, 0.5, {
                        x: -that.albumContainerArr[that.currentSliderIndex],
                        ease: Quad.easeInOut,
                        onComplete: () => {


                        }
                    })

                }
            }
        }
    },
    /* dragProccessBar() {
        this.tag = false
        let that = this
        let ox = 0,left = 0,bgleft = 0;

        let processW = parseInt( that.$proccess.outerWidth(true) )
        let processL = that.$proccess.offsetLeft
        let barCenterX = parseInt(that.$proccessBar.outerWidth(true)) / 2

        that.$proccess.mousedown((e)=> {

            ox = e.pageX - processL;
            this.tag  = true;
            console.log(e.pageX,processL )
        })

        that.$proccess.mouseup(() => {
            that.tag = false;
        })
        
        that.$proccess.mousemove((e) => {//鼠标移动
            if (this.tag ) {
                left = e.pageX - ox;

                if (left <= 0) {
                    left = 0;
                }else if (left > processW  - barCenterX){
                    left = that.$proccess.outerWidth(true);
                }
                that.$proccessBar.css('left', left);
            } 
        });
    } */
    /* mouseWheelHandler(e) {
        if(!window.showNavSlider) return
        if(window.showMenuPage) return
        var e = e || window.event,
        value = e.wheelDelta || -e.deltaY || -e.detail,
        delta = Math.max(-1, Math.min(1, value));

        let totalWidth =parseInt( $('.album-container').outerWidth(true) )
        let itemWidth = parseInt( $('.album-strip__album').outerWidth(true))
        let processW = parseInt( $('.progress-track').width() ) 
        let barW = parseInt( $('.progress-bar').width() )
        let barLen = processW / barW
        let WHratio = totalWidth / (barW * (barLen - 1)) //总长度和dots条比



        if (delta < 0) { //scrolling down

            if(!canScrollRight) return

            $('.arrow-button--right').removeClass('inactive')
            value = Math.abs(value)

            if(scroll > 0) {
                $('.arrow-button--left').removeClass('inactive')
                canScrollLeft = true
            }


            if(scroll < 0) {
                scroll = 0
                canScrollLeft = false
            }

            if(scroll >= 0) {
                canScrollRight = true
            }

            if(scroll >= totalWidth - itemWidth){
                scroll = totalWidth
                canScrollRight = false
                canScrollLeft = true
                $('.arrow-button--right').addClass('inactive')
            }
            


            TweenMax.to($('.album-container'),0,{
                x: -scroll,
                ease: Quad.easeInOut,
                onComplete: () => {
                    scroll +=  value
                }
            })

            if(scroll >= totalWidth - itemWidth) {
                TweenMax.to($('.progress-bar'),0,{
                    x: barW * (barLen -1),
                    ease: Quad.easeInOut,
                })
            }else {
                TweenMax.to($('.progress-bar'),0,{
                    x: scroll / WHratio,
                    ease: Quad.easeInOut,
                })
            }

            
            console.log(scroll,'right')

        }else {//scrolling up
            
    
            if(scroll <= 0) {
                scroll = 0
                $('.arrow-button--left').addClass('inactive')
                canScrollLeft = false
                canScrollRight = true
                
            }

            if(scroll >= 0) {
                $('.arrow-button--right').removeClass('inactive')
            }

            
            if(scroll >= totalWidth - itemWidth){
                scroll = totalWidth - itemWidth
                canScrollLeft = true
            }


            TweenMax.to($('.album-container'),0,{
                x: - scroll,
                ease: Quad.easeInOut,
                onComplete: () => {
                    if(scroll < 0){ scroll = 0 } else {
                        scroll -=  value
                    }

                    
                }
            })

            if(scroll <= 0) { 
                TweenMax.to($('.progress-bar'),0,{
                    x:0,
                    ease: Quad.easeInOut,
                })
            }else {
                TweenMax.to($('.progress-bar'),0,{
                    x:scroll / WHratio,
                    ease: Quad.easeInOut,
                })
            }

            
            
        }
        
    }, */
    mouseWheelHandler(e) {

        if(!window.showNavSlider) return
        if(window.showMenuPage) return
        var e = e || window.event,
        value = e.wheelDelta || -e.deltaY || -e.detail,
        delta = Math.max(-1, Math.min(1, value));

        



        if (delta < 0) { //scrolling down
            if(window.currentSliderIndex  >= $('.album ').length-1 ){
                return
            }

            window.currentSliderIndex += 1
            toggleProcessBar(window.currentSliderIndex,'right')
            console.log(window.currentSliderIndex,'window.currentSliderIndex')
            TweenMax.to($('.album-container'),0.5, {
                x: -window.albumContainerArr[window.currentSliderIndex],
                ease: Quad.easeInOut,
                onComplete: () => {

                }
            })
        }else {//scrolling up
            if(window.currentSliderIndex <= 0) {
                return
            }

            window.currentSliderIndex -= 1
            toggleProcessBar(window.currentSliderIndex,'left')
            console.log(window.currentSliderIndex,'left')
            TweenMax.to($('.album-container'), 0.5, {
                x: -window.albumContainerArr[window.currentSliderIndex],
                ease: Quad.easeInOut,
                onComplete: () => {
                    if (window.currentSliderIndex == 0) {
                        $('.arrow-button--left').addClass('inactive')
                        $('.arrow-button--right').removeClass('inactive')
                    } else if (window.currentSliderIndex) {

                    }
                }
            })
        }
        
    },
    addMouseWheelHandler(){
        if (document.addEventListener) {
            document.addEventListener('mousewheel', this.mouseWheelHandler, false); //IE9, Chrome, Safari, Oper
            document.addEventListener('wheel', this.mouseWheelHandler, false); //Firefox
            document.addEventListener('DOMMouseScroll', this.mouseWheelHandler, false); //Old Firefox
        } else {
            document.attachEvent('onmousewheel', this.mouseWheelHandler); //IE 6/7/8
        }
    },
    clickAlbum() {
        let that = this
        that.currentSliderIndex
        

        $('.album-strip').on('click',$('.album'),(e) => {
            if($(e.target).parents('.album').length > 0) {
                let clickIndex = $(e.target).parents('.album').index()


                if(clickIndex != that.currentSliderIndex) {

                    that.currentSliderIndex = window.currentSliderIndex = clickIndex

                    if(clickIndex > that.currentSliderIndex){ //右滑动
                        TweenMax.to($('.album-container'),0.7,{
                            x: that.albumContainerArr[clickIndex],
                            ease: Quad.easeInOut,
                        })
                        console.log(that.albumContainerArr[clickIndex],'right')
                        
                        toggleProcessBar(clickIndex,'left')

                    }else{ // 左滑动
                        console.log(-that.albumContainerArr[clickIndex],'left')
                        
                        TweenMax.to($('.album-container'),0.7,{
                            x: - that.albumContainerArr [clickIndex],
                            ease: Quad.easeInOut
                        })

                        toggleProcessBar(clickIndex,'left')
                    }
                }
            }
        })
    }
    
}





//鼠标兼容写法
export default proccess