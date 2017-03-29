import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Register from '../src/components/Register';

describe('<Register>', function () {
var usernameData = 'username'
var passwordData = "udcfhucef"
var emailData = "abc@aa.com"

 it('should be a div element', () => {
   const wrapper = shallow(<Register/>);
    expect(wrapper.type()).to.eql('div');
  });

 it('should have an input for the username, email and password', function () {
    const wrapper = shallow(<Register/>);
    expect(wrapper.find('input')).to.have.length(3);
  });

  it('should have an regisrtration button for register users ', function () {
    const wrapper = shallow(<Register/>);
    expect(wrapper.find('button')).to.have.length(1);
  });

 it('should have props with an string input for username', () => {
    const wrapper = mount(<Register/>);    
    wrapper.setProps({ username : usernameData });
    expect(wrapper.props().username).to.be.defined;
    expect(wrapper.props().username).to.equal(usernameData);
    });

  it('Entered string input for username', () => {
    const wrapper = shallow(<Register/>); 
    wrapper.setState({ username: usernameData });
    expect(wrapper.state().username).to.equal(usernameData);
  });

 it('should have props with an string input for email', () => {
    const wrapper = mount(<Register/>);
    wrapper.setProps({ email : emailData });
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    expect(true).to.equal(re.test(wrapper.props().email));          
    });

   it('Entered string input for email', () => {
    const wrapper = shallow(<Register/>);
    wrapper.setState({ email : emailData });
    expect(wrapper.state().email).to.equal(emailData);
  });
// at least 8 characters
// at least 1 numeric character
// at least 1 lowercase letter
// at least 1 uppercase letter
// at least 1 special character
    it('should have props with an string input for password', () => {
    const wrapper = mount(<Register/>);
    wrapper.setProps({ password : passwordData });
    expect(wrapper.props().password).to.be.defined;
    var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    var passwordRegex = wrapper.props().password; 
    if (passwordRegex == '' || !re.test(passwordRegex))
    {
     expect(wrapper.props().password).to.equal(passwordData);   
      //console.log("enter valid password")
    } else{
      //console.log("valid password")
    }   
    });  

    it('Entered string input for password', () => {
    const wrapper = shallow(<Register/>);
    wrapper.setState({ password : passwordData });
    expect(wrapper.state().password).to.equal(passwordData);
  });

    // it('should have props with an string input for password', () => {
    // const wrapper = mount(<Register/>);
    // wrapper.setState({ password : passwordData });
    // //console.log("hkhjk " + wrapper.state().password);
    // expect(wrapper.state().password.length).to.equal(8);
    // }); 

    it('should have props with an string input for password', () => {
    const wrapper = mount(<Register/>);
      wrapper.find('.signupbtn').simulate('click');
    });
});