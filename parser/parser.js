const axios = require('axios')
const cheerio = require('cheerio')

module.exports.parser = async () => {
    try {

        const newsData = []

        let iteration = 0

        const dataFirst = await axios.get('https://i.factor.ua/news/').then(res => res.data)

        const selectorFirst = cheerio.load(dataFirst)

        selectorFirst('.b-news__list-item').each((i, element) => {

            const ads = selectorFirst(element).find('span.b-news__list-item-other__label').text() === "Реклама"

            if (!ads) {

                const name = selectorFirst(element).find('a.b-news__list-item-link-curr').attr('title')
                const address = selectorFirst(element).find('a.b-news__list-item-link-curr').attr('href')

                if (name || address) {
                    newsData.push({name, address, published: {}})
                }
            }
        })

        const recurs = async (address) => {
            const dataSecond = await axios.get(`https://i.factor.ua${newsData[iteration].address}`).then(res => res.data)

            const selectorSecond = cheerio.load(dataSecond)

            selectorSecond('.b-news-one').each((i, element) => {

                const date = selectorSecond(element).find('span.b-news__other__date').text()
                const publisher = selectorSecond(element).find('span.b-news__article-resource').find('a').attr('title')
                const link = selectorSecond(element).find('span.b-news__article-resource').find('a').attr('href')

                if (date || link) {
                    newsData[iteration].published = {date: date, publisher: publisher, link: link}
                }
            })

            if (newsData.length - 1 > iteration) {
                iteration++
                await recurs()
            }
        }

        await recurs()

        console.log(newsData)

    } catch (err) {
        console.log(err)
    }
}
