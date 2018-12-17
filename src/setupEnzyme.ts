import { configure } from 'enzyme';
const EnzymeAdapter = require('enzyme-adapter-react-16'); // tslint:disable-line

const adapter = new EnzymeAdapter();
configure({ adapter });
