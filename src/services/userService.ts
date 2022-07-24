import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { URLSearchParams } from 'url';
import { unauthorizedError } from '../middlewares/errorHandlerMiddleware.js';
import { LoginData } from '../models/loginSchema.js';
import { SignupData } from '../models/signupSchema.js';
import UserRepository from '../repositories/userRepository.js';

export interface UserGithub {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: null;
  blog: string;
  location: string;
  email: string;
  hireable: null;
  bio: null;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

async function createUser(credentials: SignupData, isGithub = false) {
  const userExists = await UserRepository.select(credentials.email);

  if (userExists) {
    const message = 'Email already registered !';
    throw unauthorizedError(message);
  }

  const cryptedPassword = isGithub
    ? null
    : bcrypt.hashSync(credentials.password, 10);

  const user = await UserRepository.insert({
    email: credentials.email,
    password: cryptedPassword,
  });
  return user;
}

async function findUser(email: string) {
  const user = await UserRepository.select(email);
  return user;
}

async function getUserOrFail(credentials: LoginData) {
  const { email, password } = credentials;
  const user = await UserRepository.select(email);

  if (!user) {
    const message = 'Wrong email & password combination !';
    throw unauthorizedError(message);
  }
  const valid = bcrypt.compareSync(password, user.password);

  if (!valid) {
    const message = 'Wrong email & password combination !';
    throw unauthorizedError(message);
  }

  return user;
}

async function login(credentials: LoginData) {
  const user = await getUserOrFail(credentials);
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60, // one day in sec
  });
  return token;
}

async function loginWithGithub(githubUser: UserGithub) {
  const { email } = githubUser;
  let user = await UserRepository.select(email);

  if (!user) {
    user = await createUser(
      { email, password: null, confirmPassword: null },
      true
    );
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60, // one day in sec
  });
  return token;
}

async function getGithubUser(code: string): Promise<UserGithub> {
  const githubToken = await axios
    .post(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`
    )
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

  const params = new URLSearchParams(githubToken);
  const accessToken = params.get('access_token');
  return axios
    .get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

const userService = {
  createUser,
  findUser,
  login,
  loginWithGithub,
  getGithubUser,
};

export default userService;
