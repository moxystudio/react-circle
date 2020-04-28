import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Circle from '../src/Circle';

const renderWithProps = (props = {}, options) => render(<Circle { ...props } />, options);

describe('Circle Component', () => {
    it('should render correctly', () => {
        const { asFragment } = renderWithProps();

        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with direction both sides', () => {
        const { asFragment } = renderWithProps({ direction: 'bothSides' });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should call onTransitionEnd callback prop', () => {
        const handleTransitionEnd = jest.fn();
        const { container } = renderWithProps({ onTransitionEnd: handleTransitionEnd });

        const circle = container.querySelector('circle');

        fireEvent.transitionEnd(circle);

        expect(handleTransitionEnd).toHaveBeenCalledTimes(1);
    });
});
