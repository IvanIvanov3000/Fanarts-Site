const {
    userModel,
} = require('../models');

const utils = require('../utils');
const { authCookieName } = require('../app-config');

const bsonToJson = (data) => { return JSON.parse(JSON.stringify(data)) };
const removePassword = (data) => {
    const { password, __v, ...userData } = data;
    return userData
}

function register(req, res, next) {
    const { email, username, password, repeatPassword } = req.body;

    if (password != repeatPassword) {
        return res.send("Passwords don't match.");
    }
    return userModel.create({ email, username, password })
        .then((createdUser) => {
            createdUser = bsonToJson(createdUser);
            createdUser = removePassword(createdUser);

            const token = utils.jwt.createToken({ id: createdUser._id });
            // if (process.env.NODE_ENV === 'production') {
            //     res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
            // } else {
            //     res.cookie(authCookieName, token, { httpOnly: true })
            // }
            console.log(createdUser);
            res.status(200).send({
                id: createdUser._id,
                username: createdUser.username,
                email: createdUser.email,
                accessToken: token
            });
        })
        .catch(err => {
            console.log(err.message);
            if (err.name === 'MongoError' && err.code === 11000) {
                let field = err.message.split("index: ")[1];
                field = field.split(" dup key")[0];
                field = field.substring(0, field.lastIndexOf("_"));

                res.status(409)
                    .send({ message: `This ${field} is already registered!` });
                return;
            }
            next(err);
        });
}

function login(req, res, next) {
    console.log("-------login-------");
    const { email, password } = req.body;
    userModel.findOne({ email })
        .then(user => {
            return Promise.all([user, user ? user.matchPassword(password) : false]);
        })
        .then(([user, match]) => {
            if (!match) {
                res.status(401)
                    .send({ message: 'Wrong email or password' });
                return
            }
            user = bsonToJson(user);
            user = removePassword(user);

            const token = utils.jwt.createToken({ id: user._id });

            // if (process.env.NODE_ENV === 'production') {
            //     res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
            // } else {
            //     res.cookie(authCookieName, token, { httpOnly: true })
            // }
            // res.status(200)
            //     .send(user);

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                accessToken: token
            });
        })
        .catch(next);
}



function getProfileInfo(req, res, next) {
    const { _id: userId } = req.user;

    userModel.findOne({ _id: userId }, { password: 0, __v: 0 }) //finding by Id and returning without password and __v
        .then(user => { res.status(200).json(user) })
        .catch(next);
}

function editProfileInfo(req, res, next) {
    const { _id: userId } = req.user;
    const { username, email } = req.body;
    console.log(username, email);
    userModel.findOneAndUpdate({ _id: userId }, { username, email }, { runValidators: true, new: true })
        .then(x => { res.status(200).json(x) })
        .catch(err => {
            console.log(err.message);
            if (err.name === 'MongoError' && err.code === 11000) {
                let field = err.message.split("index: ")[1];
                field = field.split(" dup key")[0];
                field = field.substring(0, field.lastIndexOf("_"));

                res.status(409)
                    .send({ message: `This ${field} is already registered!` });
                return;
            }
            next(err);
        });
}

module.exports = {
    login,
    register,
    getProfileInfo,
    editProfileInfo,
}
