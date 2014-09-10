var Elements = function () {
  this.applicationContainer = element(by.id('applicationContainer'));
};

var elements;

describe("zoom and edit view", function () {

  function closeDialog(){
    element(by.css('material-dialog:first-child footer material-button:first-child'))
    .click();
  };

  browser.get('/');
  elements = new Elements();

  describe('structure', function(){
    it('opens the dialog with a new test group', function(){
      element(by.id('quickAddTitle')).sendKeys('Protractor Test Group', protractor.Key.ENTER);  
      expect(element(by.tagName('material-dialog')).isDisplayed()).toBe(true);
    });

    var dialog; 
    it('has a container .material-dialog-container', function(){
      dialog = element.all(by.tagName('material-dialog')).get(0);
      //expect(dialogs.count()).toBe(1);
      //dialog = dialogs.get(0);
      expect(dialog.isDisplayed()).toBe(true);
    });

    it('closes the dialog and deletes the test group', function(done){
      closeDialog();
      var count0 = null;
      var count1 = null;
      function updateCounts(c0, c1){
        console.log('updateCounts from',count0,count1,'to',c0, c1);
        if(c0 !== null) { count0 = c0};
        if(c1 !== null) { count1 = c1};
        if(count0 !== null && count1 !== null){
          // Both promises resolved
          console.log('Finishing up with expectation')
          expect(count1).toEqual(count0 - 1);
          done();
        }
      }

      var nCards0 = element.all(by.css('.cardholder'))
      .count()
      .then(function(value){
        console.log('Resolving count0');
        updateCounts(value, null);
      });

      // Get the last card on the page and make sure it's the test group
      var lastCard = element.all(by.css('.cardholder')).last();
      var lastCardTitle = lastCard.element(by.tagName('h3'));
      expect(lastCardTitle.getText()).toEqual('Protractor Test Group');

      // Delete the test group
      browser.actions().
        mouseMove(lastCard).
        perform(); 
      lastCard.element(by.css('.overflowMenuIcon')).click();
      expect(lastCard.element(by.css('.overflowMenu')).isDisplayed()).toBe(true);
      lastCard.element(by.css('.overflowMenu a:last-child')).click();
      var confirmationDialog = browser.switchTo().alert();
      confirmationDialog.accept();
      var nCards1 = element.all(by.css('.cardholder'))
      .count()
      .then(function(value){
        console.log('Resolving count1');
        updateCounts(null, value);
      });
    });
  });

  describe('contents', function(){

  });

  describe('interaction', function(){
    it("pops up a modal dialog", function () {
      var applicationContainer = elements.applicationContainer;
      expect(applicationContainer.isDisplayed()).toBeTruthy();
    });
  });

});