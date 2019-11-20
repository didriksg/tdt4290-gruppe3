import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ActiveCases from '../components/activeCases/ActiveCases';

Enzyme.configure({adapter: new Adapter() });

describe('ActiveCases component', () => {

    const component = shallow(<ActiveCases/>);

    it('Should render without errors', () => {

        const wrapper = component.find('.sweet-loading');
        expect(wrapper.length).toBe(1);

    });

});