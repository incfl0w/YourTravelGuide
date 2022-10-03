class BaseService {
    constructor(){
        this._apiBase = 'http://0.0.0.0:8000/';
    }
    async getResource(url){
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok){
            throw new Error(`Could not fetch ${url} Received: ${res.status}`)
        }
        return await res.json();
    }
}

export default BaseService
