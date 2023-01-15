const { fanArtModel, userModel } = require('../models');

function getFanArts(req, res, next) {
    fanArtModel.find({ isPublic: true })
        // .populate('userId')
        .then(fanArts => res.json(fanArts))
        .catch(next);
}
function getFanArt(req, res, next) {
    const { fanArtId } = req.params;

    fanArtModel.findById(fanArtId)
        .populate("author")
        .then(fanArt => res.json(fanArt))
        .catch(next);
}
function searchFanArt(req, res, next) {
    const { title, tag } = req.body;
    const searchBy = {isPublic: true };
    if (title?.length > 0) {
        searchBy.title = title
    }
    if (tag?.length > 0) {
        searchBy.tag = tag;
    }
    fanArtModel.find(searchBy)
        .populate("author")
        .then(fanArt => res.json(fanArt))
        .catch(next);
}
function getTopFanArts(req, res, next) {

    fanArtModel.find({ isPublic: true, "likes.0": { "$exists": true } })
        .sort({ created_at: 1 })
        // .populate('userId')
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(next);
}

function getMyFanArts(req, res, next) {
    fanArtModel.find({ author: req.user._id })
        .populate('fanArts')
        .then(fanArts => res.json(fanArts))
        .catch(next);
}

function createFanArt(req, res, next) {
    const { title, tag, isPublic, image, description } = req.body;
    const _id = req.user._id;

    fanArtModel.create({ title, tag, isPublic, image, description, author: _id })
        .then(fanArt => {
            console.log("created fanart----", fanArt);
            userModel
                .findByIdAndUpdate({ _id }, { $addToSet: { fanArts: fanArt._id } }, { new: true })
                .then(updatedUser => {
                    res.status(200).json(updatedUser)
                })
                .catch(err => {

                    console.log(err);
                })

            res.json(fanArt)

        })
        .catch(next);
}

function likeFanArt(req, res, next) {
    const fanArtId = req.params.fanArtId;
    const { _id } = req.user._id;

    fanArtModel.findByIdAndUpdate({ "_id": fanArtId }, { $addToSet: { likes: _id } }, { new: true })
        .then(updatedfanArt => {
            res.status(200).json(updatedfanArt)
        })
        .catch(next);
}
function dislikeFanArt(req, res, next) {
    console.log("dislike---------");
    const fanArtId = req.params.fanArtId;
    const { _id } = req.user._id;

    fanArtModel.findByIdAndUpdate({ "_id": fanArtId }, { $pull: { likes: _id } }, { new: true })
        .then(updatedfanArt => {
            console.log(updatedfanArt, "successful dislike")
            res.status(200).json(updatedfanArt)
        })
        .catch(next);
}

function editFanArt(req, res, next) {
    const { fanArtId } = req.params;
    const { title, tag, isPublic, image, description } = req.body;
    console.log("edit", title, tag, isPublic, image, description);
    //const { _id: userId } = req.user;

    // if the userId is not the same as this one of the post, the post will not be updated
    fanArtModel.findOneAndUpdate({ _id: fanArtId }, { title, tag, isPublic, image, description }, { runValidators: true, new: true })
        .then(updatedPost => {
            if (updatedPost) {
                res.status(200).json(updatedPost);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}
function deleteFanArt(req, res, next) {
    const { fanArtId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        fanArtModel.findOneAndDelete({ _id: fanArtId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { fanArts: fanArtId } }),

    ])
        .then(([deletedOne, _]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

module.exports = {
    getFanArts,
    getTopFanArts,
    getFanArt,
    searchFanArt,
    createFanArt,
    likeFanArt,
    dislikeFanArt,
    getMyFanArts,
    editFanArt,
    deleteFanArt,
}
