
import homeAlbum from './homeAlbum.js'

import Details from '../../assets/js/data.js'

import process from './process.js'


let html = document.documentElement;
let wH = html.clientHeight; // 窗口宽度
let wW = html.clientWidth;






const menuMap = [
    'DO',
    'RE',
    'MI',
    'FA',
    'SO',
    'LA',
    'TI',
]

const menuHoverTip = [
    'Vision,Mission,&Christians Morality',
    'Vision,Mission,&Christians Morality',
    'Vision,Mission,&Christians Morality',
    'Vision,Mission,&Christians Morality',
    'Vision,Mission,&Christians Morality',
    'Vision,Mission,&Christians Morality',
    'Vision,Mission,&Christians Morality',
]

let getTip = function (index) {
    return `SEE THE ${menuMap[index]} ALBUMS <span>⟶</span>`
}

//菜单打开动画进行时防止再次点击
let menuIsMove = false

//首页菜单栏防止多次点击
let homeMenuIsMove = false

/* let router

if(!router) {
    router = new UrlManger()
} */

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
    initRightPriview(albumContainer, slidLabel) {
        

        process.init()

        let transformX = albumContainer.width()

        //点击首页右侧商品跳转动画
        this.data.albumShowTranformX = (this.data.windowW / 2) - (transformX / 2) // list起始位置为中心
        
        albumContainer.click(() => {
                
                this.homeAlbumEnter = homeAlbum.enter(this.data.albumShowTranformX, () => {
                    process.show()
                })

                $('.home-body-bg').css({
                    opacity: 0
                })

                TweenMax.set(slidLabel,{
                    opacity: 0
                })

                

                TweenMax.to($('.album-slideshow__label'), 0, {
                    opacity: 0
                })

                // 菜单左滑
                for (let i = 0; i <= this.data.menuLen; i++) {
                    TweenMax.to($(this.data.menuChild[i]), this.data.menuSliderTime, {
                        x: -this.data.homeMenuXlist[i],
                        delay: this.data.homeMenuDelay * i,
                        ease: Quad.easeInOut,
                        onComplete: () => {
                            $('.home-button').css({
                                'pointer-events': 'none'
                            })
                        }
                    })
                }

                TweenMax.to(this.labelDom, this.data.menuSliderTime, {
                    x: -300,
                    ease: Quad.easeInOut
                })
            
                //router.push(menuMap[this.data.MenuHoverIndex], menuMap[this.data.MenuHoverIndex])


                setTimeout(() => {
                    this.renderAlbumStrip(Details[this.data.MenuHoverIndex])
                },20)
            //}
        })
    },
    renderAlbumStrip(data) {
        let domWidth = $('.album-slideshow-container').outerWidth(true)
        let centerContainerWidth = 0
        
        let html =  ``
        html += `<div class="album-strip">`
        data.forEach((item,index) => {
            centerContainerWidth = domWidth * 1.2 * index 
            
            html += `
                <div class="album album-strip__album pink" style="width:${domWidth}px;left:${ domWidth * 1.2 * index }px; opacity: 1;">
                    <div class="album-strip__img">
                        <img src="${item.productImg}"></img>
                    </div>
                    <div class="album-strip__name">
                        <div class="album-strip__title">${item.title}</div>
                        <div class="album-strip__desc">${item.desc}</div>
                    </div>
                </div>
            `
        })
        html += `</div>`

        $('.album-container').css({
            width: centerContainerWidth+'px'
        })
        $('.album-strip').width(centerContainerWidth+'px')
        
        $('.album-container').append(html)

        
        process.show()

        TweenMax.set($('.album-strip__name'),{
            x: 150,
            opacity: 0
        })

        TweenMax.to($('.album-strip__name') ,1,{
            x: 0,
            opacity: 1
        })
    },
    menuButtonAndLogoEnter(logo, menuButton) {

        this.logoWidth = logo.outerWidth(true)

        this.menuButtonWidth = menuButton.outerWidth(true)

        TweenMax.set(logo, {
            x: -this.logoWidth
        })

        TweenMax.set(menuButton, {
            x: this.menuButtonWidth + 28
        })

        this.logoEnter =  TweenMax.to(logo, 1, {
            x: 0,
            ease: Quad.easeInOut
        }) 

        this.menuButtonEnter  = TweenMax.to(menuButton, 1, {
            x: 0,
            ease: Quad.easeInOut
        })

    },
    HomeMenuEvent(parent, chlids, albumContainer, slidLabel, labelDom) {
        this.setData({
            homeMenuDelay: 0.05,
            MenuHoverIndex: 0,
            labelDom: labelDom
        })

        this.labelDom = labelDom
        
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
                x: -this.data.homeMenuXlist[i],
                onComplete:() => {
                    $('.home-button-text').addClass('overlay__active')
                }
            })
        }

        for (let i = 0; i <= len; i++) {
            TweenMax.to($(chlids[i]), this.data.menuSliderTime, {
                x: 0,
                delay: this.data.homeMenuDelay * i,
                ease: Quad.easeInOut
            })
        }

        $('.home-button').css({
            'pointer-events': 'auto'
        })

        parent.click(e => {
            $('.home-body-bg').css({
                opacity: 0
            })

            $('.overlay').css({
                opacity: 0
            })

            TweenMax.set($('.album-slideshow__label'),{
                opacity: 0
            })
            
            if (homeMenuIsMove) return

            
  
            homeMenuIsMove = true

            this.data.MenuHoverIndex = $(e.target).parent().index()


            //if(router.canPush()) {
                //router.push(menuMap[this.data.MenuHoverIndex], menuMap[this.data.MenuHoverIndex])
                TweenMax.to(labelDom, this.data.menuSliderTime, {
                    x: -300
                })

                this.homeAlbumEnter = homeAlbum.enter(this.data.albumShowTranformX)

                if (this.data.MenuHoverIndex === 0) { // 动画延迟从头开始
                    for (let i = 0; i <= len; i++) {
                        
                        TweenMax.to($(chlids[i]), this.data.menuSliderTime, {
                            x: -this.data.homeMenuXlist[i],
                            delay: this.data.homeMenuDelay * i,
                            ease: Quad.easeInOut,
                            onComplete: () => {
                                homeMenuIsMove = false

                                $('.home-button').css({
                                    'pointer-events': 'none'
                                })
                            }
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
                            ease: Quad.easeInOut,
                            onComplete: () => {
                                homeMenuIsMove = false
                                $('.home-button').css({
                                    'pointer-events': 'none'
                                })
                            }
                        })
                    }

                    

                } else if (this.data.MenuHoverIndex === len) { // 动画延迟从末尾开始
                    for (let i = len; i >= 0; i--) {
                        TweenMax.to($(chlids[i]), this.data.menuSliderTime, {
                            x: -this.data.homeMenuXlist[i],
                            delay: this.data.homeMenuDelay * Math.abs(i - len),
                            ease: Quad.easeInOut,
                            onComplete: () => {
                                homeMenuIsMove = false

                                $('.home-button').css({
                                    'pointer-events': 'none'
                                })

                                $()
                            }
                        })
                    }
                }

                this.renderAlbumStrip(Details[this.data.MenuHoverIndex])
            //}
        })

        //菜单悬停切换右侧图片
        parent.mouseover((e) => {
            let index = $(e.target).parent('.home-button').index()
            this.data.MenuHoverIndex = index > 0 ? index : 0


            if($(e.target).hasClass('home-button-text') && $(e.target).find('.overlay').length == 0) {
                let overlayHtml = `<div class="overlay">${menuHoverTip[this.data.MenuHoverIndex ]}</div>`
                $(e.target).append(overlayHtml)
            }

            if (this.data.MenuHoverIndex < 0) return
            albumContainer
                .find('.show')
                .removeClass('show')

            albumContainer.children()
                .eq(this.data.MenuHoverIndex)
                .addClass('show')

            homeAlbum.hideLabel()
            homeAlbum.showLabel()
            console.log(getTip(this.data.MenuHoverIndex))


            $('.album-slideshow__label').html(getTip(this.data.MenuHoverIndex))
        })
    },
    menuButtonEvent(menuButton, menuBg, menuPage, menuTxtBox, menuMask) {
        this.setData({
            showMenu: false,
            MenuTime: 0.4,
            menuDelay: .5
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
                window.showMenuPage = true

                menuButton.children('.menu-button__line ').css({
                    'background-color': '#fff'
                })

                TweenMax.set([$('.home-list')], {'z-index':-1});



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
                window.showMenuPage = false


                TweenMax.to([$('.home-list')],1,{'z-index':1});

                TweenMax.to(menuMask, 1, {
                    opacity: 0,
                    delay: this.data.menuDelay
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

                /* TweenMax.to($('.home-list'), 1, {
                    opacity: 1,
                    delay: 1,
                }) */

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