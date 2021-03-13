import React from 'react';
import { useSpring, animated } from 'react-spring';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];

const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Logo = ({ animate = false, fill = 'var(--color-primary)', onClick }) => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }));

  return (
    <animated.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 480"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      {...(animate && {
        style: { transform: props.xys.interpolate(trans) }
      })}
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick();
        }
      }}
    >
      <path
        fill={fill}
        d="M240 0c-132.5 0-240 107.5-240 240s107.5 240 240 240 240-107.5 240-240-107.5-240-240-240zm111.9 177.8c-17.4 11.3-35.5 21.8-43.1 43-4.6 12.6-9.5 24.9 2.6 36.3 2.8 2.7 5.7 6.4 6.4 10 .9 4.5 1.4 12-1 13.7-7.8 5.4-5.9 11.1-4.1 18.3 6.9 27.5 13.4 55.2 19.5 82.9.7 3.3-1.7 7.4-2.6 11.1-2.9-2.7-7.3-4.9-8.4-8.3-9.7-27.2-19.3-54.4-27.8-82-2.9-9.5-6.6-12.1-16.3-9.8l-36.6 5.8c-8.9 2.1-17.1 6.8-25.8 9.7-2.9 1-6.5-.1-9.8-.2.8-2.9.7-6.8 2.6-8.7 26.9-27.2 33.3-37.2 48.8-77.3-7.7-9-15.8-9.9-25.2-3.9-19.8 12.6-39.6 25.1-59.7 37.1-13.2 7.9-26.7 15.1-40.4 22.1-3 1.5-7.3.3-11 .3 1.2-3.7 1.3-8.6 3.8-10.9 27-24.6 58-42.6 92.1-55.5 2.4-.9 4.9-2 7.2-3.3 1.4-.8 2.6-2 5-4-12.2-5.7-21-14.8-34.9-14.7-5.1.1-10.5-5.4-15.4-8.8-1.1-.7-1.5-4.6-.7-5.2 1.7-1.5 4.9-3.1 6.6-2.5 10.3 3.7 20.5 7.9 30.6 12.2 4.6 2 9.4 4 13.2 7.1 7.6 6.2 12.8 2.5 18.9-2.6 14.9-12.5 23.9-25.4 17.9-47.2-4.8-17.6-3.6-36.9-5-55.4 1.1-.2 2.2-.4 3.3-.5 4.3 23.2 8.7 46.4 13 69.9 5.2-8.3 10.3-16.4 15.4-24.5.9-1.4 1.3-3.4 2.6-4.3 2.7-2 5.8-3.4 8.7-5.1.8 3.2 3.1 7 2.2 9.6-3.7 11.1-8.3 21.9-12.8 32.7-2.8 6.7-6 13.3-9 19.9l1.6 2.4c8.3-2.7 16.6-5.2 24.8-8.2 12.2-4.5 24.1-9.8 36.5-13.7 4-1.3 11.6-.9 13.2 1.5 3.9 6.2-2.7 8.3-6.9 11zM235 289.9c11.2-20.8 21.6-40.2 32.4-60.2 18.4 13.6 11.4 34.8 19.7 52.3-18 2.7-34.3 5.2-52.1 7.9zM292.2 238c-7.5-9.7-8.9-22.1-9-34.7 0-1.4 2.7-3.6 4.5-4.2 10.2-3.6 20.6-6.8 28.8-9.4-7.6 15.1-15.8 31.4-24.3 48.3z"
      />
    </animated.svg>
  );
};

export default Logo;
