var FrontCoba = Object.create(HTMLElement.prototype);

FrontCoba.createdCallback = function() {
    this.innerHTML = "<p>asem</p>";
};

var FeCoba = document.registerElement('fe-coba',{prototype: FrontCoba});