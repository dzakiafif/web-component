var FrontContent = Object.create(HTMLElement.prototype);

FrontContent.createdCallback = function() {
    this.innerHTML = "<p>lalala</p>";
};

var FeContent = document.registerElement('fe-content',{prototype: FrontContent});