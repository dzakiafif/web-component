var FrontTesting = Object.create(HTMLElement.prototype);

FrontTesting.createdCallback = function() {
    this.innerHTML = "<p>asem</p>";
};

var FeTesting = document.registerElement('fe-testing',{prototype: FrontTesting});