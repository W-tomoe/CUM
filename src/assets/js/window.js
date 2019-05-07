
//动画库
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";

let html = document.documentElement;
let wH = html.clientHeight;// 窗口宽度
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

const main = {
    data() {
        return {
            menuTextX:200
        }
    },
    setData(opt) {
        Object.keys(opt).forEach(item => {
            this.data[item] = opt[item]
        })
        
    },
    open(path,title) {
        return window.open(path,'_self')
    },
    resize(callback) {
        return window.onresize = () => {
            callback && callback()
        }
    },
    HomeMenuEvent(parent,chlids, albumContainer, slidLabel, labelDom) {
        this.setData({homeMenuDelay:0.05,MenuHoverIndex:0})
        //初始化菜单动画
        let len = chlids.length - 1
        this.setData({
            homeMenuXlist: [],
            menuSliderTime: 1
        })

        TweenMax.set(labelDom, {
            x: -300
        })

        TweenMax.to(labelDom, this.data.menuSliderTime,{
            x: 0,
            ease:Quad.easeInOut,
            delay: 0.5
        })

        chlids.each((index,item) => {
            let childContainer = $(item).parent()
            this.data.homeMenuXlist.push($(item).parent().outerWidth(true))
        }) 

        for(let i=0;i<=len;i++) {
            TweenMax.set($(chlids[i]),{
                x: -this.data.homeMenuXlist[i]
            })
        }
        

        for(let i=0;i<=len;i++) {
            TweenMax.to($(chlids[i]),this.data.menuSliderTime,{
                x: 0,
                delay: this.data.homeMenuDelay * i,
                ease:Quad.easeInOut
            })
        }

        parent.click(e => {
            let clickIndex = $(e.target).parent().index()

            TweenMax.to(labelDom, this.data.menuSliderTime,{
                x: -300
            })

            if( clickIndex === 0 ) { //动画延迟从头开始
                for(let i=0;i<=len;i++) {
                    TweenMax.to($(chlids[i]),this.data.menuSliderTime,{
                        x: -this.data.homeMenuXlist[i],
                        delay:this.data.homeMenuDelay * i,
                        ease:Quad.easeInOut
                    })
                }

            }else if(0 > clickIndex > len) { //动画延迟从中间开始

            }else { //动画延迟从末尾开始

            }
        })


        //菜单悬停切换右侧图片
        parent.mouseover((e) => {
            this.data.MenuHoverIndex = $(e.target).parent('.home-button').index()
            if(this.data.MenuHoverIndex<0) return
            albumContainer
                .find('.show')
                .removeClass('show')
            
            albumContainer.children()
                .eq(this.data.MenuHoverIndex)
                .addClass('show')
            
            slidLabel.html(getTip(this.data.MenuHoverIndex))
        })


        //点击label跳转动画

        slidLabel.click(() => {
            TweenMax.to(albumContainer,1,{
                x:-500
            })
            //albumContainer.css({right: '500px'})
            /* timer = setTimeout(() => {
                main.open('../sliderDetail.html')
            },1000) */
            
        })
    },
    menuButtonEvent(menuButton,menuBg,menuPage,menuTxtBox) {
        this.setData({
            showMenu: false,
            MenuTime: 0.4,
            menuDelay:.5,
            menuShowing: false
        })

        // 菜单按钮设置初始位置
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

        //菜单文字初始状态
        TweenMax.set(menuTxtBox,{
            opacity: 0,
            x: -200
        })

        menuButton.mousemove(() => {
            if(this.data.showMenu) return
            TweenMax.to(menuButton.children().eq(0), this.data.MenuTime, {
                y: 6
            })
    
            TweenMax.to(menuButton.children().eq(2), this.data.MenuTime, {
                y: 20
            })
        })

        
        menuButton.mouseleave(() => {
            if(this.data.showMenu) return

            TweenMax.to(menuButton.children().eq(0), this.data.MenuTime, {
                y: 8
            })
    
            TweenMax.to(menuButton.children().eq(2), this.data.MenuTime, {
                y: 18
            })
        })

        // 点击按钮打开菜单
        menuButton.click(() => {
            this.setData({
                showMenu: !this.data.showMenu
            })

            
            if(menuShowing) return
            
            
            if(this.data.showMenu) {
                menuButton.children('.menu-button__line ').css({'background-color':'#fff'})

                TweenMax.to(menuButton.children().eq(0),this.data.MenuTime,{
                    rotation:45,
                    delay: this.data.MenuTime
                },this.data.MenuTime)

                TweenMax.to(menuButton.children().eq(1),this.data.MenuTime,{
                    width: 0
                })

                TweenMax.to(menuButton.children().eq(2),this.data.MenuTime,{
                    rotation:-45,
                    delay: this.data.MenuTime
                },this.data.MenuTime)

                TweenMax.to(menuBg,this.data.MenuTime,{
                    width:'100%'
                })
                
                menuPage.css({
                    display: 'block'
                })
                
                TweenMax.to(menuTxtBox,1,{
                    opacity: 1,
                    x: 0,
                    delay: this.data.menuDelay
                })

                menuTxtBox.css({
                    'pointer-events': 'auto'
                })
            }else {

                menuButton.children('.menu-button__line ').css({'background-color':'#005479'})
                TweenMax.to(menuButton.children().eq(0),this.data.MenuTime,{
                    rotation:0,
                    
                },this.data.MenuTime)

                TweenMax.to(menuButton.children().eq(1),this.data.MenuTime,{
                    width: '22px',
                    delay: this.data.MenuTime
                })

                TweenMax.to(menuButton.children().eq(2),this.data.MenuTime,{
                    rotation:0
                },this.data.MenuTime)

                TweenMax.to(menuBg,this.data.MenuTime,{
                    width:0,
                    delay: this.data.menuDelay
                })

                setTimeout(()=> {
                    menuPage.css({
                        display: 'none'
                    })
                },1000)

                TweenMax.to(menuTxtBox,1,{
                    opacity: 0,
                    x: -200
                })
                menuTxtBox.css({
                    'pointer-events': 'none'
                })

                menuShowing = false
            }

            
        })
    }
}

export default main