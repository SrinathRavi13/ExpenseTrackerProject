import React from 'react'
import { Row, Col, Container, Button, Modal } from 'react-bootstrap'
import Table from './ExpensesTable'
import Form from './AddExpenseForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetch_Api_Data, api_UpdateExpense, api_DeleteExpense,api_AddExpense } from '../actions/actions'

/**
 * Home page
 * The landing page of the application
 * @author - Srinath Ravi <srinath_ravi@hotmail.com>
 */
class HomePage extends React.Component {

    /** Local state - Handle modal popup Add Expense */
    state = { showModal_AddExpense: false }

    /** Called after all the DOM elements got loaded */
    componentDidMount() {
        /** Fetch expenses list */
        this.props.fetch_Api_Data()
    }

    /** Close Add Expense Modal popup */
    handleClose = () => {
        this.setState({ showModal_AddExpense: false });
    }

    /** Close the Modal popup  once Expense Added*/
    handleSave = (val) => {
        this.setState({ showModal_AddExpense: val });
    }

    /** Open Add Expense Modal popup */
    handleOpenModal = () => {
        this.setState({ showModal_AddExpense: true });
    }

    /** Update Expense */
    handle_UpdateExpense = (item) => {
        this.props.api_UpdateExpense(item);
    }

    /** Delete Expense */
    handle_DeleteExpense = (item_id) => {
        this.props.api_DeleteExpense(item_id);
    }

    /** Save Expense */
    handleSave = (expense) => {
        let expenseList = this.props.expenseList;
        expense["id"] = (expenseList.length > 0) ? Math.max.apply(null, expenseList.map(e => e.id)) + 1 : 1;
        this.props.api_AddExpense(expense);
        this.handleClose(false);
    }

    render() {

        /** Render Home Page*/
        const { totalAmount, totalTax } = this.props;
        const { showModal_AddExpense } = this.state;

        return (
            <React.Fragment key="HomePage">
                <React.Fragment key="Header">
                    <Container fluid>
                        <Row>
                            <Col>
                                <h1>Expense Tracker</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8}>
                                <h5>The sub-total of expenses is : {totalAmount}</h5>
                                <h5>The total taxes is : {totalTax}</h5>
                            </Col>
                            <Col>
                                <Button variant="success" onClick={this.handleOpenModal}>Add new expense</Button>
                            </Col>
                        </Row>
                    </Container>
                </React.Fragment>
                <React.Fragment key="body">
                    <Table
                        List = {this.props.expenseList}
                        handle_UpdateItem={this.handle_UpdateExpense}
                        handle_DeleteItem={this.handle_DeleteExpense}
                    />
                </React.Fragment>
                <React.Fragment key="popup">
                    <Modal show={showModal_AddExpense} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Expense</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form handleSave={this.handleSave} />
                        </Modal.Body>
                    </Modal>
                </React.Fragment>
            </React.Fragment>
        );
    }
}

/** Map the Redux state value to the component properties 
 * @param {object} state - Redux State 
 * @return {expenseList, totalAmount, TotalTax}
 */
const mapStateToProps = state => {
    return {
        expenseList: state.expenseList,
        totalAmount: state.totalAmount,
        totalTax: state.totalTax
    }
}

/**
 * Map actions to props
 * @param {callback} dispatch 
 * @return {Object} - Actions maped to props
 */
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetch_Api_Data: fetch_Api_Data,
        api_UpdateExpense: api_UpdateExpense,
        api_DeleteExpense: api_DeleteExpense,
        api_AddExpense: api_AddExpense
    }, dispatch)
}

/** Connect Redux State and Actions to the Component*/
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
