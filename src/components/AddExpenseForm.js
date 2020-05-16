import React from 'react'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types'
import * as ConstVal from '../constants/contantValues'

/** Defining component Properties */
const propTypes = {
    handleClose: PropTypes.func.isRequired
}

/** Class Basic Form */
class Form extends React.PureComponent {

    /** Local state values */
    state = {
        description: "",
        amount: 0,
        taxes: 0,
        date: ConstVal.DATE_VALUE,
        isClear: false
    }

    /** Save form data */
    handleSave = (e) => {
        e.preventDefault();
        const { description, amount, taxes } = this.state;
        
        /** Close the form if no entry */
        if(description === "" && amount === 0){
            this.props.handleClose(false);
            return false;
        }

        let expense = {id: 0, description: description, amount: amount, taxes: taxes, date: ConstVal.DATE_VALUE }
        this.props.handleSave(expense);
    }

    /** Handle Description form */
    handleDescription = (e) => {
        let value = e.target.value;
        this.setState({ description: value });
    }

    /** Handle Amount form */
    handleAmount = (e) => {
        let value = e.target.value;
        let tax = Number(value) * ConstVal.TAXPERCENTAGE;
        this.setState({ amount: value, taxes: tax });
    }

    /** Clear form Data */
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
                    {/** Description */}
                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text" className="form-control" onChange={this.handleDescription}
                            id="description" value={description} />
                    </div>
                    {/** Amount */}
                    <div className="form-group">
                        <label>Amount:</label>
                        <input type="number" className="form-control" onChange={this.handleAmount}
                            id="amount" value={amount} />
                    </div>
                    {/** Tax */}
                    <div className="form-group">
                        <label>Taxes(15%): {taxes}</label>
                    </div>
                    {/** Buttons */}
                    <div style={{ float: "right" }}>
                        <button className="btn btn-secondary ml-1 mr-1" onClick={this.handleClear}>Clear</button>
                        <button type="submit" className="btn btn-primary ml-1 mr-1" onClick={this.handleSave}>Submit</button>
                    </div>
                </form>
            </Container>
        );
    }
}

/** Assigning component Properties */
Form.propTypes = propTypes;

/**Exporting Form */
export default Form;

