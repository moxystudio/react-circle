import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DIRECTIONS = {
    CLOCKWISE: 'clockwise',
    ANTI_CLOCKWISE: 'antiClockwise',
    BOTH_SIDES: 'bothSides',
};

const getSvgClassName = (strokePercentage, direction, className) => classNames(
    'react-circle_svg',
    `react-circle_${direction}`,
    {
        'react-circle_noStroke': strokePercentage === 0,
    },
    className,
);

const Circle = ({ className, direction, strokeWidth, strokePercentage, onTransitionEnd }) => {
    const svgRef = useRef(null);
    const [circleState, setCircleState] = useState();
    const [svgState, setSvgState] = useState({ className: getSvgClassName(strokePercentage, direction, className) });

    useEffect(() => {
        const { clientWidth: svgSize } = svgRef.current;

        const center = svgSize / 2;
        const radius = Math.max(center - parseInt(strokeWidth, 10), 0);
        const perimeter = 2 * Math.PI * radius;
        const rotate = (-strokePercentage * 180);
        const strokeLineSize = perimeter * strokePercentage;
        const strokeGapSize = perimeter - strokeLineSize;

        const strokeDasharray = `${strokeLineSize} ${strokeGapSize}`;

        const circleStyle = {
            strokeWidth,
            strokeDasharray,
        };
        const groupStyle = {};

        if (direction === DIRECTIONS.BOTH_SIDES) {
            groupStyle.transform = `rotate(${rotate}deg)`;
        }

        setCircleState({
            center,
            radius,
            perimeter,
            rotate,
            strokeGapSize,
            strokeLineSize,
            strokeDasharray,
            circleStyle,
            groupStyle,
        });

        setSvgState({ className: getSvgClassName(strokePercentage, direction, className) });
    }, [svgRef, strokeWidth, strokePercentage, direction, className]);

    return (
        <svg
            ref={ svgRef }
            className={ svgState.className }>
            { svgRef.current &&
                <g style={ circleState.groupStyle }>
                    <circle
                        style={ circleState.circleStyle }
                        cx={ circleState.center }
                        cy={ circleState.center }
                        r={ circleState.radius }
                        onTransitionEnd={ onTransitionEnd } />
                </g>
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
};

export default Circle;
