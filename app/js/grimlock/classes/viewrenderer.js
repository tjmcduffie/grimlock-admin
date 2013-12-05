/*global define, window */
/**
 * @fileoverview ViewRenderer Class. Provides method to render HTML to a
 *               container.
 */

define(function(require) {

  var ViewRenderer = function(options) {
    var options = options || {};
    this.replace_ = options.replace || true;
    this.container_ = options.container || document;
  };

  ViewRenderer.prototype.render = function(content, parent, opt_options) {
    var replace = (opt_options && opt_options.replace) ?
          opt_options.replace : this.replace_;
    var parent = parent || this.container_;
    var tempFrag = parent.cloneNode(false);
    var newElem;
    var oldElem;

    tempFrag.innerHTML = content;
    newElem = tempFrag.firstChild;

    for (var i = 0, len = parent.childNodes.length; i < len; i++) {
      if (parent.childNodes[i].nodeType === Node.ELEMENT_NODE) {
        oldElem = parent.childNodes[i];
        break;
      }
    }

    if (replace === true) {
      parent.replaceChild(newElem, oldElem);
    } else {
      parent.insertBefore(newElem, oldElem);
    }
  };

  return ViewRenderer;

});