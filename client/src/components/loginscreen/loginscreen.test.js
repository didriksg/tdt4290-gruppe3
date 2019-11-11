import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { LoginScreen } from './LoginScreen';

const mockStore = configureMockStore();
const store = mockStore({});

Enzyme.configure({adapter: new Adapter() });

describe('Loginscreen component', () => {

    it('Should show text', () => {

        const component = shallow(
        <LoginScreen />);

        const wrapper = component.find('.logincontainer');
        console.log("RIGHT HERE", wrapper.debug());

    })

});