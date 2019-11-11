import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import loginscreen from './LoginScreen';
import LoginScreen from './LoginScreen';

const mockStore = configureMockStore();
const store = mockStore({});

Enzyme.configure({adapter: new Adapter() });

describe('Loginscreen component', () => {

    it('Should show text', () => {

        const wrapper = shallow(
        <Provider store={store}>
        <LoginScreen />
        </Provider>);
        const text = wrapper.find('div');
        console.log("RIGHT HERE ", text.debug())

    })

});