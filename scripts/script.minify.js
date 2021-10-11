"use strict";
window.addEventListener("DOMContentLoaded", function (e) {
  !(function () {
    var e = document.getElementById("js-mortgage-range-slider"),
      t = document.getElementById("js-interest-slider"),
      a = document.getElementById("js-YearsOfMortgage"),
      n = document.getElementById("js-interest"),
      r = document.getElementById("js-loan"),
      l = document.getElementById("js-tax"),
      s = document.getElementById("js-insurance"),
      u = document.getElementById("js-interest-result"),
      i = document.getElementById("js-tax-result"),
      d = document.getElementById("js-insurance-result"),
      o = document.getElementById("js-total-result"),
      c = document.getElementById("js-calculate-button");
    (e.value = 21), (t.value = 5);
    var v = function (e) {
      var t = e.target,
        a = t.min,
        n = t.max;
      !(function (e, t, a, n) {
        e.style.backgroundSize = (100 * (t - a)) / (n - a) + "%";
      })(t, t.value, a, n);
    };
    e.addEventListener("input", function (e) {
      a.value = e.target.value;
    }),
      a.addEventListener("keyup", function (t) {
        (e.value = t.target.value),
          "" === t.target.value && (e.value = e.min),
          parseInt(t.target.value) > parseInt(e.max) &&
            (t.target.value = e.max),
          0 === parseInt(t.target.value) && (t.target.value = e.min),
          (e.style.backgroundSize =
            (100 * (t.target.value - e.min)) / (e.max - e.min) + "%");
      }),
      e.addEventListener("input", v),
      t.addEventListener("input", function (e) {
        n.value = e.target.value;
      }),
      n.addEventListener("keyup", function (e) {
        (t.value = e.target.value),
          "" === e.target.value && (t.value = t.min),
          parseInt(e.target.value) > parseInt(t.max) &&
            (e.target.value = t.max),
          0 === parseInt(e.target.value) && (e.target.value = t.min),
          (t.style.backgroundSize =
            (100 * (e.target.value - t.min)) / (t.max - t.min) + "%");
      }),
      t.addEventListener("input", v);
    var m = function () {
        var e = parseFloat(n.value),
          t = parseFloat(r.value),
          l = parseFloat(a.value);
        return (
          ((e / 100 / 12) * t) /
          (1 - Math.pow(1 + e / 100 / 12, 12 * -l))
        ).toFixed(2);
      },
      g = function () {
        return (parseFloat(l.value) / 12).toFixed(2);
      },
      p = function () {
        return (parseFloat(s.value) / 12).toFixed(2);
      },
      h = [],
      f = Array.from(document.querySelectorAll(".textInput"));
    f.forEach(function (e) {
      e.onkeypress = function (e) {
        (e.which < 48 || e.which > 57) && e.preventDefault();
      };
    }),
      f.forEach(function (e) {
        e.onblur = function (t) {
          var a = t.target.dataset.input,
            n = document.querySelector('div[data-error="' + a + '"]');
          "" === e.value
            ? (n.classList.remove("hide"),
              t.target.classList.add("text-input-required-highlight"))
            : (n.classList.add("hide"),
              t.target.classList.remove("text-input-required-highlight"));
        };
      }),
      c.addEventListener("click", function () {
        h = [];
        for (var e = 0; e < f.length; e++) {
          var t = f[e].dataset.input,
            a = document.querySelector('div[data-error="' + t + '"]');
          "" === f[e].value &&
            (h.push("not valid"),
            a.classList.remove("hide"),
            f[e].classList.add("text-input-required-highlight"));
        }
      }),
      c.addEventListener("click", function () {
        var e = m(),
          t = g(),
          a = p(),
          n = parseFloat(e) + parseFloat(t) + parseFloat(a);
        return (
          !h.includes("not valid") &&
          ((function (e, t, a) {
            u.classList.remove("results__placeholder--medium"),
              u.classList.add("results__placeholder--dark"),
              i.classList.remove("results__placeholder--medium"),
              i.classList.add("results__placeholder--dark"),
              d.classList.remove("results__placeholder--medium"),
              d.classList.add("results__placeholder--dark"),
              (u.innerText = "$" + e),
              (i.innerText = "$" + t),
              (d.innerText = "$" + a);
          })(e, t, a),
          o.classList.remove("results__placeholder--medium"),
          o.classList.add("results__placeholder--dark"),
          (o.innerText = "$" + n.toFixed(2)),
          n.toFixed(2))
        );
      });
  })();
});
