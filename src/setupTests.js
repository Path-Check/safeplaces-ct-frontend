// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'mutationobserver-shim';

configure({
  adapter: new Adapter(),
});
