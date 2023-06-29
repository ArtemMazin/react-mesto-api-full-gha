import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import EmailIsExist from '../errors/EmailIsExist.js';
import { SECRET_KEY } from '../dotenv.js';
import searchUserDB from '../decorators/searchUserDB.js';
import searchAndUpdateUserDB from '../decorators/searchAndUpdateUserDB.js';

const register = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }).then((user) => res.status(201)
      .send({ data: user.toJSON() })
      .catch(next)))
    .catch((err) => {
      if (err.code === 11000) {
        next(new EmailIsExist('Пользователь с таким email уже существует'));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ data: user.toJSON() });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const get = searchUserDB(req, res, next);
  get(req.params.userId);
};

const getProfile = (req, res, next) => {
  const get = searchUserDB(req, res, next);
  get(req.user._id);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  const update = searchAndUpdateUserDB(req, res, next);
  update({ name, about });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  const update = searchAndUpdateUserDB(req, res, next);
  update({ avatar });
};

export {
  register, getUsers, getUserById, updateProfile, updateAvatar, login, getProfile,
};
