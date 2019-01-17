const express = require('express')
//const wpClient = require('../clients/wp_client')
// const asyncHandler = require('express-async-handler')

//const wp = new wpClient()

module.exports = {

  newsRoutes: () => {
    const apiRouter = express.Router()

    apiRouter.get('/posts/:category', (req, res, next) => {
      res.json({category: req.params.category, posts: []})
    })

    apiRouter.get('/post/:title', (req, res, next) => {
      res.json({category: req.params.category, posts: []})
      // let post = wp.getPost(req.params.title)
      // res.json(post)
    })

    apiRouter.get('/author/:author', (req, res, next) => {
      res.json({ author: req.params.author })
    })

    apiRouter.get('/categories', (req, res, next) => {
      res.json({ categories: [] })
    })
    return apiRouter
  },

  newsPages: (app) => {
    const pageRouter = express.Router()
    pageRouter.get('/post/:title', (req, res) => {
      app.render(req, res, '/news/post')
    })

    pageRouter.get('/author/:author', (req, res) => {
      app.render(req, res, '/news/author')
    })

    pageRouter.get('/posts/:category', (req, res) => {
      app.render(req, res, '/news/posts')
    })

    return pageRouter
  }
}

      /*
  let pagePath = '/news/posts'
        })
    */
