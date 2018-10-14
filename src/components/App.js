import React, { Component } from 'react';
import { FormGroup, Label, Input, Form, Row, Button, Col, FormFeedback } from 'reactstrap';
import validator from './validator';
import getData from './getData';
import DisplayInfo from './DisplayInfo'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      date: '',
      gbpAmount: '',
      country: '',
      errors: {},
      infoToDisplay: {}
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  isValid(){
    const {errors, isValid} = validator(this.state)
    this.setState({errors: errors})
    return isValid
  }

  submit(e){
    e.preventDefault();
    if(this.isValid()){
      getData(this.state)
      .then(info => {
        this.setState({infoToDisplay: info})
      })
      .catch(err => {
        console.log("Someting wrong with fetching: ", err)
      })
    }
  }

  render() {
    const {errors, infoToDisplay} = this.state;
    return (
      <div className="app">
        <Form>
          <Row form>

            <Col sm={4}>
              <FormGroup>
                <Label><b>Date of transfer</b></Label>
                <Input
                  invalid = {errors.date !== undefined}
                  onChange={this.onChange}
                  type="date" 
                  name="date"
                  value={this.state.date}
                  placeholder="enter date" />
                  <FormFeedback>{errors.date}</FormFeedback>
              </FormGroup>
            </Col>

            <Col sm={4}>
              <FormGroup>
                <Label><b>GBP amount</b></Label>
                <Input
                  invalid = {errors.gbpAmount !== undefined}
                  onChange={this.onChange} 
                  type="number" 
                  name="gbpAmount"
                  value={this.state.gbpAmount}
                  placeholder="British Pounds" />
                  <FormFeedback>{errors.gbpAmount}</FormFeedback>
              </FormGroup>
            </Col>

            <Col sm={4}>
              <FormGroup>
                <Label><b>Country</b></Label>
                <Input
                  invalid = {errors.country !== undefined}
                  value={this.state.country}
                  onChange={this.onChange}
                  type="select" 
                  name="country">
                    <option>select country</option>
                    <option>Poland</option>
                    <option>Romania</option>
                    <option>Spain</option>
                </Input>
                <FormFeedback >{errors.country}</FormFeedback >
              </FormGroup>
            </Col>
          </Row>
        </Form>

        <Button onClick={this.submit} color='primary' block>Check provided transaction</Button>
        
        <DisplayInfo {...infoToDisplay}/>
      </div>
    );
  }
}

export default App;
