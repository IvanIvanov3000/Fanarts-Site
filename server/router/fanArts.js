const express = require('express');
const router = express.Router();
const { auth, isOwner, isNotOwner, isNotLiked, isLiked } = require('../utils');
const fanArtsContoller = require('../controllers/fanArtsController');

// middleware that is specific to this router

router.get('/latestFanArts', fanArtsContoller.getTopFanArts);
router.post('/search', fanArtsContoller.searchFanArt);

router.get('/details/:fanArtId', fanArtsContoller.getFanArt);
router.get('/catalog', fanArtsContoller.getFanArts);

router.get('/myFanArts', auth(), fanArtsContoller.getMyFanArts);
router.post('/create', auth(), fanArtsContoller.createFanArt);

router.get('/:fanArtId/like', auth(), isNotOwner(), isNotLiked(), fanArtsContoller.likeFanArt);
router.get('/:fanArtId/dislike', auth(), isNotOwner(), isLiked(), fanArtsContoller.dislikeFanArt);

router.put('/:fanArtId/edit', auth(), isOwner(), fanArtsContoller.editFanArt);
router.delete('/:fanArtId/delete', auth(), isOwner(), fanArtsContoller.deleteFanArt);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router