import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DistrictFilterButton from '../components/activeCases/DistrictFilterButton';


Enzyme.configure({adapter: new Adapter() });

describe('DistrictFilterButton component', () => {

    const component = shallow(<DistrictFilterButton/>);

    it('Should contain all relevant city sectors', () => {

        const text = component.text()

        var sectors = {
            "midtbyen": "Midtbyen",
            "heimdal": "Heimdal",
            "lerkendal": "Lerkendal",
            "østbyen": "Østbyen",
        };

        for (var key in sectors) {
            
            if (text.includes(sectors[key]) == false) {
                throw new Error('Missing a city sector');

            }
        }

    });

    it('Should render without errors', () => {

        const wrapper = component.find('div');
        expect(wrapper.length).toBe(1);

    });



});