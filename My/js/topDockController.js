/**
 * TopDockController – plain-JS port (no modules, no TypeScript)
 *
 * Axis values: "x" | "y"
 *
 * Options shape returned by getOptions():
 *   { proximity, spring, damping, widthGrowth, heightGrowth, drop, axis, distribute, lockTrack }
 */

var clamp = function (value, min, max) { return Math.max(min, Math.min(max, value)); };

function createTopDockController(root, getOptions) {
  var reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var precisionQuery = window.matchMedia("(hover:hover) and (pointer:fine)");
  var items = Array.from(root.querySelectorAll("[data-dock-item]")).map(function (element) {
    return {
      element: element,
      baseWidth: 0,
      baseHeight: 0,
      value: 0,
      velocity: 0,
      target: 0,
    };
  });

  var enabled = false;
  var pointerActive = false;
  var dirty = false;
  var frame = 0;

  var canAnimate = function () { return !reducedQuery.matches && root.clientWidth > 0 && window.innerWidth > 600 && precisionQuery.matches; };

  var measure = function () {
    enabled = canAnimate();
    /* released first, so the rest width is measured against the track's own
       content rather than against the width the last measurement pinned */
    if (getOptions().lockTrack) root.style.width = "";
    for (var i = 0; i < items.length; i++) {
      var state = items[i];
      state.element.style.width = "";
      state.element.style.height = "";
      state.element.style.transform = "";
      state.element.dataset.dockNear = "false";
    }
    for (var i = 0; i < items.length; i++) {
      var state = items[i];
      var rect = state.element.getBoundingClientRect();
      state.baseWidth = rect.width;
      state.baseHeight = rect.height;
      state.value = 0;
      state.velocity = 0;
      state.target = 0;
    }
    pointerActive = false;
    dirty = false;
    /* a distributed strip has to fill its track even when the spring never runs
       – reduced motion, a coarse pointer, or a narrow viewport */
    if (getOptions().distribute) applyLayout();
    if (getOptions().lockTrack) root.style.width = root.getBoundingClientRect().width.toFixed(2) + "px";
    root.dataset.dockState = enabled ? "idle" : "static";
    root.dataset.dockMax = "0.00";
  };

  var setTargets = function (clientX, clientY) {
    if (!enabled) return;
    var options = getOptions();
    var vertical = options.axis === "y";
    var pointer = vertical ? clientY : clientX;
    var rects = items.map(function (state) { return state.element.getBoundingClientRect(); });
    for (var index = 0; index < items.length; index += 1) {
      var rect = rects[index];
      var center = vertical ? rect.top + rect.height * 0.5 : rect.left + rect.width * 0.5;
      var proximity = clamp(1 - Math.abs(pointer - center) / Math.max(1, options.proximity), 0, 1);
      var influence = proximity * proximity * (3 - 2 * proximity);
      items[index].target = influence;
      items[index].element.dataset.dockNear = influence > 0.08 ? "true" : "false";
    }
    pointerActive = true;
    dirty = true;
    root.dataset.dockState = "active";
  };

  var focusItem = function (item) {
    if (!enabled) return;
    var index = items.findIndex(function (state) { return state.element === item; });
    if (index < 0) return;
    items.forEach(function (state, itemIndex) {
      state.target = itemIndex === index ? 1 : Math.abs(itemIndex - index) === 1 ? 0.24 : 0;
      state.element.dataset.dockNear = state.target > 0.08 ? "true" : "false";
    });
    pointerActive = false;
    dirty = true;
    root.dataset.dockState = "focus";
  };

  var reset = function () {
    pointerActive = false;
    dirty = true;
    items.forEach(function (state) {
      state.target = 0;
      state.element.dataset.dockNear = "false";
    });
  };

  /* the only place item geometry is written, so the three fits stay one
     behaviour with three ways of spending the same spring value */
  var applyLayout = function () {
    var options = getOptions();
    if (options.distribute && options.axis !== "y") {
      var weights = items.map(function (state) { return state.baseWidth + options.widthGrowth * clamp(state.value, 0, 1.08); });
      var total = weights.reduce(function (sum, weight) { return sum + weight; }, 0);
      var natural = items.reduce(function (sum, state) { return sum + state.baseWidth; }, 0);
      /* squeezed below its own natural width the strip would clip every label,
         so it stops filling the track rather than crushing the cells */
      var track = root.clientWidth >= natural ? root.clientWidth : 0;
      items.forEach(function (state, index) {
        state.element.style.width = track ? (track * weights[index] / total).toFixed(2) + "px" : "";
        state.element.style.height = "";
        state.element.style.transform = "";
      });
      return;
    }
    for (var i = 0; i < items.length; i++) {
      var state = items[i];
      var value = clamp(state.value, 0, 1.08);
      if (options.axis === "y") {
        state.element.style.width = "";
        state.element.style.height = (state.baseHeight + options.heightGrowth * value).toFixed(2) + "px";
        state.element.style.transform = "translateX(" + (value * options.drop).toFixed(2) + "px)";
        continue;
      }
      var isLogo = state.element.classList.contains("animated-top-dock__logo");
      var extraWidth = isLogo ? options.widthGrowth * (14 / 17) : Math.min(options.widthGrowth, state.baseWidth * 0.24);
      var extraHeight = isLogo ? options.heightGrowth * (14 / 16) : options.heightGrowth;
      state.element.style.width = (state.baseWidth + extraWidth * value).toFixed(2) + "px";
      state.element.style.height = (state.baseHeight + extraHeight * value).toFixed(2) + "px";
      state.element.style.transform = "translateY(" + (value * options.drop).toFixed(2) + "px)";
    }
  };

  var draw = function () {
    if (enabled && dirty) {
      var options = getOptions();
      var moving = false;
      var maxValue = 0;
      for (var i = 0; i < items.length; i++) {
        var state = items[i];
        state.velocity += (state.target - state.value) * options.spring;
        state.velocity *= options.damping;
        state.value += state.velocity;
        if (Math.abs(state.target - state.value) < 0.001 && Math.abs(state.velocity) < 0.001) {
          state.value = state.target;
          state.velocity = 0;
        } else {
          moving = true;
        }
        maxValue = Math.max(maxValue, clamp(state.value, 0, 1.08));
      }
      applyLayout();
      root.dataset.dockMax = maxValue.toFixed(2);
      if (!moving) {
        dirty = false;
        if (items.every(function (state) { return state.target === 0; })) root.dataset.dockState = "idle";
      }
    }
    frame = requestAnimationFrame(draw);
  };

  var onPointerMove = function (event) { setTargets(event.clientX, event.clientY); };
  var onWindowPointerMove = function (event) {
    if (!pointerActive) return;
    var rootRect = root.getBoundingClientRect();
    var itemRects = items.map(function (state) { return state.element.getBoundingClientRect(); });
    var bottom = Math.max(rootRect.bottom, Math.max.apply(null, itemRects.map(function (rect) { return rect.bottom; })));
    var outside = event.clientX < rootRect.left || event.clientX > rootRect.right || event.clientY < rootRect.top || event.clientY > bottom;
    if (outside) reset();
  };
  var onFocusIn = function (event) {
    var target = event.target;
    var item = target ? target.closest("[data-dock-item]") : null;
    if (item) focusItem(item);
  };
  var onFocusOut = function () {
    requestAnimationFrame(function () {
      if (!root.contains(document.activeElement)) reset();
    });
  };
  var onKeyDown = function (event) {
    var target = event.target;
    var item = target ? target.closest("[data-dock-item]") : null;
    if (item && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      item.click();
    }
  };
  var onClick = function () { reset(); };

  /* the spring writes an explicit pixel width onto every item, so the base
     measurement has to happen after the label font is available – measured
     against a fallback face, a variant with auto-width items locks in a box its
     own text then overflows */
  var released = false;
  var remeasure = function () { if (!released) measure(); };
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(remeasure);
  }

  /* re-measuring on the parent works for a dock inside a fixed bar, but a rail
     whose height follows its own items would resize its parent as it grows and
     cancel the spring on the next frame. A shell can opt out of that feedback
     loop by marking a box the dock cannot resize. */
  var resizeObserver = new ResizeObserver(measure);
  var frameEl = root.closest("[data-dock-frame]");
  resizeObserver.observe(frameEl || root.parentElement || root);
  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerleave", reset);
  root.addEventListener("focusin", onFocusIn);
  root.addEventListener("focusout", onFocusOut);
  root.addEventListener("keydown", onKeyDown);
  root.addEventListener("click", onClick);
  window.addEventListener("pointermove", onWindowPointerMove, { passive: true });
  reducedQuery.addEventListener("change", measure);
  precisionQuery.addEventListener("change", measure);
  measure();
  frame = requestAnimationFrame(draw);

  return function () {
    released = true;
    root.style.width = "";
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    root.removeEventListener("pointermove", onPointerMove);
    root.removeEventListener("pointerleave", reset);
    root.removeEventListener("focusin", onFocusIn);
    root.removeEventListener("focusout", onFocusOut);
    root.removeEventListener("keydown", onKeyDown);
    root.removeEventListener("click", onClick);
    window.removeEventListener("pointermove", onWindowPointerMove);
    reducedQuery.removeEventListener("change", measure);
    precisionQuery.removeEventListener("change", measure);
  };
}

window.createTopDockController = createTopDockController;
