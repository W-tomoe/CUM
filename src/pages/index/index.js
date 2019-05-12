import main from '../../assets/js/main.js'
import Details from '../../assets/js/data.js'
import './index.scss'
//动画库
import {
    TweenMax
} from "gsap/TweenMax";

// 商品图片规格
let  mainImg = {
    height:680,
    width:1100,
    offsetTop: 150,
    offsetBottom: 200
}


let page = {
    init() {
        const that = this
        that.$slidLabel = $('.album-slideshow__label') //首页右侧文字
        that.$menuDom = $('.home-menu-container') // 菜单容器
        that.$homeButton = $('.home-button-text') // 左侧菜单容器
        that.$labelDom = $('.home-list-label') // 首页左侧竖向字体
        that.$albumCenterContainer = $('.gallery-list__centering')
        that.$albumContainer = $('.album-slideshow-container') // 首页右侧商品展示容器
        that.$galleryList = $('.gallery-list') // 右侧商品最外层容器
        that.$galleryMask = $('.gallery-list__mask') // 右侧商品外层mask
        that.$menuButton = $('.menu-button') //菜单按钮
        that.$menuPage = $('.menu') // 菜单
        that.$menuBg = $('.menu-bg') // 菜单背景
        that.$menuMask = $('.menu-tint') // 菜单遮罩层
        that.$logo = $('.logo') // logo
        that.$menuTxtBox = $('.menu-container') //菜单内容容器



        let html = document.documentElement;
        let wH = that.wH = html.clientHeight; // 窗口宽度
        let wW = that.wW = html.clientWidth;

        main.setData({
            windowH: that.wH,
            windowW: that.wW
        })



        that.isPc  = function isPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                        "SymbianOS", "Windows Phone",
                        "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        
        }()
        
        let Homehtml='';
        Details.forEach((item, index)=> {
            
            if(index == 0) {
                Homehtml += `
                    <img src="${item[0].productImg}" class="show">
                `
            }else {
                Homehtml += `
                    <img src="${item[0].productImg}">
                `
            }
        })
        

        Homehtml +=`<div class="album-slideshow__label">
            SEE THE MI ALBUMS
            <span>⟶</span>
        </div>`

        that.$albumContainer.html(Homehtml)


        $('.album-strip').css({
            display:'none'
        })


        setTimeout(() => {
            that.calDom()
            main.menuButtonAndLogoEnter(that.$logo, that.$menuButton)
            // 菜单按钮
            main.menuButtonEvent(that.$menuButton, that.$menuBg, that.$menuPage, that.$menuTxtBox, that.$menuMask)
            //点击菜单动画
            main.HomeMenuEvent(that.$menuDom, that.$homeButton, that.$albumContainer, that.$slidLabel, that.$labelDom)
            that.$homeButton.addClass('active')
            main.initRightPriview(that.$albumContainer, that.$slidLabel)
        }, 20);
    },
    update() {
        let that = this
        return function() {
            that.calDom()
            let html = document.documentElement;
            let wH = that.wH = html.clientHeight; // 窗口宽度
            let wW = that.wW = html.clientWidth;

            //rem单位
            let designSize = 1920; // 设计图尺寸

            let rem = wW * 100 / designSize;
            document.documentElement.style.fontSize = rem + 'px'; 
        }
        

    },
    calDom() {
        const that = this
        // dom极端

        that.$menuDom.css({
            fontSize: that.wH * 0.13 + 'px'
        })


        that.$labelDom.css({
            top: that.wH * 0.5 * 1.7 + 'px'
        })


        

        

        let resizeMainH 
        let resizeMainW 
        let precent = mainImg.width/mainImg.height
        if(that.wW <= 1024 ) {
            
            if(that.wH > that.wW) {
                resizeMainH = mainImg.height = that.wW*.6
                resizeMainW = mainImg.width = resizeMainH * precent
                mainImg.offsetTop = (that.wH  - resizeMainH) / 2

            }else {
                resizeMainH = mainImg.height = that.wH*.5
                resizeMainW = mainImg.width = resizeMainH * precent
                mainImg.offsetTop = (that.wH - (resizeMainH )) / 2
            }
            
            if(that.wH <= 414 &&  that.wW > 414) {
                mainImg.offsetTop = 65

                
            }
            
            $('.album-container').css({
                height: mainImg.height + 'px',
                top: mainImg.offsetTop  + 'px',
                width: 14400 + 'px'
            })
        }else {
            resizeMainH = that.wH - mainImg.offsetTop - mainImg.offsetBottom
            resizeMainW  = (mainImg.width / mainImg.height) * resizeMainH


            $('.album-container').css({
                height: resizeMainH + 'px',
                top: mainImg.offsetTop + 'px',
                width: 14400 + 'px'
            })
        }

        window.resizeMainH = resizeMainH

        window.resizeMainW = resizeMainW

        

        $('.album-slideshow-container').css({
            height: resizeMainH + 'px',
            width: resizeMainW + 'px'
        })


        $('.album-strip__album').css({
            width:resizeMainH + 'px',
            width:resizeMainW + 'px'
        })

        $.each($('.album-strip__album'),(index,item) => {

            $(item).css({
                left:resizeMainW*index * 1.2
            })

            $('.album-container').css({
                width: resizeMainW*index * 1.2
            })
        })

        


        let menuWidth = $('.home-list__button').outerWidth(true)



        if(window.showNavSlider) {
            

            TweenMax.set(that.$galleryList,0,{
                x:0
            })

            TweenMax.set(that.$galleryMask,0,{
                x:0
            })
        
            TweenMax.set(that.$albumCenterContainer,{
                x: (that.wW / 2) - (resizeMainW/2)
            })

            TweenMax.set($('.home-buttom'),0,{
                x: -$('.home-buttom').outerWidth(true)
            })

            
        }else {
            TweenMax.set([this.$galleryList,that.$galleryMask], {
                x: that.wW,
                ease: Quad.easeInOut
            })
    
    
    
            if((that.wW - (resizeMainW + menuWidth)) < 50) {
                if(that.wW <= 1460) {
                    TweenMax.to(that.$galleryMask,1,{
                        x: - 600,
                        ease: Quad.easeInOut
                    })
                }
    
                if(that.wW <= 786) {
                    TweenMax.to(that.$galleryMask,1,{
                        x: - 400,
                        ease: Quad.easeInOut
                    })
                }
    
                if(that.wW <= 414) {
                    TweenMax.to(that.$galleryMask,1,{
                        x: 0,
                        ease: Quad.easeInOut
                    })
                }
    
            }else {
                TweenMax.to(that.$galleryMask,1,{
                    x: - resizeMainW,
                    ease: Quad.easeInOut
                })
            }

            
            if(window.showNavSlider) {

            
                let index = window.currentSliderIndex
        

                console.log($('.album-strip__album').eq(index).left,'left')

                TweenMax.to(that.$galleryMask,1,{
                    x: - $('.album-strip__album').eq(index).left,
                    ease: Quad.easeInOut
                })
            }
        }

        $('.arrow-button--right').css({
            top: that.wH + 'px'
        })
        $('.arrow-button--left').css({
            top: that.wH + 'px'
        })
    },
    homeTouchEvent() {
        let touchDom = document.getElementsByClassName('body')[0]

        touchDom.addEventListener('touchstart', onTouchStart, false);

        touchDom.addEventListener('touchmove', onTouchMove, false);

        touchDom.addEventListener('touchend', onTouchEnd, false);


        function onTouchStart(e) {
            touchStartX = e.touches[0].clientX
            touchStartY = e.touches[0].clientY
        }

        function onTouchMove(e) {
            if(!window.showNavSlider)  return
            
            touchEndX = e.touches[0].clientX
            touchEndY = e.touches[0].clientY

            let touchX = Math.abs( touchEndX - touchStartX )
            let touchY = Math.abs( touchEndY - touchStartY )

            if( touchX >  touchY) {
                e.preventDefault();
            }
        }
    }
}
page.init()
main.resize(page.update())