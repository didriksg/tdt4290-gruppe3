import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LogoutButton } from '../components/logoutButton/LogoutButton';
import checkPropTypes from 'check-prop-types';


Enzyme.configure({adapter: new Adapter() });

describe('Logout button component', () => {

    const component = shallow(<LogoutButton error={{}} logout={() => {}}/>);

    describe('Checking PropTypes', () => {

        it('Should not throw a warning', () => {

            const expectedProps = {

                error: {},
                logout: () => {}  

            };      
            
            const propsError = checkPropTypes(LogoutButton.propTypes, expectedProps, 'props', LogoutButton.name);
            expect(propsError).toBeUndefined();

        });

    });

    it('Button should render without errors', () => {

        const wrapper = component.find('.logoutbutton');

        expect(wrapper.length).toBe(1);

    });

});