const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const fanArtSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [5, 'Title should be at least 5 characters'],
        maxlength: [40, 'Title should be at max 40 characters'],
    },
    image: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        required: true
    },
    tag: {
        type: String,
        required: true,
        minlength: [5, 'Tag should be at least 5 characters'],
        maxlength: [30, 'Tag should be at max 30 characters'],
    },
    description: {
        type: String,
        required: true,
        minlength: [100, 'Description should be at least 100 characters'],
        maxlength: [220, 'Description should be at max 220 characters'],
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    author: {
        type: ObjectId,
        ref: "User"
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('FanArts', fanArtSchema);
