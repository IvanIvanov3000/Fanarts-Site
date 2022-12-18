const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already in use"],
        minlength: [5, 'Email should be at least 5 characters'],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_]+@(abv.bg)?(gmail.com)?$/g.test(v);
            },
            message: props => `${props.value} must contains only latin letters and digits!`
        },
    },
    username: {
        type: String,
        required: true,
        unique: [true, "Username is already in use"],
        minlength: [5, 'Username should be at least 5 characters'],
        maxlength: [20, 'Username should be at max 20 characters'],
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9_]+/g.test(v);
            },
            message: props => `${props.value} must contains only latin letters and digits!`
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password should be at least 6 characters'],
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9]+/g.test(v);
            },
            message: props => `${props.value} must contains only latin letters and digits!`
        },
    },
    fanArts: [{
        type: ObjectId,
        ref: "fanArts"
    }]

}, { timestamps: { createdAt: 'created_at' } });

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                }
                this.password = hash;
                next();
            })
        })
        return;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
