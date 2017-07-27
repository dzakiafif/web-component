var FrontFooter = Object.create(HTMLElement.prototype);

FrontFooter.createdCallback = function() {
    this.innerHTML = "<p>hai</p>";
};

var FeFooter = document.registerElement('fe-footer',{prototype: FrontFooter});