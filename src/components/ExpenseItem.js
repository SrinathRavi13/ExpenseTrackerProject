import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { api_UpdateExpense, api_DeleteExpense } from '../actions/actions'
import { bindActionCreators } from 'redux'
import * as ConstVal from '../constants/contantValues'

const propTypes = {
    expenseItem: PropTypes.object.isRequired
}

class ExpenseItem extends React.PureComponent {
    state = {
        id : this.props.expenseItem.id,
        description: this.props.expenseItem.description,
        amount: this.props.expenseItem.amount,
        taxes: this.props.expenseItem.taxes,
        date: this.props.expenseItem.date,
        isEdit: false
    }

    handleDescription = (e) => {
        let value = e.target.value;
        this.setState({ description: value });
    }

    handleAmount = (e) => {
        let value = e.target.value;
        let tax = value * ConstVal.TAXPERCENTAGE;
        this.setState({ amount: value, taxes: tax });
    }

    handleEdit = () => {
        this.setState({ isEdit: !this.state.isEdit });
    }

    handleUpdate = () => {
        const { id, description, amount, taxes } = this.state;
        const expenseItem = {
            id : id,
            description: description,
            amount: Number(amount),
            taxes: Number(taxes),
            date: ConstVal.DATE_VALUE
        }
        this.setState({
            isEdit: false,
            date : expenseItem.date
        });

        this.props.api_UpdateExpense(expenseItem);
    }

    handleDelete = () => {
        const { id } = this.state;
        this.props.api_DeleteExpense(id);
    }

    render() {

        let { isEdit, description, amount, taxes, date } = this.state;

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
                <Container fluid>
                    <Row>
                        <Col xs={2}>
                            {isEdit ? (<input type="text" onChange={(e, i) => this.handleDescription(e, i)} value={description} />) :(<label>{description}</label>)}
                        </Col>
                        <Col xs={2}>
                            {isEdit ? (<input type="number" onChange={this.handleAmount} value={amount} />) : (<label>{amount}</label>)}
                        </Col>
                        <Col xs={2}>
                            <label>{Number(taxes)}</label>
                        </Col>
                        <Col xs={2}>
                            <label>{newDate}</label>
                        </Col>
                        <Col xs={2}>
                            {isEdit ? (<Button className="btn btn-primary ml-1 mr-1" size="sm" onClick={this.handleUpdate}>Update</Button>) :
                                    (<Button className="btn btn-warning ml-1 mr-1" size="sm" onClick={this.handleEdit}>Edit</Button>)}
                            <Button size="sm" className="btn btn-danger ml-1 mr-1" onClick={this.handleDelete}>Delete</Button>
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        api_UpdateExpense: api_UpdateExpense,
        api_DeleteExpense: api_DeleteExpense
    }, dispatch)
}

ExpenseItem.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(ExpenseItem);