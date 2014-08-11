var Elements = function () {
  this.applicationContainer = element(by.id('applicationContainer'));
};

var elements;

describe("html5 application shell", function () {

  it("sets up the tests", function () {
    browser.get('index.html');
    elements = new Elements();
    console.log(elements.applicationContainer.getText());
    expect(elements.applicationContainer.isDisplayed()).toBeTruthy();
  });

});