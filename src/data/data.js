import axios from 'axios';

const url = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/';
const email = 'bruno1_oliveira@hotmail.com';


export async function fetchData() {
    try {
        const response = await axios.get(url, { 
            headers: {'dev-email-address': email},
            timeout: 5000
        });
        return response.data;
    } catch (error) {
        if(error.code === 'ECONNABORTED') {
            throw new Error('O servidor demorou para responder, tente mais tarde');
        } else if(error.response && [500, 502, 503, 504, 507, 508, 509].includes(error.response.status)) {
            throw new Error('O servidor falhou em responder, tente recarregar a página');
        } else {
            throw new Error('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde');
        }
    }
}


