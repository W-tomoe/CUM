import main from '../../assets/js/main.js'
import './index.scss'


let page = {
    init() {
        const that = this
        that.$slidLabel = $('.album-slideshow__label') //首页右侧文字
        that.$menuDom = $('.home-menu-container') // 菜单容器
        that.$homeButton = $('.home-button-text') // 左侧菜单容器
        that.$labelDom = $('.home-list-label') // 首页左侧竖向字体
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



        setTimeout(() => {
            main.menuButtonAndLogoInit(that.$logo, that.$menuButton)
            // 菜单按钮
            main.menuButtonEvent(that.$menuButton, that.$menuBg, that.$menuPage, that.$menuTxtBox, that.$menuMask)
            //点击菜单动画
            main.HomeMenuEvent(that.$menuDom, that.$homeButton, that.$albumContainer, that.$slidLabel, that.$labelDom)
            that.$homeButton.addClass('active')
            main.initRightPriview(that.$galleryList, that.$galleryMask, that.$albumContainer, that.$slidLabel)
        }, 20);
    },
    update() {
        const that = this
        let html = document.documentElement;
        let wH = that.wH = html.clientHeight; // 窗口宽度
        let wW = that.wW = html.clientWidth;
        //rem单位
        let designSize = 1920; // 设计图尺寸

        let rem = wW * 100 / designSize;
        document.documentElement.style.fontSize = rem + 'px';
        that.calDom()

    },
    addAnimation() {

    },
    calDom() {
        const that = this
        // dom极端

        that.$menuDom.css({
            fontSize: that.wH * 0.13 + 'px'
        })


        that.$labelDom.css({
            top: that.wH * 0.5 * 1.6 + 'px'
        })

        //  右侧product

        that.$albumContainer.css({
            height: 100 * 0.6 + 'vh',
            top: that.wH * 0.2 + 'px',
            width: (1107 / 684) * 100 * 0.6 + 'vh'
        })


        that.showMenuPage()

    },
    showMenuPage() {

    }
}
page.init()
main.resize(page.update())