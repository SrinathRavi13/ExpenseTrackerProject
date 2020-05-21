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
        this.props.api_AddExpense(expense);
        this.handleClose(false);
    }

    render() {

        /** Render Home Page*/
        const { totalAmount, totalTax } = this.props;
        const { showModal_AddExpense } = this.state;

        return (
            <React.Fragment>
                <div data-test="Header">
                    <Container fluid>
                        <Row>
                            <Col>
                                <h1 data-test="title">Expense Tracker</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8}>
                                <h5 data-test="totalAmount">The sub-total of expenses is : {totalAmount}</h5>
                                <h5 data-test="totalTax">The total taxes is : {totalTax}</h5>
                            </Col>
                            <Col>
                                <Button data-test="addExpenseForm" variant="success" onClick={this.handleOpenModal}>Add new expense</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div data-test="body">
                    <Table data-test="expense_table"
                        List = {this.props.expenseList}
                        handle_UpdateItem={this.handle_UpdateExpense}
                        handle_DeleteItem={this.handle_DeleteExpense}
                    />
                </div>
                <div data-test="modalPopup">
                    <Modal show={showModal_AddExpense} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title data-test="modalPopup_Title">Add Expense</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form data-test="expense_form" handleSave={this.handleSave} />
                        </Modal.Body>
                    </Modal>
                </div>
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
        expenseList: state.expenseReducer.expenseList,
        totalAmount: state.expenseReducer.totalAmount,
        totalTax: state.expenseReducer.totalTax
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
