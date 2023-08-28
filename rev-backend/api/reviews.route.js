import express from 'express'
import ctrl from './reviews.controller.js'

const router = express.Router()

router.route('/').get((req,res)=>{
  res.send('hello bleh')
})

router.route('/movie/:id').get(ctrl.apiGetReviews)
router.route('/new').post(ctrl.apiPostReview)
router.route('/:id').get(ctrl.apiGetReview)
                    .put(ctrl.apiUpdateReview)
                    .delete(ctrl.apiDeleteReview)

export default router