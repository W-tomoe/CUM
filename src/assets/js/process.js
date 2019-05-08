const proccess = {
    init() {
        this.$proccess =  $('.progress-track')
        this.$arrowLeft = $('.arrow-button--left')
        this.$arrowRight = $('.arrow-button--right')
        this.$albumStrip = $('.album-strip')

        this.duration = 1

        this.initalProY = this.$proccess.css('top') + this.$proccess.outerHeight(true)
        this.initalArrow = this.$arrowLeft.outerHeight(true)
        TweenMax.set(this.$proccess,{
            y:-this.initalY,
            ease:Quad.easeInOut
        })

        TweenMax.set([this.$arrowLeft, this.$arrowRight],{
            y:this.initalArrow,
            ease:Quad.easeInOut
        })

        TweenMax.set(this.$albumStrip,{
            opacity: 0
        })
    },
    show() {
        TweenMax.set(this.$arrowRight,this.duration,{
            y:0,
            ease:Quad.easeInOut
        })

        TweenMax.set(this.$proccess,this.duration,{
            y:0,
            ease:Quad.easeInOut
        })

        TweenMax.set(this.$albumStrip,{
            opacity: 1
        })
    },
    leave() {

    },
    clickProccess() {

    },
    clickArrowLeft() {

    },
    clickArrowRight() {

    },
    update() {

    }
}

export default proccess