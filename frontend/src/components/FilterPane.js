import React from 'react';
import PropTypes from 'prop-types'
import {Card,Form,Row,Col} from "react-bootstrap"
import capitalizeFirstLetter from '../custom_functions/capitalizeFirstLetter';



// const options_continent = 
// const options_sort = 

const renderFilterOptions = (options) =>{
    return (
        <Form.Select className="d-inline-block w-auto me-3 mb-1 mb-lg-0">
            {options.map((item, i) => {
                return <option key={i} value={item}>{capitalizeFirstLetter(item)}</option>
            })}
        </Form.Select>
    )
}

const FilterPane = ({title, options}) => {
    return (
        <div>
            <Card className="mb-5">
                <Card.Body>
                    <Row>
                        <Col sm={6}>
                            {options.map(option => renderFilterOptions(option))}
                        </Col>
                        <Col sm={6} className="text-md-end">
                            <Form.Label
                                className="text-muted text-sm me-2 d-none d-lg-inline-block"
                                htmlFor="media_search"
                            >
                                Search
                            </Form.Label>
                            <Form.Control
                                className="form-control d-inline-block w-auto"
                                id="media_search"
                                type="search"
                                placeholder={title}
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}



FilterPane.propTypes = {
    title: PropTypes.string,
    options: PropTypes.array 
}

export default FilterPane;
