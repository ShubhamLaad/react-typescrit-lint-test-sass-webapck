import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { MultiSelect } from './MultiSelect';

describe('<MultiSelect />', () => {

  it('Render no li when list empty', () => {
    const component = shallow(<MultiSelect options={[]} selectedOptions={[]} />);
    expect(component.find("li").length).toEqual(0);
  });

  it('Render no li when flight list not empty', () => {
    const component = shallow(<MultiSelect options={['a']} selectedOptions={['a']} />);
    expect(component.find(".selectedList li").length).toEqual(1);
  });

  it('Check for props', () => {
    const component = mount(<MultiSelect options={['a']} selectedOptions={['a']} />);
    expect(component.props().placeholder).toEqual('Multi Select');
  });

  it('Onchange of input', () => {
    const component = mount(<MultiSelect options={['a']} selectedOptions={['a']} />);
    const mockedEvent = { target: { value: 'bhopal' } }
    component.find('input').simulate('change', mockedEvent);
    expect(component.state('inputValue')).toEqual('bhopal');
  });

  it('Show list', () => {
    const wrapper = mount(<MultiSelect options={[]} selectedOptions={[]} />);
    expect(wrapper.find('.mutiSelectList').length).toEqual(0);
    wrapper.setState({ showList: true });
    expect(wrapper.find('.mutiSelectList').length).toEqual(1);
  });

});
