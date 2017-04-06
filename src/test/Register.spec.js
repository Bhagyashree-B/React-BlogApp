import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import Register from '../components/Register';
import { ref, firebaseAuth } from '../config/constants'
import sinon from 'sinon';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const testSchema = new Schema({
  name: { type: String, required: true },
   email: { type: String, required: true },
    password: { type: String, required: true }
});
//Create a new collection called 'Name1'
const Name1 = mongoose.model('Name1', testSchema);


describe('<Register>', function () {

  before(function (done) {
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

 const shallowWrapper = shallow(<Register/>);
 const mountWrapper = mount(<Register/>);

var usernameData = 'username'
var passwordData = "udcfhucef@A12"
var emailData = "abc@mailinator.com"


 it('renders without exploding', () => {
   expect(shallow(  <Register /> ).length ).to.eql(1);
 });

 // it('should be a div element', () => {   
 //    expect(shallowWrapper.type()).to.eql('div');
 //  });

 it('should have an input for the username, email and password', function () {
    expect(shallowWrapper.find('input')).to.have.length(3);
  });

  it('should have an regisrtration button for register users ', function () {   
    expect(shallowWrapper.find('button')).to.have.length(1);
  });

 it('should have props with an string input for username', () => {       
    mountWrapper.setProps({ username : usernameData });
    expect(mountWrapper.props().username).to.be.defined;
    expect(mountWrapper.props().username).to.equal(usernameData);
    });

  it('Entered string input for username', () => {
      shallowWrapper.setState({ username: usernameData });
    expect(shallowWrapper.state().username).to.equal(usernameData);

  });

 it('should have props with an string input for email', () => {
    mountWrapper.setProps({ email : emailData });
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    expect(true).to.equal(re.test(mountWrapper.props().email));          
    });

it('Entered string input for email', () => {  
    shallowWrapper.setState({ email : emailData });
    expect(shallowWrapper.state().email).to.equal(emailData);
  });
// at least 8 characters
// at least 1 numeric character
// at least 1 lowercase letter
// at least 1 uppercase letter
// at least 1 special character
    it('should have props with an string input for password', () => {
      mountWrapper.setProps({ password : passwordData });
      var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
      expect(true).to.equal(re.test(mountWrapper.props().password));      
    });  

    it('Entered string input for password', () => {
    shallowWrapper.setState({ password : passwordData });
    expect(shallowWrapper.state().password).to.equal(passwordData);
  });

   
   describe('Login', function () {
      it('Submit button click event',  function(done) { 
      const handleSubmit = sinon.spy();
      const wrapper = mount(<Register/>);
      wrapper.setState({  username : usernameData  });
      wrapper.setState({ email : emailData });
      wrapper.setState({ password : passwordData });
      wrapper.find('.signupbtn').simulate('click');
      // mountWrapper.find('form').simulate('submit')
      // expect(handleSubmit.called).to.equal(true)

      var testName = Name1({
        name: usernameData,
        email: emailData,
        password:passwordData
      }); 
      testName.save(done);

      expect(wrapper.state().username).to.equal(usernameData);
      expect(wrapper.state().email).to.equal(emailData);
      expect(wrapper.state().password).to.equal(passwordData);
    }); 

    it('Dont save incorrect format to database', function(done) {
      //Attempt to save with wrong info. An error should trigger
      var wrongSave = Name1({
        notName: 'Not Mike',
        notEmail:'Not Email',
        notPassword:'Not password'
      });
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });

    it('Should retrieve data from test database', function(done) {
      //Look up the 'Mike' object previously saved.
      Name1.find({email: "emailData"}, (err, name) => {
        if(err) {throw err;}
        if(emailData.length === 0) {throw new Error('No data!');}
        done();
      });
    });
  });

          //After all tests are finished drop database and close connection
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});