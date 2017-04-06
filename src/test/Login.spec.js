import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Login from '../components/Login';

describe('<Login>', function () {

var passwordData = "password"
var emailData = "email"

 it('should be a div element', () => {
   const wrapper = shallow(<Login/>);
    expect(wrapper.type()).to.eql('div');
  });

 it('should have an input for  email and password', function () {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('should have an regisrtration button for login users ', function () {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('button')).to.have.length(1);
  });


 it('should have props with an string input for email', () => {
    const wrapper = mount(<Login/>);
    wrapper.setProps({ email : emailData });
    expect(wrapper.props().email).to.be.defined;
    expect(wrapper.props().email).to.equal(emailData);
    });

   it('Entered string input for email', () => {
    const wrapper = shallow(<Login/>);
    wrapper.setState({ email : emailData });
    expect(wrapper.state().email).to.equal(emailData);
  });

    it('should have props with an string input for password', () => {
    const wrapper = mount(<Login/>);
    wrapper.setProps({ password : passwordData });
    expect(wrapper.props().password).to.be.defined;
    expect(wrapper.props().password).to.equal(passwordData);
    });  

    it('Entered string input for password', () => {
    const wrapper = shallow(<Login/>);
    wrapper.setState({ password : passwordData });
    expect(wrapper.state().password).to.equal(passwordData);
  });

    it('clicked submit button', () => {
    const wrapper = mount(<Login/>);
       wrapper.find('.loginbtn').simulate('click');
       wrapper.setState({ email : emailData });
       wrapper.setState({ password : passwordData });
      expect(wrapper.state().password).to.equal(passwordData);
      expect(wrapper.state().email).to.equal(emailData);
    });
});