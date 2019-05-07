const path = require('path')
exports.assetsPath = function (_path) {
    const assetsSubDirectory = 'assets'

    return path.posix.join(assetsSubDirectory, _path)
}