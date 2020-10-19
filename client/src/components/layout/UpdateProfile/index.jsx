import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';

const user = localStorage.getItem('token');
export default class Details extends Component {
    constructor(props){
        super(props);
        this.state = { userData : [], name: '', email: '', phone: '', aline1: '', aline2: '', acity: '', astate: '', acountry: '', apincode: ''}
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillMount(){
        axios.get("/api/profile_import", {params: {uid: user}}).then( (res) => {
            this.setState({
                userData : res.data
              });
            }
        )
    }
    onChange(event){
      switch(event.target.id){
        case("name"):this.setState({name: event.target.value});break;
        case("phone"):this.setState({phone: event.target.value});break;
        case("email"):this.setState({email: event.target.value});break;
        case("aline1"):this.setState({aline1: event.target.value});break;
        case("aline2"):this.setState({aline2: event.target.value});break;
        case("acity"):this.setState({acity: event.target.value});break;
        case("astate"):this.setState({astate: event.target.value});break;
        case("acountry"):this.setState({acountry: event.target.value});break;
        case("apincode"):this.setState({apincode: event.target.value});break;
      }
    }
    onSubmit(event){
      event.preventDefault();
      var inputData = [this.state.name,this.state.phone,this.state.email,this.state.aline1,this.state.aline2,this.state.acity,this.state.astate,this.state.acountry,this.state.apincode]
      axios.post("/api/profile_update", {current:this.state.userData,update:inputData}).then(res => {
        alert("Account details updated succesfully!");
        window.location.reload(false);
      }).catch(err =>{
        console.log(err);
        console.log(err.response);
        alert("Unable to update records")
      });
    }
    render() {
        return (
            <div>
            <h1>Account Data: </h1><br/>
              <p>Name: {this.state.userData.name}</p>
              <p>Phone: {this.state.userData.phone}</p>
              <p>Email: {this.state.userData.email}</p>
              <p>Address: {this.state.userData.line1} {this.state.userData.line2}, {this.state.userData.city}, {this.state.userData.state}, {this.state.userData.pincode} {this.state.userData.country}</p>
              <br />
              <h1>Update records below: </h1>
              <br />
              <Form onSubmit={this.onSubmit}>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name:" defaultValue={this.state.userData.name} onChange={this.onChange} />
                  </Form.Group>

                  <Form.Group controlId="phone">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control type="tel" placeholder="Mobile" defaultValue={this.state.userData.phone} onChange={this.onChange} />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Email:" defaultValue={this.state.userData.email} onChange={this.onChange} />
                  </Form.Group>

                  <Form.Group controlId="aline1">
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control type="text" placeholder="Line 1:"  defaultValue={this.state.userData.line1}  onChange={this.onChange} />
                  </Form.Group>

                  <Form.Group controlId="aline2">
                    <Form.Label>Address Line 2</Form.Label>
                    <Form.Control type="text" placeholder="Line 2 (Optional):"   defaultValue={this.state.userData.line2} onChange={this.onChange} />
                  </Form.Group>

                  <Form.Group controlId="acity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City:"  defaultValue={this.state.userData.city} onChange={this.onChange} />
                  </Form.Group>

                  <Form.Group controlId="astate">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="State:"  defaultValue={this.state.userData.state} onChange={this.onChange} />
                  </Form.Group>

                  <Form.Group controlId="acountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Country:"  defaultValue={this.state.userData.country} onChange={this.onChange}/>
                  </Form.Group>

                  <Form.Group controlId="apin">
                    <Form.Label>Pin Code</Form.Label>
                    <Form.Control type="text" placeholder="Pincode:"  defaultValue={this.state.userData.pincode} onChange={this.onChange} />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
              </Form>
            </div>

        )
    }
}
