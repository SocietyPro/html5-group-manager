var Elements = function () {
  this.applicationContainer = element(by.id('applicationContainer'));
};

var elements;

describe("html5 application shell", function () {

  browser.get('/');
  elements = new Elements();
  
  it("has an application container", function () {
    var applicationContainer = elements.applicationContainer;
    expect(applicationContainer.isDisplayed()).toBeTruthy();
  });
});