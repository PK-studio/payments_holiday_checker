import React, { Component } from 'react';
import { FormGroup, Label, Input, Form, Row, Button, Col, FormFeedback } from 'reactstrap';
import Validator from './Validator';
import getCalendar from './getData';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      date: '',
      gbp: '',
      country: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  isValid(){
    const {errors, isValid} = Validator(this.state)
    this.setState({errors: errors})
    return isValid
  }

  submit(){
    if(this.isValid()){
      console.log(getCalendar(this.state))
      getCalendar(this.state)
    }
  }

  render() {
    const {errors} = this.state;
    return (
      <div className="app">
        <Form>
          <Row form>

            <Col sm={4}>
              <FormGroup>
                <Label><b>Date</b></Label>
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
                  invalid = {errors.gbp !== undefined}
                  onChange={this.onChange} 
                  type="number" 
                  name="gbp"
                  value={this.state.gbp}
                  placeholder="British Pounds" />
                  <FormFeedback>{errors.gbp}</FormFeedback>
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
      </div>
    );
  }
}

export default App;
