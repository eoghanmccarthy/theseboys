import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const EffectCtrlButton = memo(
  ({ children, sequencerName, name, node, param = 'wet', dec, step = 0.1, min = 0, max = 1 }) => {
    if (!node) {
      return null;
    }

    const className = `${sequencerName}__effect-ctrl--${name}`;

    return (
      <button
        className={cx('effect-ctrl', className, {
          inc: !dec,
          dec: dec
        })}
        onClick={() => {
          const params = node.get();
          const previous = params[param];
          const val = !dec ? Math.min(previous + step, max) : Math.max(previous - step, min);

          if (val === min) {
            document.querySelector(`.${className}.dec`).classList.add('limit');
          } else if (val === max) {
            document.querySelector(`.${className}.inc`).classList.add('limit');
          } else {
            document.querySelectorAll(`.${className}`).forEach(el => el.classList.remove('limit'));
          }

          node.set({ [param]: val });
        }}
      >
        {children}
      </button>
    );
  }
);

export default EffectCtrlButton;
