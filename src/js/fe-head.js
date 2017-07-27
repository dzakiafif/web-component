var FrontHead = Object.create(HTMLElement.prototype);

FrontHead.createdCallback = function() {
    this.innerHTML = "<p>ini konten head</p>";
};

var FeHead = document.registerElement('fe-head',{prototype: FrontHead});