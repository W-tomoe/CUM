const getClass = (className) => {
    return document.getElementsByClassName(className)[0]
}

const getId = (idName) => {
    return document.getElementsByClassName(idName)
}

export  {
    getClass,
    getId
}