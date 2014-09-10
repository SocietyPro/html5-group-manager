var Elements = function () {
  this.myGroupsContainer = element(by.id('myGroupsContainer'));
};

var elements;

describe("html5 group card interface", function () {

  it('reloads the page', function(){
    browser.get('/');
    elements = new Elements();
  });

  it("has an myGroupsContainer", function () {
    var myGroupsContainer = elements.myGroupsContainer;
    expect(myGroupsContainer.isDisplayed()).toBeTruthy();
  });

  var testCard;
  var cardholder;

  function setupTestCard(){
    element(by.id('quickAddTitle'))
    .sendKeys('Protractor Test Group');  

    element(by.css('#quickAddBox #quickAddButton'))
    .click();
    
    // The newly created group pops up the edit dialog. close this:
    element(by.css('material-dialog:first-child footer material-button:first-child'))
    .click();

    // Make sure the dialog is close:
    expect(
      element(by.css('material-dialog'))
      .isPresent()
    ).toBe(false);

    // Find the test card:
    cardholder = element(by.css('.cardholder:last-child'));
    expect(
      element(by.css('.cardholder:last-child'))
      .isDisplayed()
    ).toBe(true);

    testCard = cardholder.element(by.css('material-card.groupCard'));

  }

  describe("one groupCard", function(){
    it('creates a test groupCard', function(){
      setupTestCard();
    });

    describe('structure', function(){
      it('has a .cardholder container div', function(){
        expect(
          cardholder.isDisplayed()
        ).toBe(true);
      });

      it('has a visible <material-card> representing the group', function(){
        expect(
          testCard.isDisplayed()
        ).toBe(true);
      });

      it('has a hidden <material-card> representing an overflow menu', function(){
        expect(
          cardholder.element(by.css('material-card.overflowMenu'))
          .isDisplayed()
        ).toBe(false);
      });

      it('has duplicate and delete items in the .overflowMenu', function(){
        expect(
          cardholder.element(by.css('material-card.overflowMenu .overflowDuplicate'))
          .isPresent()
        ).toBe(true);

        expect(
          cardholder.element(by.css('material-card.overflowMenu .overflowDelete'))
          .isPresent()
        ).toBe(true);
      });

      it('has a hidden .cardMenuBar', function(){
        expect(
          testCard.element(by.css('.cardMenuBar'))
          .isPresent()
        ).toBe(true);

        expect(
          testCard.element(by.css('.cardMenuBar'))
          .isDisplayed()
        ).toBe(false);

      });

      it('has a .overflowMenuButton in the .cardMenuBar', function(){
        expect(
          testCard.element(by.css('.cardMenuBar .overflowMenuButton'))
          .isPresent()
        ).toBe(true);
      });
    });

    describe('contents', function(){
      it('has a title', function(){
        expect(
          testCard.element(by.css('h3'))
          .isPresent()
        ).toBe(true);

        expect(
          testCard.element(by.css('h3'))
          .getText()
        ).toBe("Protractor Test Group");

      });

      it('has an icon representing member count', function(){
        expect(
          testCard.element(by.css('.lightDetails img'))
          .isDisplayed()
        ).toBe(true);

      });
      
      it('has a count of members', function(){
        expect(
          testCard.element(by.css('.lightDetails span.groupMemberLength'))
          .isDisplayed()
        ).toBe(true);

        expect(
          testCard.element(by.css('.lightDetails span.groupMemberLength'))
          .getText()
        ).toBe("0");
      });

      it('has the group type', function(){
        expect(
          testCard.element(by.css('.lightDetails span.groupType'))
          .getText()
        ).toBe("Broadcast");
      });
    });

    describe('interaction', function(){
      beforeEach(function(){
        browser.get('/');
        setupTestCard();
      });

      it('displays the .cardMenuBar on mouseover', function(){
        browser.actions()
        .mouseMove(testCard)
        .perform();

        expect(
          testCard.element(by.css('.cardMenuBar'))
          .isDisplayed()
        ).toBe(true);
      });

      it('shows the hidden .overflowMenu when the overflow button is clicked', function(){
        var overflowButton = testCard.element(
          by.css('.overflowMenuButton')
        );

        browser.actions()
        .mouseMove(overflowButton)
        .click()
        .perform();

        expect(
          cardholder.element(by.css('.overflowMenu'))
          .isDisplayed()
        ).toBe(true);

      });

      it('hides the visible .overflowMenu when the overflow button is clicked again', function(){
        var overflowButton = testCard.element(
          by.css('.overflowMenuButton')
        );

        // Click to open:
        browser.actions()
        .mouseMove(overflowButton)
        .click()
        .perform();

        // Click to close:
        browser.actions()
        .mouseMove(overflowButton)
        .click()
        .perform();

        expect(
          cardholder.element(by.css('.overflowMenu'))
          .isDisplayed()
        ).toBe(false);

      });

      it('brings up the group edit dialog when the rest of the card is clicked', function(){
        cardholder.click();
        expect(
          element(by.tagName('material-dialog'))
          .isPresent()
        ).toBe(true);
      });
    });
  });
});