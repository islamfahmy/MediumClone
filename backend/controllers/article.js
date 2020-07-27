const articleRouter = require('express').Router()
const Article = require('../models/Article')
articleRouter.get('/', async (req, res) => {
    const articles = await Article.find({}).populate('user',{ title: 1, likes: 1 });
    res.json(articles.toJSON());
});
articleRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const articles = await Article.findById(id).populate('user',{ title: 1, likes: 1 });
    res.json(articles.toJSON());
});
articleRouter.put('/:id',async(request,response)=>{

    const article = await Article.findById(request.params.id)
    article.likes.concat(request.body.like)
    article.comments.concat(request.body.comment)
    await Article.findByIdAndUpdate(request.params.id,article)
    response.status(200).send()
})
module.exports = articleRouter


