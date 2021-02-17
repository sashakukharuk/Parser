const {parser} = require('../parser/parser')
module.exports.getData = async (req, res) => {
    try {
        const data = await parser(req.body)
        res.status(200).send(data)
    } catch (err) {
        throw err
    }
}
