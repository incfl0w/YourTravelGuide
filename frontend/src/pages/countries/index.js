import "react-image-lightbox/style.css"
import React, {useEffect, useState} from "react"
import CmsMedia from "../../components/cmsMedia";
import CountryService from "../../services/countryService";
import LOCAL_HOST from "../../data/global_vars/local_host";


const Countries = () => {
  const countryService = new CountryService()
  const [countries, setCountries] = useState([])
  const options = [['asia', 'europe', 'america'], 
                  ['popularity', 'life quality', 'revelant'] ]
  useEffect(()=> {
    countryService.getAllCountries()
    .then(data => setCountries(data))
  }, [])
  return (
    <>
    <CmsMedia 
    data={countries} 
    path={`${LOCAL_HOST}countries/`}
    title={"Countries"}
    options={options}
    />
    </>
  );
}

export default Countries;


