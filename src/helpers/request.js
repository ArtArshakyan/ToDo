
import {getToken} from './auth';

export default async function request(url, method='GET', body){
    const token = await getToken();
if(!token) return Promise.resolve(null);

    const config = {
        method: method,
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    };

    if(body){
        config.body = JSON.stringify(body);
    }

   return fetch(url, config)
        .then(async (response) => {
            const res = await response.json();

            if(response.status >=400 && response.status < 600){
                if(res.error){
                    throw res.error;
                }
                else {
                    throw new Error('Something went wrong!');
                }
            }
            
            return res;
        });
}

