import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Flights } from './Flights';

const FLIGHT = {
  "amount": 150,
  "destination": {
    "cityName": "city1",
    "code": '1',
    "contryName": "contry1",
  },
  "duration": 2000,
  "flightCode": "flightCode1",
  "flightDate": 1545031514190,
  "flightName": "flightName1",
  "id": 44
};
describe('<MyComponent />', () => {

  it('Render no li when flight list empty', () => {
    const flights = shallow(<Flights flights={[]} />);
    expect(flights.find("li").length).toEqual(0);
  });

  it('Render no li when flight list not empty', () => {
    const flights = shallow(<Flights flights={[FLIGHT]} />);
    expect(flights.find("li").length).toEqual(1);
  });

  it('check for props', () => {
    const wrapper = mount(<Flights flights={[FLIGHT]} />);
    expect(wrapper.props().flights).toEqual([FLIGHT])
  });
});
