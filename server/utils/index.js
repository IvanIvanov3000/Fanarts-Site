const jwt = require('./jwt');
const {auth ,isOwner, isNotOwner,isNotLiked, isLiked } = require('./auth');
const errorHandler = require('./errHandler');

module.exports = {
    jwt,
    auth,
    isOwner,
    isNotOwner,
    isNotLiked,
    isLiked,
    errorHandler
}
