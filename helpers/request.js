const axios = require('axios')
module.exports.getHTML = async (url, page) => {
    return await axios.get(url).then(res => res.data)
}
