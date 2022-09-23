import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import CountryService from '../../../services/countryService'
import CountryDescription from '../../../components/CountryDescription'
// import Header from '../../../components/header'
import {Button,Card,Col,Container,Row,} from "react-bootstrap"
import Image from "../../../components/CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, } from "@fortawesome/free-brands-svg-icons"
import profile from "../../../data/profile.json"

// datatable
import Link from "next/link"
import { Form } from "react-bootstrap"
import LOCAL_HOST from '../../../data/global_vars/local_host'


import { DataTable } from "simple-datatables"
import {  useRef } from "react"

// end datatable



export default function PostPage() {
  const countryService = new CountryService()
  const router = useRouter()
  const id = router.query.id
  // console.log(`ID:${id}`)
  const [country, setCountry] = useState({})

//  datatable
const dataTableRef = useRef(false)
const [tableLoaded, setTableLoaded] = useState(false)
const categoryBulkActionRef = useRef(false)
useEffect(() => {
  const dataTable = new DataTable(dataTableRef.current, {
    columns: [
      // Disable sorting on the first column
      { select: [0], sortable: false },
    ],
  })
  function adjustTableColumns() {
    let columns = dataTable.columns()

    if (window.innerWidth > 900) {
      columns.show([1, 3, 4, 5])
    } else if (window.innerWidth > 600) {
      columns.hide([4, 5])
      columns.show([1, 3])
    } else {
      columns.hide([1, 3, 4, 5])
    }
  }

  adjustTableColumns()
  window.addEventListener("resize", adjustTableColumns)

  dataTable.on("datatable.init", function () {
    const header = document.querySelector(
      ".dataTable-top .dataTable-dropdown"
    )
    header.prepend(categoryBulkActionRef.current)

    const input = document.querySelector(".dataTable-input")
    input.classList.add("form-control", "form-control-sm")

    const dataTableSelect = document.querySelector(".dataTable-selector")
    dataTableSelect.classList.add("form-select", "form-select-sm")

    const dataTableContainer = document.querySelector(".dataTable-container")
    dataTableContainer.classList.add("border-0")

    setTableLoaded(true)
  })
}, [])
  // end datatable
  
    
    useEffect(() => {
      const id = router.query.id
      if (id){
        countryService.getCountry(id)
      .then(data => setCountry(data))
      }
      
    }, [id]);

    return (
      <Container fluid className="px-lg-4 px-xl-5"> 
      <section>
        <Row>
          <Col lg={4}>
            <Card className="card-profile mb-4">
              <Card.Header
                className="overflow-hidden"
                style={{ backgroundImage: `url(${country.photo})` }}
              ></Card.Header>
              <Card.Body >
                <div
                  className="card-profile-img mx-auto d-flex align-center"
                  style={{ maxHeight: "8rem" }}
                >
                  <div className="position-relative overflow-hidden rounded-circle">
                    {country.photo && <Image
                      src={country.photo}
                      layout="fixed"
                      width={122}
                      height={122}
                      priority
                      alt={profile.name}
                    />}
                  </div>
                </div>

                <h3 className="mb-3 text-center">{country.name}</h3>
                <p className="mb-4"><b>Capital</b>: Kiev</p>
                <p className="mb-4"><b>Safety:</b> 3 of 5</p>
                <p className="mb-4"><b>Population:</b> 113131313</p>
                <p className="mb-4"><b>Currency:</b> USD</p>
                <p className="mb-4"><b>Languages:</b> English, Spanish</p>
                <p className="mb-4"><b>Weather:</b> Tropic</p>
                <p className="mb-4"><b>Understanding English:</b> Mostly yes</p>



                <Button variant="outline-dark" size="sm">
                  <FontAwesomeIcon icon={faTwitter} /> Follow
                </Button>
              </Card.Body>
            </Card>
            
            
          </Col>
          <Col lg={8}>
            {profile.messages && <CountryDescription profile={profile} country={country}/>}
            
          </Col>
        </Row>
      </section>
      {/* DataTable */}
      <section className="mb-5">
        <Card className="card-table">
          <div
            className={`preload-wrapper  ${tableLoaded ? "opacity-10" : ""}`}
          >
            <table
              className="table table-hover align-middle mb-0"
              ref={dataTableRef}
            >
              <thead>
                <tr>
                  <th> </th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Categories</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {country.cities && country.cities.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Check type="checkbox" />
                    </td>
                    <td>
                      <Link href={`${LOCAL_HOST}cities/${item.id}`}>
                        <a className="text-decoration-none text-reset d-flex align-items-center">
                          <div
                            className="d-inline-block me-3"
                            style={{ width: "100px" }}
                          >
                            <Image
                              layout="responsive"
                              width={100}
                              height={66}
                              src={item.photo}
                              alt={item.name}
                              loading="eager"
                              className="img-fluid rounded"
                              sizes="100px"
                            />
                          </div>
                          <strong>{item.name}</strong>
                        </a>
                      </Link>
                    </td>
                    <td>{item.id}</td>
                    <td>{item.description}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <span className="me-2" ref={categoryBulkActionRef}>
              <Form.Select size="sm" className="d-inline w-auto me-1">
                <option>Bulk Actions</option>
                <option>Delete</option>
              </Form.Select>

              <Button
                size="sm"
                variant="outline-primary"
                className="align-top mb-1 mb-lg-0"
              >
                Apply
              </Button>
            </span>
          </div>
        </Card>
      </section>
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