import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LoginScreen } from '../components/loginScreen/LoginScreen';

Enzyme.configure({adapter: new Adapter() });

describe('Loginscreen component', () => {

    const component = shallow(<LoginScreen error={{}} 
        isAuthenticated={false} login={() => {}}/>);

    it('Should render without errors', () => {

        const wrapper = component.find('.logincontainer');

        expect(wrapper.length).toBe(1);

    });

    it('Should render email and password field', () => {

        const wrapper = component.find('.usernamebox');

        expect(wrapper.length).toBe(2);

    });

});