// 浏览器导航
class UrlManger {
    constructor() {
        this.pathCache = []

        this.back()
    }
    back() {
        window.addEventListener("popstate", function (e) {
            console.log(e.state)
        })
    }
    push(state,key) {
        console.log(state,key,'title,key')
        
        history.pushState(state,null, location.href + key); //(data, title, url)
    }
}



export default UrlManger