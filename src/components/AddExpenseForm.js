import React from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { api_AddExpense } from '../actions/actions'
import * as ConstVal from '../constants/contantValues'

const propTypes = {
    handleSave: PropTypes.func.isRequired
}

class AddExpenseForm extends React.PureComponent {

    state = {
        description: "",
        amount: 0,
        taxes: 0,
        date: ConstVal.DATE_VALUE,
        isClear: false
    }

    handleSave = (e) => {
        e.preventDefault();
        const { description, amount, taxes } = this.state;
        
        if(description === "" && amount === 0){
            this.props.handleSave(false);
            return false;
        }


        let expense = {id: 0, description: description, amount: amount, taxes: taxes, date: ConstVal.DATE_VALUE }
        let expenses = this.props.expenseList;
        expense.id = (expenses.length > 0) ? Math.max.apply(null, expenses.map(e => e.id)) + 1 : 1;
        this.props.api_AddExpense(expense);
        this.props.handleSave(false);
    }

    handleDescription = (e) => {
        let value = e.target.value;
        this.setState({ description: value });
    }

    handleAmount = (e) => {
        let value = e.target.value;
        let tax = Number(value) * ConstVal.TAXPERCENTAGE;
        this.setState({ amount: value, taxes: tax });
    }

    handleClear = (e) => {
        e.preventDefault();
        this.setState({
            description: "",
            amount: 0,
            taxes: 0
        })
    }

    render() {

        const { description, amount, taxes } = this.state;

        return (
            <Container fluid>
                <form>
                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text" className="form-control" onChange={this.handleDescription}
                            id="description" value={description} />
                    </div>
                    <div className="form-group">
                        <label>Amount:</label>
                        <input type="number" className="form-control" onChange={this.handleAmount}
                            id="amount" value={amount} />
                    </div>
                    <div className="form-group">
                        <label>Taxes(15%): {taxes}</label>
                    </div>
                    <div style={{ float: "right" }}>
                        <button className="btn btn-secondary ml-1 mr-1" onClick={this.handleClear}>Clear</button>
                        <button type="submit" className="btn btn-primary ml-1 mr-1" onClick={this.handleSave}>Submit</button>
                    </div>
                </form>
            </Container>
        );
    }
}


AddExpenseForm.propTypes = propTypes;

const mapStateToProps = state => {
    return {
        expenseList: state.expenseList
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        api_AddExpense: api_AddExpense
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);

