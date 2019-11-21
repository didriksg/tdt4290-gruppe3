import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LoadingScreen } from '../components/loadingScreen/LoadingScreen';

Enzyme.configure({adapter: new Adapter() });

describe('Loading screen component', () => {

    const component = shallow(<LoadingScreen/>);

    it('Should render without errors', () => {

        const wrapper = component.find('.sweet-loading');
        expect(wrapper.length).toBe(1);

    });

});