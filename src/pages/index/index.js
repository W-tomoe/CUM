import resizeRem from '../../assets/js/rem.js'
import main from '../../assets/js/window.js'
import {getClass, getId } from '../../assets/js/dom.js'
import './index.scss'

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
            that.calDom()
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
        let menuDom = that.menuDom = $('.home-menu')
        menuDom.css({
            fontSize: that.wH * 0.12 + 'px'
        })

        // 首页左侧竖向字体
        
        let labelDom = that.labelDom = $('.home-list-label')
        labelDom.css({
            top: that.wH * 0.5 * 1.5 + 'px'
        })

        //  右侧product
        let albumContainer = that.albumContainer = $('.album-slideshow-container')
        albumContainer.css({
            height: 100 * 0.6 + 'vh',
            top: that.wH * 0.2 + 'px',
            width: (1107 / 684) * 100 * 0.6 + 'vh'
        })

        
        that.showMenuPage()
        
    },
    addEvent() {
        let that = this
        let slidLabel = that.slidLabel = $('.album-slideshow__label')

        let hoverIndex = 0
        //菜单悬停切换右侧图片
        $('.home-menu').mouseover((e) => {
            let target = $(e.target)

            let menuChild = $('.home-menu').children()
            
            for(let i = 0; i < menuChild.length; i ++) {
                if($(menuChild[i]).attr('class') === target.attr('class')) {
                    hoverIndex = i
                }
            }

            that.albumContainer
                .find('.show')
                .removeClass('show')
            
            that.albumContainer.children()
                .eq(hoverIndex)
                .addClass('show')
            
            that.slidLabel.html(getTip(hoverIndex))
        })

        //点击label跳转动画
        let timer 

        slidLabel.click(() => {
            if(timer) return
            that.albumContainer.css({right: '500px'})
            timer = setTimeout(() => {
                main.open('../sliderDetail.html')
            },1000)
            
        })

        //  菜单按钮悬停
        let showMenu = that.showMenu = false

        let menuButton = that.menuButton = $('.menu-button')
        menuButton.mousemove(() => {
            if(showMenu) return
            menuButton.children().eq(0).css({
                transform: 'matrix(1, 0, 0, 1, 3, 6)',
                width: '22px'
            })

            menuButton.children().eq(2).css({
                transform: 'matrix(1, 0, 0, 1, 3, 20)',
                width: '22px'
            })
        })

        menuButton.mouseleave(() => {
            if(showMenu) return
            menuButton.children().eq(0).css({
                transform: 'matrix(1, 0, 0, 1, 3, 8)',
                width: '22px'
            })

            menuButton.children().eq(2).css({
                transform: 'matrix(1, 0, 0, 1, 3, 18)',
                width: '22px'
            })
        })

        menuButton.click(() => {
            showMenu = !showMenu

            if(showMenu) {
                menuButton.children('.menu-button__line ').css({'background-color':'#fff'})

                menuButton.children().eq(0).css({
                    transform: 'matrix(0.7071, 0.7071, -0.7071, 0.7071, 7, 5)',
                    width: '22px'
                })

                menuButton.children().eq(1).css({
                    transform: 'matrix(1, 0, 0, 1, 3, 13)',
                    width: 0
                })

                menuButton.children().eq(2).css({
                    transform: 'matrix(0.7071, -0.7071, 0.7071, 0.7071, 7, 20)',
                    width: '22px'
                })
            }else {
                menuButton.children('.menu-button__line ').css({'background-color':'#005479'})
                menuButton.children().eq(0).css({
                    transform: 'matrix(1, 0, 0, 1, 3, 8)',
                    width: '22px'
                })

                menuButton.children().eq(1).css({
                    transform: 'matrix(1, 0, 0, 1, 3, 13)',
                    width: '22px'
                })

                menuButton.children().eq(2).css({
                    transform: 'matrix(1, 0, 0, 1, 3, 18)',
                    width: '22px'
                })
            }
        })
    },
    showMenuPage() {

    }
}

page.init()