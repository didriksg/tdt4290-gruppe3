import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../components/header/Header';


Enzyme.configure({adapter: new Adapter() });

describe('Header component', () => {

    const component = shallow(<Header/>);

    it('Should render without errors', () => {

        const wrapper = component.find('.header_activecases');
        expect(wrapper.length).toBe(1);

    });

});