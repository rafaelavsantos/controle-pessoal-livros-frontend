import axios from 'axios';

// cria uma instance Axios com a URL base do Web Service a ser acessado pelo app
export const api = axios.create({
    baseURL: 'http://localhost:3001/'
});