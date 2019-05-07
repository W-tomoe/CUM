import resizeRem from '../../assets/js/rem.js'
import main from '../../assets/js/window.js'
import {getClass, getId } from '../../assets/js/dom.js'
import './index.scss'
//动画库
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";

resizeRem()



const menuMap = [
    'DO',
    'RE',
    'MI',
    'FA',
    'SO',
    'LA',
    'TI',
]

let getTip = function (index) {
    return `SEE THE ${menuMap[index]} ALBUMS <span>⟶</span>`
}

let page = {
    init() {
        const that = this
        let html = document.documentElement;
        let wH = that.wH = html.clientHeight;// 窗口宽度
        let wW = that.wW = html.clientWidth; 

        window.onresize = () => {
            //rem单位
            let designSize = 1920; // 设计图尺寸
            let html = document.documentElement;
            
            let rem = wW * 100 / designSize;
            document.documentElement.style.fontSize = rem + 'px';
        }

        that.calDom()

        setTimeout(() => {
            that.addEvent()
        }, 20);
    },
    addAnimation() {

    },
    calDom() {
        const that = this
        // dom极端
        let menuDom = that.$menuDom = $('.home-menu-container')
        that.$menuDom.css({
            fontSize: that.wH * 0.12 + 'px'
        })

        // 首页左侧竖向字体
        
        that.$labelDom = $('.home-list-label')
        that.$labelDom.css({
            top: that.wH * 0.5 * 1.6 + 'px'
        })

        //  右侧product
        let albumContainer = that.$albumContainer = $('.album-slideshow-container')
        albumContainer.css({
            height: 100 * 0.6 + 'vh',
            top: that.wH * 0.2 + 'px',
            width: (1107 / 684) * 100 * 0.6 + 'vh'
        })

        
        that.showMenuPage()
        
    },
    addEvent() {
        let that = this
        that.$slidLabel = $('.album-slideshow__label')


        let hoverIndex = 0
        //菜单悬停切换右侧图片
        that.$menuDom.mouseover((e) => {
            let target = $(e.target)

            let menuChild = that.$menuDom.children()
            
            for(let i = 0; i < menuChild.length; i ++) {
                if($(menuChild[i]).attr('class') === target.attr('class')) {
                    hoverIndex = i
                }
            }

            that.$albumContainer
                .find('.show')
                .removeClass('show')
            
            that.$albumContainer.children()
                .eq(hoverIndex)
                .addClass('show')
            
            that.$slidLabel.html(getTip(hoverIndex))
        })

        //点击label跳转动画
        let timer 

        that.$slidLabel.click(() => {
            if(timer) return
            that.$albumContainer.css({right: '500px'})
            /* timer = setTimeout(() => {
                main.open('../sliderDetail.html')
            },1000) */
            
        })

        //  菜单按钮悬停
        let showMenu = that.showMenu = false //是否显示主菜单
        let menuButton = that.$menuButton = $('.menu-button')
        let menuPage = that.$menuButton = $('.menu')
        let menuBg = that.$menuButton = $('.menu-bg')
        let MenuTime = 0.4 // 菜单按钮动画时间

        //设置初始位置
        TweenMax.set(menuButton.children().eq(0),{
            width:'22px',
            y: 8,
            x: 3
        })

        TweenMax.set(menuButton.children().eq(1),{
            width:'22px',
            y: 13,
            x: 3
        })

        TweenMax.set(menuButton.children().eq(2),{
            width:'22px',
            y: 18,
            x: 3
        })


        menuButton.mousemove(() => {
            if(showMenu) return
            TweenMax.to(menuButton.children().eq(0), MenuTime, {
                y: 6
            })
    
            TweenMax.to(menuButton.children().eq(2), MenuTime, {
                y: 20
            })
        })

        
        menuButton.mouseleave(() => {
            if(showMenu) return

            TweenMax.to(menuButton.children().eq(0), MenuTime, {
                y: 8
            })
    
            TweenMax.to(menuButton.children().eq(2), MenuTime, {
                y: 18
            })
        })

        // 点击按钮打开菜单
        menuButton.click(() => {
            showMenu = !showMenu
            
            if(showMenu) {
                menuButton.children('.menu-button__line ').css({'background-color':'#fff'})

                TweenMax.to(menuButton.children().eq(0),MenuTime,{
                    rotation:45,
                    delay: MenuTime
                },MenuTime)

                TweenMax.to(menuButton.children().eq(1),MenuTime,{
                    width: 0
                })

                TweenMax.to(menuButton.children().eq(2),MenuTime,{
                    rotation:-45,
                    delay: MenuTime
                },MenuTime)

                TweenMax.to(menuBg,MenuTime,{
                    width:'100%'
                })
                
                menuPage.css({
                    display: 'block'
                })
            }else {
                menuButton.children('.menu-button__line ').css({'background-color':'#005479'})
                TweenMax.to(menuButton.children().eq(0),MenuTime,{
                    rotation:0,
                    
                },MenuTime)

                TweenMax.to(menuButton.children().eq(1),MenuTime,{
                    width: '22px',
                    delay: MenuTime
                })

                TweenMax.to(menuButton.children().eq(2),MenuTime,{
                    rotation:0
                },MenuTime)

                TweenMax.to(menuBg,MenuTime,{
                    width:0
                })

                menuPage.css({
                    display: 'none'
                })
            }
        })
    },
    showMenuPage() {

    }
}

page.init()