/* MO - START */
export default (function (win) {
  win.adobeListeners = [];
  win.tgtElemReady = tgtElemReady;

  var doc = win.document,
    MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
    observer;

  function tgtElemReady(selector, fn, campaignName) {
    var elementInArray = isElementNotInArray(selector);
    if (elementInArray) {
      win.adobeListeners.push({
        selector: selector,
        fn: fn,
        campaign: campaignName
      });
    }
    if (!observer) {
      observer = new MutationObserver(check);
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
        addedNodes: NodeList[1],
        removedNodes: NodeList[0],
        nextSibling: true,
        type: "childList"
      });
    }
    check();
  }

  function isElementNotInArray(element) {
    if (win.adobeListeners.length === 0) {
      return true;
    } else {
      for (var i = 0, len = win.adobeListeners.length; i < len; i++) {
        if (win.adobeListeners[i].selector === element) {
          return false;
        }
      }
      return true;
    }
  }

  function check() {
    for (var i = 0, len = win.adobeListeners.length, listener, elements; i < len; i++) {
      listener = win.adobeListeners[i];
      elements = doc.querySelectorAll(listener.selector);
      // console.log(elements);
      for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
        element = elements[j];
        if (!element.ready) {
          element.ready = true;
          listener.fn.call(element, element);
        }
      }
    }
  }

  return tgtElemReady
})(window);