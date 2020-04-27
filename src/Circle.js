import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DIRECTIONS = {
    CLOCKWISE: 'clockwise',
    ANTI_CLOCKWISE: 'antiClockwise',
    BOTH_SIDES: 'bothSides',
};

const getSvgClassName = (strokePercentage, direction, className) => classNames(
    'next-button_svg',
    `next-button_${direction}`,
    {
        'next-button_noStroke': strokePercentage === 0,
    },
    className,
);

const Circle = ({ className, direction, strokeWidth, strokePercentage, onTransitionEnd }) => {
    const svgRef = useRef(null);
    const [circleState, setCircleState] = useState({});
    const [svgState, setSvgState] = useState({ className: getSvgClassName(strokePercentage, direction, className) });
    const handleTransitionEnd = useCallback((event) => {
        event.propertyName === 'stroke-dasharray' && onTransitionEnd && onTransitionEnd(event);
    }, [onTransitionEnd]);

    useEffect(() => {
        const { clientWidth: svgSize } = svgRef.current;

        const center = svgSize / 2;
        const radius = center - parseInt(strokeWidth, 10);
        const perimeter = 2 * Math.PI * radius;
        const rotate = (-strokePercentage * 180);
        const strokeLineSize = perimeter * strokePercentage;
        const strokeGapSize = perimeter - strokeLineSize;

        const strokeDasharray = `${strokeLineSize} ${strokeGapSize}`;

        const style = {
            strokeWidth,
            strokeDasharray,
        };

        if (direction === DIRECTIONS.BOTH_SIDES) {
            style.transform = `rotate(${rotate}deg)`;
        }

        setCircleState({
            center,
            radius,
            perimeter,
            rotate,
            strokeGapSize,
            strokeLineSize,
            strokeDasharray,
            style,
        });

        setSvgState({ className: getSvgClassName(strokePercentage, direction, className) });
    }, [svgRef, strokeWidth, strokePercentage, direction, className]);

    return (
        <svg
            ref={ svgRef }
            className={ svgState.className }>
            { svgRef.current &&
                <circle
                    style={ circleState.style }
                    cx={ circleState.center }
                    cy={ circleState.center }
                    r={ circleState.radius }
                    onTransitionEnd={ handleTransitionEnd } />
            }
        </svg>
    );
};

Circle.propTypes = {
    className: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(DIRECTIONS)),
    strokeWidth: PropTypes.number,
    strokePercentage: PropTypes.number,
    onTransitionEnd: PropTypes.func,
};

Circle.defaultProps = {
    direction: DIRECTIONS.CLOCKWISE,
    strokeWidth: 1.5,
    strokePercentage: 1,
    onTransitionEnd: /* istanbul ignore next */ () => {},
};

export default Circle;
