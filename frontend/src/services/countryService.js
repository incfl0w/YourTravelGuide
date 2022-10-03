import BaseService from "./baseService";

class CountryService extends BaseService{

async getAllCountries(){
    const res = await this.getResource('api/v1/countries/?format=json');
    
    return res
}

async getCountry(id){
    const res = await this.getResource(`api/v1/countries/${id}/?format=json`);
    
    return res
}

}

export default CountryService;
