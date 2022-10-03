import React, { useRef, useEffect } from 'react';
import { Button, Card } from "react-bootstrap"
import { DataTable } from "simple-datatables"
import Image from "./CustomImage"
import PropTypes from 'prop-types';
import Link from "next/link"
import { Form } from "react-bootstrap"
import LOCAL_HOST from '../data/global_vars/local_host';

const CitiesDataTable = ({ tableLoaded, setTableLoaded, country }) => {
    const dataTableRef = useRef(false)
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
    return (
        <div>
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
        </div>
    );
}

CitiesDataTable.propTypes = {
    tableLoaded: PropTypes.bool, 
    setTableLoaded:PropTypes.func, 
    country: PropTypes.object
}

export default CitiesDataTable;
