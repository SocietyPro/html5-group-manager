var Elements = function () {
  this.applicationContainer = element(by.id('applicationContainer'));
  this.navMenuTitle = element(by.id('navMenuTitle'));
  this.sidenav = element(by.css('material-sidenav'));
  this.menuDrawerButton = element(by.css('.menu-icon'));
  this.myGroupsFilterButton = element.all(by.css('.menu-sub-item')).get(0);
  this.myPeerListsFilterButton = element.all(by.css('.menu-sub-item')).get(1);
  this.toolTitle = element(by.id('toolTitle'));
  this.viewButtons = element(by.id('viewButtons'));
  this.streamButton = element(by.id('streamButton'));
  this.quiltButton = element(by.id('quiltButton'));
  this.contentArea = element(by.id('contentArea'));
  this.groupCards = element.all(by.css('.cardholder'));
};

var elements;
var toolTitle;

describe("html5 application shell", function () {

  beforeEach(function () {
    browser.get("index.html");
    elements = new Elements();
  });

  it("has an application container", function () {
    expect(elements.applicationContainer.isDisplayed()).toBeTruthy();
  });

  describe('left nav menu', function () {

    it("is closed by default", function () {
      expect(elements.sidenav.isDisplayed()).toBeTruthy();
      expect(elements.sidenav.getAttribute('class')).toEqual('material-sidenav-left material-whiteframe-z2 ng-isolate-scope');
    });

    it("opens with the menu drawer button", function () {
      expect(elements.menuDrawerButton.isDisplayed()).toBeTruthy();
      elements.menuDrawerButton.click();
      browser.sleep(500);
      expect(elements.sidenav.getAttribute('class')).toEqual('material-sidenav-left material-whiteframe-z2 ng-isolate-scope open');
      expect(elements.navMenuTitle.isDisplayed()).toBeTruthy();
      expect(elements.navMenuTitle.getText()).toEqual('Society Pro');
    });

    it("displays a scrim when open", function () {
      expect(browser.isElementPresent(by.css('material-backdrop'))).toBeFalsy();
      elements.menuDrawerButton.click();
      browser.sleep(500);
      expect(browser.isElementPresent(by.css('material-backdrop'))).toBeTruthy();
    });

    it("closes when scrim is clicked", function () {
      elements.menuDrawerButton.click();
      browser.sleep(500);
      expect(elements.sidenav.getAttribute('class')).toEqual('material-sidenav-left material-whiteframe-z2 ng-isolate-scope open');
      element(by.css('material-backdrop')).click();
      expect(elements.sidenav.getAttribute('class')).toEqual('material-sidenav-left material-whiteframe-z2 ng-isolate-scope');
    });

    it("has group type filter buttons", function () {
      expect(elements.myGroupsFilterButton.getText()).toEqual('MYGROUPS');
      expect(elements.myPeerListsFilterButton.getText()).toEqual('MYPEERLISTS');
    });

    it("filters the groups list when the group filter buttons are clicked", function () {
      elements.menuDrawerButton.click();
      browser.sleep(500);
      expect(elements.groupCards.count()).toEqual(2);
      elements.myGroupsFilterButton.click();
      expect(elements.groupCards.count()).toEqual(2);
      elements.myPeerListsFilterButton.click();
      expect(elements.groupCards.count()).toEqual(0);
    });

  });

  describe('top toolbar', function () {

    it("displays a title", function () {
      expect(elements.toolTitle.isDisplayed()).toBeTruthy();
      expect(elements.toolTitle.getText()).toEqual("Groups & Governance");
    });

    it("has list view buttons", function () {
      expect(elements.viewButtons.isDisplayed()).toBeTruthy();
      expect(elements.streamButton.isDisplayed()).toBeTruthy();
      expect(elements.quiltButton.isDisplayed()).toBeTruthy();
    });
  });

  describe('content area', function () {

    it('is displayed', function(){
      expect(elements.contentArea.isDisplayed()).toBeTruthy();
    });

  });

});