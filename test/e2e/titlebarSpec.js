var Elements = function () {
  this.titlebar = element(by.id('quickAddBox'));
};

var elements;

describe("groups and governance titlebar", function () {

  browser.get('/');
  elements = new Elements();
  
  it("is displayed", function () {
    titlebar = element(by.id('quickAddBox'));
    expect(titlebar.isDisplayed()).toBe(true);
  });

  it("has a visible title input", function () {
  });
  
  it("has placeholder text 'Add a group'", function () {
    
  });

  it("has an invisible group type selector", function () {
  });

  it("has an invisible group type selector", function () {
  });
  
  it("shows all elements once the form is dirtied", function () {
    
  });

  it("continues showing all elements once the dirty form loses focus", function(){

  });
  
  it("becomes pristine and hides some elements after clicking save", function () {
    
  });

  it("pops up the group edit window after clicking save", function () {
    
  });
});