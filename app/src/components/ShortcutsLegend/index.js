import React, { Fragment, memo } from 'react';

import './styles.css';

const data = [
  {
    name: 'selection',
    items: [
      { shortcut: 'click', value: 'pppp0' },
      { shortcut: 'press', value: 'pppp1' }
    ]
  },
  {
    name: 'playback',
    items: [
      { shortcut: 'enter', value: 'pppp0' },
      { shortcut: 'shift', value: 'pppp1' }
    ]
  },
  {
    name: 'sound',
    items: [
      { shortcut: 'back', value: 'pppp0' },
      { shortcut: 'delete', value: 'pppp1' }
    ]
  }
];

const ShortcutsLegend = memo(() => {
  return (
    <section id={'shortcuts-legend'}>
      {data.map((group, i) => {
        const { name, items } = group;
        return (
          <div key={i} className={'shortcuts-group'}>
            <div>{name}</div>
            <div className={'shortcuts-group-items'}>
              {items.map((item, i) => {
                const { shortcut, value } = item;
                return (
                  <Fragment key={i}>
                    <div>{shortcut}</div>
                    <div>{value}</div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
});

export default ShortcutsLegend;
