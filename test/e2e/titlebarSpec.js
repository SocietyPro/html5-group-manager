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

  xit("has a visible title input", function () {
  });
  
  xit("has placeholder text 'Add a group'", function () {
    
  });

  xit("has an invisible group type selector", function () {
  });

  xit("has an invisible group type selector", function () {
  });
  
  xit("shows all elements once the form is dirtied", function () {
    
  });

  xit("continues showing all elements once the dirty form loses focus", function(){

  });
  
  xit("becomes pristine and hides some elements after clicking save", function () {
    
  });

  xit("pops up the group edit window after clicking save", function () {
    
  });
});