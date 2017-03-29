import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Dashboard from '../src/components/protected/Dashboard';

describe('<Dashboard>', function () {

var categoryData = "category"
var titleData = "title"
var contentData = "content"

 it('should be a div element', () => {
   const wrapper = shallow(<Dashboard/>);
    expect(wrapper.type()).to.eql('div');
  });

 it('should have an input for  title , content and category', function () {
    const wrapper = shallow(<Dashboard/>);
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('should have an post button for post blogs/messages ', function () {
    const wrapper = shallow(<Dashboard/>);
    expect(wrapper.find('button')).to.have.length(1);
  });


 // it('should have props with an string input for title', () => {
 //    const wrapper = mount(<Dashboard/>);
 //    wrapper.setProps({ title : titleData });
 //    expect(wrapper.props().title).to.be.defined;
 //    expect(wrapper.props().title).to.equal(titleData);
 //    });

   it('Entered string input for title', () => {
    const wrapper = shallow(<Dashboard/>);
    wrapper.setState({ title : titleData });
    expect(wrapper.state().title).to.equal(titleData);
  });

    // it('should have props with an string input for category', () => {
    // const wrapper = mount(<Dashboard/>);
    // wrapper.setProps({ category : categoryData });
    // expect(wrapper.props().category).to.be.defined;
    // expect(wrapper.props().category).to.equal(categoryData);
    // });  

    it('Entered string input for category', () => {
    const wrapper = shallow(<Dashboard/>);
    wrapper.setState({ category : categoryData });
    expect(wrapper.state().category).to.equal(categoryData);
  });

    //  it('should have props with an string input for content', () => {
    // const wrapper = mount(<Dashboard/>);
    // wrapper.setProps({ content : contentData });
    // expect(wrapper.props().content).to.be.defined;
    // expect(wrapper.props().content).to.equal(contentData);
    // });  

    it('Entered string input for content', () => {
    const wrapper = shallow(<Dashboard/>);
    wrapper.setState({ content : contentData });
    expect(wrapper.state().content).to.equal(contentData);
  });

    // it('should have props with an string input for category', () => {
    // const wrapper = mount(<Dashboard/>);
    //   wrapper.find('.postBtn').simulate('click');
    //    expect(wrapper.state().content).to.equal(contentData);
    //    expect(wrapper.state().title).to.equal(titleData);
    //    expect(wrapper.state().category).to.equal(categoryData);
    // });

});