class CountryService {
    constructor(){
        this._apiBase = 'http://127.0.0.1:8000/';
    }

async getResource(url){
    const res = await fetch(`${this._apiBase}${url}`);
    if(!res.ok){
        throw new Error(`Could not fetch ${url} Recieved ${res.status}`)
    }
    return await res.json();
}

async getAllCountries(){
    const res = await this.getResource('api/v1/countries/?format=json');
    console.log(res)
    return res
}

async getCountry(id){
    const res = await this.getResource(`api/v1/countries/${id}/?format=json`);
    console.log(res)
    return res
}

}

export default CountryService;
