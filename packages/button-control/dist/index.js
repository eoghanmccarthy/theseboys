module.exports = (function(e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var o = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  return (
    (r.m = e),
    (r.c = t),
    (r.d = function(e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (r.t = function(e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          r.d(
            n,
            o,
            function(t) {
              return e[t];
            }.bind(null, o)
          );
      return n;
    }),
    (r.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return r.d(t, 'a', t), t;
    }),
    (r.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ''),
    r((r.s = 10))
  );
})([
  function(e, t) {
    e.exports = require('react');
  },
  function(e, t, r) {
    var n;
    /*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/ !(function() {
      'use strict';
      var r = {}.hasOwnProperty;
      function o() {
        for (var e = [], t = 0; t < arguments.length; t++) {
          var n = arguments[t];
          if (n) {
            var a = typeof n;
            if ('string' === a || 'number' === a) e.push(n);
            else if (Array.isArray(n) && n.length) {
              var l = o.apply(null, n);
              l && e.push(l);
            } else if ('object' === a) for (var s in n) r.call(n, s) && n[s] && e.push(s);
          }
        }
        return e.join(' ');
      }
      e.exports
        ? ((o.default = o), (e.exports = o))
        : void 0 ===
            (n = function() {
              return o;
            }.apply(t, [])) || (e.exports = n);
    })();
  },
  function(e, t, r) {
    e.exports = r(5)();
  },
  function(e, t) {
    function r() {
      return (
        (e.exports = r =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }),
        (e.exports.default = e.exports),
        (e.exports.__esModule = !0),
        r.apply(this, arguments)
      );
    }
    (e.exports = r), (e.exports.default = e.exports), (e.exports.__esModule = !0);
  },
  function(e, t, r) {
    var n = r(7);
    (e.exports = function(e, t) {
      if (null == e) return {};
      var r,
        o,
        a = n(e, t);
      if (Object.getOwnPropertySymbols) {
        var l = Object.getOwnPropertySymbols(e);
        for (o = 0; o < l.length; o++)
          (r = l[o]),
            t.indexOf(r) >= 0 ||
              (Object.prototype.propertyIsEnumerable.call(e, r) && (a[r] = e[r]));
      }
      return a;
    }),
      (e.exports.default = e.exports),
      (e.exports.__esModule = !0);
  },
  function(e, t, r) {
    'use strict';
    var n = r(6);
    function o() {}
    function a() {}
    (a.resetWarningCache = o),
      (e.exports = function() {
        function e(e, t, r, o, a, l) {
          if (l !== n) {
            var s = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
            );
            throw ((s.name = 'Invariant Violation'), s);
          }
        }
        function t() {
          return e;
        }
        e.isRequired = e;
        var r = {
          array: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: t,
          element: e,
          elementType: e,
          instanceOf: t,
          node: e,
          objectOf: t,
          oneOf: t,
          oneOfType: t,
          shape: t,
          exact: t,
          checkPropTypes: a,
          resetWarningCache: o
        };
        return (r.PropTypes = r), r;
      });
  },
  function(e, t, r) {
    'use strict';
    e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  },
  function(e, t) {
    (e.exports = function(e, t) {
      if (null == e) return {};
      var r,
        n,
        o = {},
        a = Object.keys(e);
      for (n = 0; n < a.length; n++) (r = a[n]), t.indexOf(r) >= 0 || (o[r] = e[r]);
      return o;
    }),
      (e.exports.default = e.exports),
      (e.exports.__esModule = !0);
  },
  function(e, t, r) {},
  function(e, t, r) {},
  function(e, t, r) {
    'use strict';
    r.r(t);
    var n = r(0),
      o = r.n(n),
      a = r(2),
      l = r(1),
      s = r.n(l);
    var i = Object(
      n.memo
    )(
      ({
        className: e,
        width: t = '100%',
        stroke: r = 'var(--color-bluegrey-600)',
        strokeWidth: n = '4'
      }) =>
        o.a.createElement(
          'svg',
          {
            className: s()('svg-icon', e),
            width: t,
            viewBox: '0 0 30 30',
            xmlns: 'http://www.w3.org/2000/svg'
          },
          o.a.createElement('line', {
            x1: '0',
            y1: '15',
            x2: '30',
            y2: '15',
            fill: 'transparent',
            stroke: r,
            strokeWidth: n
          })
        )
    );
    var c = Object(
      n.memo
    )(
      ({
        className: e,
        width: t = '100%',
        stroke: r = 'var(--color-bluegrey-600)',
        strokeWidth: n = '4'
      }) =>
        o.a.createElement(
          'svg',
          {
            className: s()('svg-icon', e),
            width: t,
            viewBox: '0 0 30 30',
            xmlns: 'http://www.w3.org/2000/svg'
          },
          o.a.createElement('line', {
            x1: '15',
            y1: '0',
            x2: '15',
            y2: '30',
            fill: 'transparent',
            stroke: r,
            strokeWidth: n
          }),
          o.a.createElement('line', {
            x1: '0',
            y1: '15',
            x2: '30',
            y2: '15',
            fill: 'transparent',
            stroke: r,
            strokeWidth: n
          })
        )
    );
    var u = r(3),
      p = r.n(u),
      f = r(4),
      d = r.n(f);
    r(8);
    const m = Object(n.memo)(e => {
      let {
          children: t,
          id: r,
          testId: n,
          isDisabled: a = !1,
          className: l,
          role: i = 'button',
          type: c = 'button',
          size: u = 48,
          shape: f = 'circle',
          variant: m
        } = e,
        v = d()(e, [
          'children',
          'id',
          'testId',
          'isDisabled',
          'className',
          'role',
          'type',
          'size',
          'shape',
          'variant'
        ]);
      return o.a.createElement(
        'button',
        p()(
          {
            id: r,
            'data-testid': n,
            disabled: a,
            className: s()(
              'tb-button',
              { ['size-' + u]: u && 'text' !== m, [f]: f && 'text' !== m, [m]: m, disabled: a },
              l
            ),
            role: i,
            type: c
          },
          v
        ),
        t
      );
    });
    var v = m;
    m.propTypes = {
      size: Object(a.oneOf)([24, 28, 32, 36, 40, 44, 48]),
      shape: Object(a.oneOf)(['circle', 'rounded'])
    };
    r(9);
    var y = Object(n.memo)(({ children: e, id: t, orient: r = 'vertical' }) =>
      o.a.createElement('div', { id: t, className: s()('controller', { [r]: r }) }, e)
    );
    const b = Object(n.memo)(
      ({
        id: e,
        orient: t = 'vertical',
        label: r,
        step: a = 1,
        min: l = 0,
        max: s = 100,
        initialValue: u,
        toFixed: p = 0,
        onChange: f
      }) => {
        Object(n.useEffect)(() => {
          d(u);
        }, [u]);
        const d = t => {
          var r, n;
          if (!('number' != typeof t || t < l || t > s)) {
            var o;
            if (
              (null === (r = document.querySelectorAll(`#${e} .control`)) ||
                void 0 === r ||
                r.forEach(e => e.setAttribute('value', '' + t)),
              null === (n = document.querySelector(`#${e} span.value`)) ||
                void 0 === n ||
                n.setAttribute('value', t.toFixed(p)),
              t > l && t < s)
            )
              null === (o = document.querySelectorAll(`#${e} .control`)) ||
                void 0 === o ||
                o.forEach(e => e.classList.contains('alert') && e.classList.remove('alert'));
            else if (t === l) {
              var a;
              null === (a = document.querySelector(`#${e} .control.dec`)) ||
                void 0 === a ||
                a.classList.add('alert');
            } else if (t === s) {
              var i;
              null === (i = document.querySelector(`#${e} .control.inc`)) ||
                void 0 === i ||
                i.classList.add('alert');
            }
            f(t);
          }
        };
        return o.a.createElement(
          y,
          { id: e, orient: t },
          o.a.createElement('label', { className: 'label' }, r),
          o.a.createElement(
            'div',
            { className: 'controls' },
            o.a.createElement(
              v,
              {
                className: 'control dec',
                size: 28,
                onClick: e => {
                  const t = parseFloat(e.target.value) - a;
                  t < l || d(t);
                }
              },
              o.a.createElement(i, { width: '72%' })
            ),
            o.a.createElement(
              v,
              {
                className: 'control inc',
                size: 28,
                onClick: e => {
                  const t = parseFloat(e.target.value) + a;
                  t > s || d(t);
                }
              },
              o.a.createElement(c, { width: '72%' })
            )
          ),
          o.a.createElement('span', { className: 'value' })
        );
      }
    );
    t.default = b;
  }
]);
