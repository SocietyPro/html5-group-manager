var Elements = function () {
  this.applicationContainer = element(by.id('applicationContainer'));
  this.toolTitle = element(by.id('toolTitle'));
  this.leftNavs = element.all(by.tagName('material-sidenav'))
};

var elements;
var toolTitle;

describe("html5 application shell", function () {

  browser.get('/');
  elements = new Elements();
  
  it("has an application container", function () {
    var applicationContainer = elements.applicationContainer;
    expect(applicationContainer.isDisplayed()).toBeTruthy();
  });

  describe('left nav', function(){
    it("has one side nav", function () {
      expect(elements.leftNavs.count()).toBe(1);
      expect(elements.leftNavs.get(0).isDisplayed()).toBeFalsy();
    });

    it("starts closed", function(){
      
    });

    it("opens when hamburger is clicked", function(){
    });

    it("displays a scrim when open", function(){

    })

    it("closes when scrim is clicked", function(){
      
    });
  });

  describe('header toolbar', function(){
    it('is displayed', function(){

    });

    it("displays a title", function () {
    });

    it("has a hamburger button", function(){
      
    });

    it("has layout buttons", function(){
      
    });
  });

  describe('content area', function(){
    it('is displayed', function(){

    });

    xit("fills the screen", function(){
      
    });
  });
});