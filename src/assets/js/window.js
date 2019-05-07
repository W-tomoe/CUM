
const main = {
    setData(val) {
        window.globalData = val
    },
    open(path,title) {
        return window.open(path,'_self')
    }
}

export default main