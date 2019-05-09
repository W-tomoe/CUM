const proccess = {
    init() {
        this.$proccess =  $('.progress-track')
        this.$arrowLeft = $('.arrow-button--left')
        this.$arrowRight = $('.arrow-button--right')
        this.$albumStrip = $('.album-strip')

        this.duration = 1
        this.delay = 0.05

        this.initalProY =  parseInt( this.$proccess.css('top') ) + this.$proccess.outerHeight(true)
        this.initalArrow = parseInt( this.$arrowLeft.css('margin-top') )


        TweenMax.set(this.$proccess,{
            y:- this.initalProY,
            ease:Quad.easeInOut
        })

        TweenMax.set([this.$arrowLeft, this.$arrowRight],{
            y:-this.initalArrow,
            ease:Quad.easeInOut
        })

        TweenMax.set(this.$albumStrip,{
            opacity: 0
        })
    },
    show() {
        TweenMax.staggerTo([this.$arrowLeft, this.$arrowRight],this.duration,{
            y:0,
            ease:Quad.easeInOut
        },this.delay)

        TweenMax.to(this.$proccess,this.duration,{
            y:0,
            ease:Quad.easeInOut
        })

        TweenMax.set(this.$albumStrip,{
            opacity: 1
        })
    },
    leave() {
        TweenMax.to([this.$arrowLeft, this.$arrowRight],this.duration,{
            y:-this.initalArrow,
            ease:Quad.easeInOut
        })

        TweenMax.to(this.$proccess,this.duration,{
            y:- this.initalProY,
            ease:Quad.easeInOut
        })

        TweenMax.set(this.$albumStrip,{
            opacity:0
        })
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