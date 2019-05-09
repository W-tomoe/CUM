// 浏览器导航
import process from './process.js'

process.init()
class UrlManger {
    constructor() {
        this.pathCache = []
        this.canPushRouter = true
        this.menuMap = [
            'DO',
            'RE',
            'MI',
            'FA',
            'SO',
            'LA',
            'TI',
        ]
        this.menuHoverIndex = 0
        this.back()
    }
    back() {
        window.addEventListener("popstate", (e) => {
            if(!e.state) {
                process.homePageEnter()
                history.pushState('',null, location.href + '');
            } else {
                this.menuHoverIndex = this.menuMap.indexOf(e.state)
            }
        })
    }
    validPath(path) {
        if(path.indexOf('#') > 0) return false

        else return true
    }   
    push(state,key) {
        if(state == '') {
            history.pushState(state,null, location.href.split('/')[0]);
            return false
        }
        
        history.pushState(state,null, location.href + '#' + key); //(data, title, url)
    }
    replace(state,key) { 
        history.popState(state,null, location.href + key);
    }
    getMenuIndex() {
        return this.menuHoverIndex
    }
    canPush() {
        this.canPushRouter = this.validPath(location.href)

        return this.canPushRouter
    }
}



export default UrlManger