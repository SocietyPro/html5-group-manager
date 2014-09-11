var Elements = function () {
  this.titlebar   = element(by.id('quickAddBox'));
  this.textbox    = element(by.id('quickAddTitle'));
  this.options    = element.all(by.css('#quickAddBox select option'));
  this.saveButton = element(by.css('#quickAddBox material-button'))
};
// get the options of a selector

var elements;


describe("groups and governance titlebar", function () {

  // By declaring these variables here, they are available in this and all child scopes
  // This is necessary because we're setting them inside an it block, which is a different scope
  var titlebar, textbox, selector, options;

  it('loads the page', function(){
    browser.get('/');
    elements = new Elements();
    titlebar = elements.titlebar;
    textbox  = elements.textbox;
    selector = element(by.css('#quickAddBox select'));
    options  = element.all(by.css('#quickAddBox select option'));
  });

  describe('layout', function(){
    it("is displayed", function () {
      expect(titlebar.isDisplayed()).toBe(true);
    });
  });

  describe('content', function(){

    describe('title input', function(){
      it("has a visible title input", function () {
        expect(textbox.isDisplayed()).toEqual(true);
        expect(textbox.getText()).toEqual("");
      });

      it("has placeholder text 'Add a Group...'", function () {
        expect(textbox.getAttribute('placeholder')).toEqual('Add a Group...');
      });
    });

    describe('group type select dropdown', function(){
      it("is not visible when the page loads", function () {
        expect(selector.isDisplayed()).toBe(false);
        expect(
          options.get(0).isDisplayed()
        ).toBe(false);

        expect(
          options.get(1).isDisplayed()
        ).toBe(false);
        
      });

     describe('save button', function(){
      it("is not visible when the page loads", function () {
        expect(elements.saveButton.isPresent())
        .toBe(true);

        expect(elements.saveButton.isDisplayed())
        .toBe(false);
      });
     });
    });
  });

  describe('interaction', function(){
    // Refresh the page before each `it` block, to make sure we know the test's starting conditions:
    beforeEach(function(){
      browser.get('/');
    });

    describe('entering text in the title input', function(){
      beforeEach(function(){
        //simulate some text input to show the hidden elements
        textbox.sendKeys("test");
      });

      it("displays a selector with 'Broadcast' and 'Option' options", function () {
        expect(
          options.get(0).isDisplayed()
        ).toBe(true);

        expect(
          options.get(0).getText()
        ).toEqual('Broadcast');

        expect(
          options.get(1).isDisplayed()
        ).toBe(true);
        
        expect(
          options.get(1).getText()
        ).toEqual('Open');
      });
      
      it("displays the save button", function () {
        expect(elements.saveButton.isDisplayed())
        .toBe(true);
      });

      it("continues showing all elements if the title input loses focus", function(){
        // Click somewhere outside the element:
        browser.actions()
        .mouseMove(textbox, -20, 0)  // pixel offset: 20px left of top left
        .click()
        .perform();

        expect(elements.saveButton.isDisplayed())
        .toBe(true);
        expect(selector.isDisplayed())
        .toBe(true);
      });

      describe('deleting all input text', function(){
        it("continues showing all elements", function(){
          //var b = browser.Key.BACKSPACE;
          //textbox.sendKeys(b,b,b,b) // clears "test"
          textbox.clear();

          expect(textbox.getText()).toEqual('');

          expect(elements.saveButton.isDisplayed())
          .toBe(true);

          expect(selector.isDisplayed())
          .toBe(true);
        });
      });

      describe('clicking save', function(){
        beforeEach(function(){
          elements.saveButton.click();
        });

        it("clears the textbox, hides the dropdown, hides the save button", function () {
          expect(textbox.getText()).toEqual('');

          expect(elements.saveButton.isDisplayed())
          .toBe(false);

          expect(selector.isDisplayed())
          .toBe(false);
          
        });

        it("pops up the group edit window", function () {
          expect(
            element(by.css('material-dialog'))
            .isDisplayed()
          ).toBe(true);
        });
      });
    });
  });
});