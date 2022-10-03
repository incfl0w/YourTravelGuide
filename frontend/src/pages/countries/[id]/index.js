import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import CountryService from '../../../services/countryService'
import { Container } from "react-bootstrap"
import CountryInfo from '../../../components/CountryInfo'
import isEmpty from '../../../custom_functions/isEmpty'
import CitiesDataTable from '../../../components/citiesDataTable'

export default function PostPage() {
  const countryService = new CountryService()
  const router = useRouter()
  const id = router.query.id
  const [country, setCountry] = useState({})
  const [tableLoaded, setTableLoaded] = useState(false)
  useEffect(() => {
    const id = router.query.id
    if (id) {
      countryService.getCountry(id)
        .then(data => setCountry(data))
    }

  }, [id]);
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <section>
        {!isEmpty(country) && <CountryInfo country={country} />}
      </section>
      {/* DataTable */}
      {!isEmpty(country) && <CitiesDataTable
        tableLoaded={tableLoaded}
        setTableLoaded={setTableLoaded}
        country={country}
      />}
      {/* EndDataTable */}
    </Container>
  )
  // return (
  //   <>
  //     {/* <Header /> */}
  //     <h1>Post: {id}</h1>
  //     <ul>
  //       <li>
  //         <Link href={`/post/${id}/first-comment`}>
  //           <a>{country.name}</a>
  //         </Link>
  //       </li>
  //       <li>
  //         <Link href={`/post/${id}/second-comment`}>
  //           <a>{country.description}</a>
  //         </Link>
  //       </li>
  //     </ul>
  //   </>
  // )
}