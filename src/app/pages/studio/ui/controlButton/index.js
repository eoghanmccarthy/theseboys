import React, { useEffect, memo } from 'react';
import cx from 'classnames';

import './styles.css';

import interpolate from 'utils/studioHelpers/interpolate';

import Button from 'componentLib/Button';

const EffectControlButton = memo(
  ({
    children,
    controlName,
    node,
    param = 'wet',
    dec,
    step = 0.1,
    min = 0,
    max = 1,
    showPercentageValue = false,
    toFixed = 1
  }) => {
    if (!node || !param) return null;

    useEffect(() => {
      document
        .querySelector(`.ui-control__value.${controlName}`)
        .setAttribute(
          'data-value',
          showPercentageValue
            ? Math.round(interpolateValue(node.get()[param])).toString()
            : node.get()[param].toFixed(toFixed)
        );
    }, []);

    const interpolateValue = interpolate({
      inputRange: [min, max],
      outputRange: [0, 100],
      clamp: true
    });

    return (
      <Button
        size={28}
        className={cx('ui-control__button', controlName, {
          inc: !dec,
          dec: dec
        })}
        onClick={() => {
          const params = node.get();
          const previous = params[param];
          const val = !dec ? Math.min(previous + step, max) : Math.max(previous - step, min);

          document
            .querySelector(`.ui-control__value.${controlName}`)
            .setAttribute(
              'data-value',
              showPercentageValue
                ? Math.round(interpolateValue(val)).toString()
                : val.toFixed(toFixed)
            );

          if (val === min) {
            document.querySelector(`.${controlName}.dec`).classList.add('limit');
          } else if (val === max) {
            document.querySelector(`.${controlName}.inc`).classList.add('limit');
          } else {
            document
              .querySelectorAll(`.${controlName}`)
              .forEach(el => el.classList.remove('limit'));
          }

          node.set({ [param]: val });
        }}
      >
        {children}
      </Button>
    );
  }
);

export default EffectControlButton;
