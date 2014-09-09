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
      expect(elements.leftNavs.get(1).isDisplayed()).toBeFalsy();
    });

    it("starts closed", function(){
      
    });

    it("opens when hamburger is clicked", function(){
      var sidenav = 
          if (waitForElement({id: 'toolTitle'}, 'SocietyPro Groups and Governance', 25)) {
        expect(toolTitle.isDisplayed()).toBeTruthy();
        expect(toolTitle.getText()).toEqual('SocietyPro Groups and Governance');
      }
    });

    it("displays a scrim when open", function(){

    })

    it("closes when scrim is clicked", function(){
      
    });
  })

  describe('header toolbar', function(){
    it('is displayed', function(){

    });

    it("displays a title", function () {
      var toolTitle = element(by.id('toolTitle'));
      if (waitForElement({id: 'toolTitle'}, 'SocietyPro Groups and Governance', 25)) {
        expect(toolTitle.isDisplayed()).toBeTruthy();
        expect(toolTitle.getText()).toEqual('SocietyPro Groups and Governance');
      }
    });

    it("has a hamburger button", function(){
      
    });

    it("has layout buttons", function(){
      
    });
  });

  describe('content area')
    it('is displayed', function(){

    });

    xit("fills the screen", function(){
      
    });
  });
});