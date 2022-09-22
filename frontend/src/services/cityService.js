class CityService {
    constructor(){
        this._apiBase = 'http://127.0.0.1:8000/';
    }


async getResource(url){
    const res = await fetch(`${this._apiBase}${url}`);
    if(!res.ok){
        throw new Error(`Could not fetch ${url} Received: ${res.status}`)
    }
    return await res.json();
}



async getAllCities(){
    const res = await this.getResource('api/v1/cities/?format=json');
    console.log("getAllCities")
    console.log(res)
    return res
}

async getCity(id){
    const res = await this.getResource(`api/v1/cities/${id}/?format=json`);
    console.log("getCity")
    console.log(res)
    return res
}

}
export default CityService;