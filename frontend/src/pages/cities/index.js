import React, { useEffect, useState } from "react"
import CmsMedia from "../../components/cmsMedia";
import CityService from "../../services/cityService";
import LOCAL_HOST from "../../data/global_vars/local_host";

const Cities = () => {
  const cityService = new CityService()
  const [cities, setCities] = useState([])
  const options = [['popularity', 'life quality', 'revelant']]
  useEffect(() => {
    cityService.getAllCities()
      .then(data => setCities(data))
  }, [])
  return (
    <>
      <CmsMedia
        data={cities}
        path={`${LOCAL_HOST}cities/`}
        title={"Cities"}
        options={options}
      />
    </>
  );
}

export default Cities;





