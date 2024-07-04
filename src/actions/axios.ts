import axios from 'axios';

const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${githubToken}`,
    'Content-Type': 'application/json',
  },
});

export default axiosInstance
