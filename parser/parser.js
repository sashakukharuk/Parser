const {getHTML} = require('../helpers/request')
const cheerio = require('cheerio')

module.exports.parser = async (inputData) => {

    let iter = 1
    const outputData = []
    const parseRecurs = async () => {

        const data = await getHTML(inputData.url, `page-${iter}`)
        const selector = cheerio.load(data)
        let iteration = 0

        function recurs() {
            const result = inputData.items.map(item => {
                if (item.option) {
                    return {
                        [item.name]: selector(`${item.tag}.${item.selector}`).eq(iteration).attr(item.option)
                    }
                } else {
                    return {
                        [item.name]: selector(`${item.tag}.${item.selector}`).eq(iteration).text()
                    }
                }
            })
            const reduce = inputData.items.reduce((acum, item, idx) => {
                acum[item.name] = result[idx][item.name]
                return acum
            }, {})

            outputData.push(reduce)

            if (selector(`${inputData.items[0].tag}.${inputData.items[0].selector}`).length - 1 !== iteration) {
                iteration++
                recurs()
            }
        }

        recurs()

        if (inputData.page > iter) {
            iter++
            await parseRecurs()
        }
    }
    await parseRecurs()

    return outputData
}
