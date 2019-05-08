//动画库
import {
    TweenMax,
    Power2,
    TimelineLite
} from "gsap/TweenMax";
import homeAlbum from './homeAlbum.js'
import UrlManger from './UrlManger.js'


let html = document.documentElement;
let wH = html.clientHeight; // 窗口宽度
let wW = html.clientWidth;

let menuShowing = false


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

//菜单打开动画进行时防止再次点击
let menuIsMove = false

//首页菜单栏防止多次点击
let homeMenuIsMove = false

let router

if(!router) {
    router = new UrlManger()
}

const main = {
    data() {
        return {
            menuTextX: 200
        }
    },
    setData(opt) {
        Object.keys(opt).forEach(item => {
            this.data[item] = opt[item]
        })

    },
    resize(callback) {
        return $(window).on('resize', function () {
            callback && callback()
        })
    },
    matchData(index) {

    },
    initRightPriview(galleryList, galleryMask, albumContainer, slidLabel) {
        let transformX = albumContainer.width()

        TweenMax.set(galleryList, {
            x: this.data.windowW
        })

        this.galleryMaskEnter = TweenMax.to(galleryMask, 1, {
            x: -transformX,
            ease: Quad.easeInOut
        })

        TweenMax.set(galleryList, {
            x: this.data.windowW
        })

        //点击label跳转动画
        this.data.albumShowTranformX = (this.data.windowW / 2) + (transformX / 2) // list起始位置为中心

        slidLabel.click(() => {
            this.homeAlbumEnter = homeAlbum.enter(this.data.albumShowTranformX)

            // 菜单左滑
            for (let i = 0; i <= this.data.menuLen; i++) {
                TweenMax.to($(this.data.menuChild[i]), this.data.menuSliderTime, {
                    x: -this.data.homeMenuXlist[i],
                    delay: this.data.homeMenuDelay * i,
                    ease: Quad.easeInOut
                })
            }

            this.labelDomLeave.restart()

            router.push(this.data.MenuHoverIndex, menuMap[this.data.MenuHoverIndex])
        })
    },
    HomeMenuEvent(parent, chlids, albumContainer, slidLabel, labelDom) {
        this.setData({
            homeMenuDelay: 0.05,
            MenuHoverIndex: 0,
            labelDom: labelDom
        })
        //初始化菜单动画
        let len = chlids.length - 1
        this.setData({
            homeMenuXlist: [],
            menuSliderTime: 0.7,
            menuLen: chlids.length - 1,
            menuChild: chlids
        })

        this.labelDomLeave = TweenMax.set(labelDom, {
            x: -300
        })

        TweenMax.to(labelDom, this.data.menuSliderTime, {
            x: 0,
            ease: Quad.easeInOut,
            delay: 0.5
        })

        chlids.each((index, item) => {
            this.data.homeMenuXlist.push($(item).parent().outerWidth(true) + 50)
        })

        for (let i = 0; i <= len; i++) {
            TweenMax.set($(chlids[i]), {
                x: -this.data.homeMenuXlist[i]
            })
        }

        for (let i = 0; i <= len; i++) {
            TweenMax.to($(chlids[i]), this.data.menuSliderTime, {
                x: 0,
                delay: this.data.homeMenuDelay * i,
                ease: Quad.easeInOut
            })
        }

        parent.click(e => {
            if (homeMenuIsMove) return

            homeMenuIsMove = true

            this.data.MenuHoverIndex = $(e.target).parent().index()

            TweenMax.to(labelDom, this.data.menuSliderTime, {
                x: -300
            })



            this.homeAlbumEnter = homeAlbum.enter(this.data.albumShowTranformX)

            if (this.data.MenuHoverIndex === 0) { // 动画延迟从头开始
                for (let i = 0; i <= len; i++) {
                    TweenMax.to($(chlids[i]), this.data.menuSliderTime, {
                        x: -this.data.homeMenuXlist[i],
                        delay: this.data.homeMenuDelay * i,
                        ease: Quad.easeInOut
                    })
                }
            } else if (0 > this.data.MenuHoverIndex < len) { // 动画延迟从中间开始
                let left = [],
                    right = [],
                    leftXlist = [],
                    rightXlist = []

                TweenMax.to($(chlids[this.data.MenuHoverIndex]), this.data.menuSliderTime, {
                    x: -this.data.homeMenuXlist[this.data.MenuHoverIndex],
                    delay: 0,
                    ease: Quad.easeInOut
                })

                for (let i = 0; i <= len; i++) {
                    if (i < this.data.MenuHoverIndex) {
                        left.push($(chlids[i]))
                        leftXlist.push(this.data.homeMenuXlist[i])
                    } else if (i > this.data.MenuHoverIndex) {
                        right.push($(chlids[i]))
                        rightXlist.push(this.data.homeMenuXlist[i])
                    }
                }

                for (let i = 0; i < right.length; i++) {
                    TweenMax.to(right[i], this.data.menuSliderTime, {
                        x: -rightXlist[i],
                        delay: this.data.homeMenuDelay * (i + 1),
                        ease: Quad.easeInOut
                    })
                }

                left.reverse()
                leftXlist.reverse()
                for (let l = 0; l < left.length; l++) {
                    TweenMax.to(left[l], this.data.menuSliderTime, {
                        x: -leftXlist[l],
                        delay: this.data.homeMenuDelay * (l + 1),
                        ease: Quad.easeInOut
                    })
                }

                homeMenuIsMove = true

            } else if (this.data.MenuHoverIndex === len) { // 动画延迟从末尾开始
                for (let i = len; i >= 0; i--) {
                    TweenMax.to($(chlids[i]), this.data.menuSliderTime, {
                        x: -this.data.homeMenuXlist[i],
                        delay: this.data.homeMenuDelay * Math.abs(i - len),
                        ease: Quad.easeInOut
                    })
                }
            }
        })


        //菜单悬停切换右侧图片
        parent.mouseover((e) => {
            this.data.MenuHoverIndex = $(e.target).parent('.home-button').index()

            if (this.data.MenuHoverIndex < 0) return
            albumContainer
                .find('.show')
                .removeClass('show')

            albumContainer.children()
                .eq(this.data.MenuHoverIndex)
                .addClass('show')

            homeAlbum.hideLabel()
            homeAlbum.showLabel()

            slidLabel.html(getTip(this.data.MenuHoverIndex))
        })
    },
    menuButtonEvent(menuButton, menuBg, menuPage, menuTxtBox, menuMask) {
        this.setData({
            showMenu: false,
            MenuTime: 0.4,
            menuDelay: .5,
            menuShowing: false
        })

        

        TweenMax.set(menuMask, {
            opacity: 0
        })

        // 菜单按钮设置初始位置
        TweenMax.set(menuButton.children().eq(0), {
            width: '22px',
            y: 8,
            x: 3
        })

        TweenMax.set(menuButton.children().eq(1), {
            width: '22px',
            y: 13,
            x: 3
        })

        TweenMax.set(menuButton.children().eq(2), {
            width: '22px',
            y: 18,
            x: 3
        })

        //菜单文字初始状态
        TweenMax.set(menuTxtBox, {
            opacity: 0,
            x: -200
        })

        menuButton.mousemove(() => {
            if (this.data.showMenu) return
            TweenMax.to(menuButton.children().eq(0), this.data.MenuTime, {
                y: 6
            })

            TweenMax.to(menuButton.children().eq(2), this.data.MenuTime, {
                y: 20
            })
        })


        menuButton.mouseleave(() => {
            if (this.data.showMenu) return

            TweenMax.to(menuButton.children().eq(0), this.data.MenuTime, {
                y: 8
            })

            TweenMax.to(menuButton.children().eq(2), this.data.MenuTime, {
                y: 18
            })
        })

        // 点击按钮打开菜单
        menuButton.click(() => {
            if (menuIsMove) return

            this.setData({
                showMenu: !this.data.showMenu
            })

            menuIsMove = true

            if (this.data.showMenu) {
                
                menuButton.children('.menu-button__line ').css({
                    'background-color': '#fff'
                })


                TweenMax.to(menuMask, this.data.MenuTime,{
                    opacity: 1
                })

                TweenMax.to(menuButton.children().eq(0), this.data.MenuTime, {
                    rotation: 45,
                    delay: this.data.MenuTime
                }, this.data.MenuTime)

                TweenMax.to(menuButton.children().eq(1), this.data.MenuTime, {
                    width: 0
                })

                TweenMax.to(menuButton.children().eq(2), this.data.MenuTime, {
                    rotation: -45,
                    delay: this.data.MenuTime
                }, this.data.MenuTime)

                TweenMax.to(menuBg, this.data.MenuTime, {
                    width: '100%'
                })

                menuPage.css({
                    display: 'block'
                })

                TweenMax.to(menuTxtBox, 1, {
                    opacity: 1,
                    x: 0,
                    delay: this.data.menuDelay,
                    onComplete: function () {
                        return menuIsMove = false
                    }
                })

                menuTxtBox.css({
                    'pointer-events': 'auto'
                })
            } else {

                TweenMax.to(menuMask, 1, {
                    opacity: 0
                })

                menuButton.children('.menu-button__line ').css({
                    'background-color': '#005479'
                })
                TweenMax.to(menuButton.children().eq(0), this.data.MenuTime, {
                    rotation: 0,

                }, this.data.MenuTime)

                TweenMax.to(menuButton.children().eq(1), this.data.MenuTime, {
                    width: '22px',
                    delay: this.data.MenuTime
                })

                TweenMax.to(menuButton.children().eq(2), this.data.MenuTime, {
                    rotation: 0
                }, this.data.MenuTime)

                TweenMax.to(menuBg, this.data.MenuTime, {
                    width: 0,
                    delay: this.data.menuDelay
                })

                setTimeout(() => {
                    menuPage.css({
                        display: 'none'
                    })
                }, 1000)

                TweenMax.to(menuTxtBox, 1, {
                    opacity: 0,
                    x: -200,
                    onComplete: function () {
                        return menuIsMove = false
                    }
                })

                menuTxtBox.css({
                    'pointer-events': 'none'
                })
            }
        })
    }
}

export default main