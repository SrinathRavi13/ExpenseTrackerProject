import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container, Button } from 'react-bootstrap'
import * as ConstVal from '../constants/contantValues'

/** Defining properties*/
const propTypes = {
    Item: PropTypes.object.isRequired,
    handle_UpdateItem: PropTypes.func.isRequired,
    handle_DeleteItem: PropTypes.func.isRequired
}

/** Item class */
class TableItem extends React.PureComponent {
    /** Local State */
    state = {
        _id: this.props.Item._id,
        description: this.props.Item.description,
        amount: this.props.Item.amount,
        taxes: this.props.Item.taxes,
        date: this.props.Item.date,
        isEdit: false
    }

    /** Description field on change */
    handleDescription = (e) => {
        let value = e.target.value;
        this.setState({ description: value });
    }

    /** Amount field on change */
    handleAmount = (e) => {
        let value = e.target.value;
        let tax = value * ConstVal.TAXPERCENTAGE;
        this.setState({ amount: value, taxes: tax });
    }

    /** Edit button event */
    handleEdit = () => {
        this.setState({ isEdit: !this.state.isEdit });
    }

    /** Update an Item - Update button event*/
    handle_UpdateItem = () => {
        const { _id, description, amount, taxes } = this.state;
        const Item = {
            _id: _id,
            description: description,
            amount: Number(amount),
            taxes: Number(taxes),
            date: ConstVal.DATE_VALUE
        }
        this.setState({
            isEdit: false,
            date: Item.date
        });

        this.props.handle_UpdateItem(Item);
    }

    /** Delete an Item */
    handle_DeleteItem = () => {
        const { _id } = this.state;
        this.props.handle_DeleteItem(_id);
    }

    render() {

        let { isEdit, _id, description, amount, taxes, date } = this.state;

        let _date = (date === undefined) ? new Date(new Date().toISOString()) : new Date(new Date(date).toISOString());

        const dateTimeFormat = new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric'
        })

        const [{ value: month }, , { value: day }, , { value: year }, , { value: hour }, , { value: minute }] = dateTimeFormat.formatToParts(_date)

        let newDate = `${year}-${month}-${day} at ${hour}:${minute}`

        return (
            <div>
                {/** Table Item */}
                <Container fluid>
                    <Row>
                        {/** Description */}
                        <Col xs={2}>
                            {isEdit ? (<input type="text" onChange={(e, i) => this.handleDescription(e, i)} value={description} />) : (<label>{description}</label>)}
                        </Col>
                        {/** Amount */}
                        <Col xs={2}>
                            {isEdit ? (<input type="number" onChange={this.handleAmount} value={amount} />) : (<label>{amount}</label>)}
                        </Col>
                        {/** Taxes */}
                        <Col xs={2}>
                            <label>{Number(taxes)}</label>
                        </Col>
                        {/** Date */}
                        <Col xs={2}>
                            <label>{newDate}</label>
                        </Col>
                        {/** Buttons - Edit, Update, Delete */}
                        <Col xs={2}>
                            {isEdit ? (<Button className="btn btn-primary ml-1 mr-1" size="sm" onClick={this.handle_UpdateItem}>Update</Button>) :
                                (<Button className="btn btn-warning ml-1 mr-1" size="sm" onClick={this.handleEdit}>Edit</Button>)}
                            <Button size="sm" className="btn btn-danger ml-1 mr-1" onClick={this.handle_DeleteItem}>Delete</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

/**Assigning properties to the class*/
TableItem.propTypes = propTypes;

/** Exporting Item class to be reusable*/
export default TableItem;
