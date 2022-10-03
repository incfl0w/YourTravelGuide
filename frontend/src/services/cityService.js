import BaseService from "./baseService";

class CityService extends BaseService {

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