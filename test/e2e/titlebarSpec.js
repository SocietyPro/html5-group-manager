var Elements = function () {
  this.titlebar = element(by.id('quickAddBox'));
  this.textbox=element(by.id('quickAddTitle'));
  this.options=element.all(by.css('#quickAddBox select option'));
};
// get the options of a selector

var elements;


describe("groups and governance titlebar", function () {

  browser.get('/');
  elements = new Elements();
  var titlebar=elements.titlebar;
  var textbox=elements.textbox;
  var selector=element(by.css('#quickAddBox select '));
  var options = element.all(by.css('#quickAddBox select option'));

    it("is displayed", function () {
    expect(titlebar.isDisplayed()).toBe(true);
  });

  it("has a visible title input", function () {
    expect(textbox.getText()).toEqual("");
  });

  it("has an invisible group type selector", function () {
    expect(selector.isDisplayed()).toBe(false);
  });

   it("selector has the 'Broadcast' and 'Option' options", function () {
    //simulate some text input
      textbox.sendKeys("test");
       expect(
           options.get(0).getText()
       ).toEqual('Broadcast');
       expect(
           options.get(1).getText()
       ).toEqual('Open');

   });

  xit("shows all elements once the form is dirtied", function () {
    
  });

  xit("continues showing all elements once the dirty form loses focus", function(){

  });
  
  xit("becomes pristine and hides some elements after clicking save", function () {
    
  });

  xit("pops up the group edit window after clicking save", function () {
    
  });
  //pending test because this placeholder is an atribute
  xit("has placeholder text 'Add a group'", function () {
      expect(element(by.binding('notPresent')).isPresent()).toBe(false);
    });


});