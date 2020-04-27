import React from 'react';
import { render } from '@testing-library/react';
import Circle from '../src/Circle';

const renderWithProps = (props = {}) => render(<Circle { ...props } />);

describe('Circle Component', () => {
    it('should render correctly', () => {
        const { asFragment } = renderWithProps();

        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with direction both sides', () => {
        const { asFragment } = renderWithProps({ direction: 'bothSides' });

        expect(asFragment()).toMatchSnapshot();
    });
});
