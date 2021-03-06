var Elements = function () {
  this.applicationContainer = element(by.id('applicationContainer'));
};

var elements;

describe("zoom and edit view", function () {

  // Helper Functions
  function createTestGroup(){
    //TODO: Figure out how to make this not reliant on old-to-latest sorting
    /*
    var testGroup = element(by.css('.cardholder:last-child'));
    //var lastCard = element.all(by.css('.cardholder')).last();
    var testTitle = testGroup.element(by.tagName('h3'));
    if(testTitle.getText() === 'Protractor Test Group'){

      return true;
    };
    */
    expect(
      element(by.tagName('material-dialog'))
      .isPresent()
    ).toBe(false);

    element(by.id('quickAddTitle'))
    .sendKeys('Protractor Test Group');  

    element(by.css('#quickAddBox #quickAddButton'))
    .click();

    expect(
      element(by.tagName('material-dialog'))
      .isPresent()
    ).toBe(true);

    return true;
  }

  function openDialog(){
    //closeDialog();
    // Make sure there's a test group and click it:
    createTestGroup();
    //element(by.css('.cardholder:last-child')).click();
  };

  function closeDialog(){
    // Click the close button:
    element(by.css('material-dialog footer material-button:first-child'))
    .click()
    /*
    if( 
      browser.isElementPresent(
        by.css('material-dialog:first-child footer material-button:first-child')
      )
    ){
    } else {
      return true;
    }
    */
  };

  /* This seems to break promises if you want to chain .all off it to get child elements. 
  Use css selectors instead, unless you need this element specifically */
  /*
  var Dialog = function(){
    return element(by.tagName('material-dialog'));
  }
    var dialog;
      dialog = new Dialog();
  */

  //
  // Begin Tests:
  //

  it('reloads the page', function(){
    browser.get('/');
    elements = new Elements();
  });

  it('tests opening a dialog', function(){
    openDialog();
    expect(element(by.tagName('material-dialog')).isDisplayed()).toBe(true);
  });

  it('tests closing a dialog', function(){
    closeDialog();
    expect(element(by.tagName('material-dialog')).isPresent()).toBe(false);
    /*
    destroyTestGroup(function(){
      expect(element(by.css('.cardholder:last-child'))
        .element(by.tagName('h3'))
        .getText()
      ).not.toEqual('Protractor Test Group');
      done();
    });
    */

  });

  describe('layout', function(){
    it('sets up by opening the dialog', function(){
      openDialog();
      expect(element(by.tagName('material-dialog')).isDisplayed()).toBe(true);
    })

    describe('content div', function(){
      it('has a content div', function(){
        expect(
          element.all(by.css('material-dialog .dialog-content'))
          .count()
        ).toBe(1);
      });

      it('contains "Group Management", a member icon and a member count', function(){
        expect(
          element(by.css('#groupDialogCaption h3'))
          .getText()
        ).toEqual('Group Management');

        expect(
          element(by.css('#groupDialogCaption img'))
          .isDisplayed()
        ).toBe(true);

        expect(
          element(by.css('#groupDialogCaption span'))
          .isDisplayed()
        ).toBe(true);
      });

      it('contains a group name input', function(){
        expect(
          element(by.css('input#groupName'))
          .isDisplayed()
        ).toBe(true);
      });

      it('contains a group type selector', function(){
        expect(
          element(by.css('#groupTypeContainer .custom-dropdown select'))
          .isDisplayed()
        ).toBe(true);
      });

      it('contains two sections', function(){
        expect(
          element.all(by.css('material-dialog .dialog-content section'))
          .count()
        ).toBe(2);
      });

      it('contains two material-list', function(){
        expect(
          element.all(by.css('material-dialog section material-list'))
          .count()
        ).toBe(2);
      });
    });

    describe('footer', function(){
      it('has a footer div ', function(){
        expect(
          element.all(by.css('material-dialog footer'))
          .count()
        ).toBe(1);
      });

      it('contains two material-buttons, close and save', function(){
        var footerButtons = element.all(by.css('material-dialog footer material-button'));
        expect(footerButtons.count()).toBe(2);
        expect(footerButtons.get(0).getText()).toEqual('CLOSE');
        expect(footerButtons.get(1).getText()).toEqual('SAVE');
      });
    });
  });

  describe('contents', function(){
    
  });

  describe('interaction', function(){
    // Refresh the page before every interaction test, 
    // then add a test group and make sure the dialog is open
    beforeEach(function(){
      browser.get('/');
      createTestGroup();
      //element(by.css('.cardholder:last-child')).click();
      expect(
        element(by.tagName('material-dialog'))
        .isDisplayed()
      ).toBe(true);
    });

    it('closes when you click the scrim', function(){
      browser.actions()
      .mouseMove(
        element(by.css('.material-dialog-container'))
        , -20, -20  // pixel offset from top left
      )
      .click()
      .perform();

      expect(
        element.all(by.css('material-dialog'))
        .count()
      ).toBe(0);
    });

    it('closes when you click the close button', function(){
      var close = element(by.css('material-dialog footer material-button:first-child'));
      expect(close.getText()).toEqual('CLOSE');
      close.click();
      
      expect(
        element.all(by.css('material-dialog'))
        .count()
      ).toBe(0);
    });

    it('closes when you click the save button', function(){
      var save = element(by.css('material-dialog footer material-button:last-child'));
      expect(save.getText()).toEqual('SAVE');
      save.click();
      
      expect(
        element.all(by.css('material-dialog'))
        .count()
      ).toBe(0);
      
    });

    it('reflects name and type changes on the card', function(){
      element(by.css('material-dialog #groupName'))
      .sendKeys('EDIT');

      // Open dropdown:
      element(by.css('material-dialog #groupTypeContainer select'))
      .click();

      // Click the first option:
      var option1 = element(by.css('material-dialog #groupTypeContainer select option:first-child'))

      expect( option1.getText()).toEqual('Broadcast');
      option1.click();

      var save = element(by.css('material-dialog footer material-button:last-child'));
      expect(save.getText()).toEqual('SAVE');
      save.click();

      var lastCardTitle = element(by.css('.cardholder:last-child h3'));
      var lastCardType = element(by.css('.cardholder:last-child .lightDetails span.groupType'));

      expect(lastCardTitle.getText()).toEqual('Protractor Test GroupEDIT');
      expect(lastCardType.getText()).toEqual('Broadcast');
    });

    it('has the expected mock peers', function(){
      var peers = element.all(by.css('material-dialog section.peers material-item'));
      expect(peers.count()).toBe(3);

      var firstPeerName = element(
        by.css('material-dialog section.peers material-item:first-child span')
      );
      expect(firstPeerName.getText()).toEqual('hiro')
    });

    describe('adding a peer', function(){
      // Add the page before each test:
      beforeEach(function(){
        var firstPeerLeftArrow = element(
          by.css('material-dialog section.peers material-item:first-child img')
        );
        expect(firstPeerLeftArrow.isDisplayed()).toBe(true);

        // Move the first peer to the members pane:
        firstPeerLeftArrow.click();
      });

      it('adds the peer to Members', function(){
        var members = element.all(by.css('material-dialog section.members material-item'));
        expect(members.count()).toBe(1);

        var firstMemberName = element(
          by.css('material-dialog section.members material-item:first-child span')
        );
        expect(firstMemberName.getText()).toEqual('hiro')

      }); 

      it('hides the peer from Peers', function(){
        // Check that the member is gone from the member list:
        var peers = element.all(by.css('material-dialog section.peers material-item'));
        expect(peers.count()).toBe(2);

        var firstPeerName = element(
          by.css('material-dialog section.peers material-item:first-child span')
        );
        expect(firstPeerName.getText()).toEqual('plato')
      });

      it('updates the member count', function(){
        expect(
          element(by.css('material-dialog #groupDialogCaption span'))
          .getText()
        ).toEqual('1');
      });
    });

    describe('removing a peer', function(){
      // Add the peer and then remove it before each test:
      beforeEach(function(){
        var firstPeerLeftArrow = element(
          by.css('material-dialog section.peers material-item:first-child img')
        );
        expect(firstPeerLeftArrow.isDisplayed()).toBe(true);

        // Move the first peer to the members pane:
        firstPeerLeftArrow.click();

        // Move the member back to the peers pane:
        var firstMemberRightArrow = element(
          by.css('material-dialog section.members material-item:first-child img')
        );
        expect(firstMemberRightArrow.isDisplayed()).toBe(true);
        firstMemberRightArrow.click();

      });

      it('adds the peer to Peers', function(){
        // Check that the member is added to the peer list:
        var peers = element.all(by.css('material-dialog section.peers material-item'));
        expect(peers.count()).toBe(3);

        var firstPeerName = element(
          by.css('material-dialog section.peers material-item:first-child span')
        );
        expect(firstPeerName.getText()).toEqual('hiro')
      }); 

      it('hides the peer from Members', function(){
        // Check that the peer is gone from the member list:
        var members = element.all(by.css('material-dialog section.members material-item'));
        expect(members.count()).toBe(0);
      });

      it('updates the member count', function(){
        expect(
          element(by.css('material-dialog #groupDialogCaption span'))
          .getText()
        ).toEqual('0');
      });

    });

    xit('saves when you click save', function(){

    });

  });

});


/*
  // Helper functions for these tests

  // Make sure the name of the test group here matches that in destroyTestGroup

  // Note this is asynchronous
  function destroyTestGroup(done){
    closeDialog();

    // Some extra code to make sure we actually get rid of the group:

    // Since protractor's element counts are a promise, 
    // we set up a function that delays our done() callback till we have both.
    // We'll call it first with (nInitial, null) and then (null, nPostDeletion)
    var count0 = null;
    var count1 = null;
    function updateCounts(c0, c1){
      if(c0 !== null) { count0 = c0};
      if(c1 !== null) { count1 = c1};
      if(count0 !== null && count1 !== null){
        if(count1 !== (count0 - 1)){
          console.log('count0',count0,'count1',count1)
          throw('destroyTestGroup apparently failed to destroy the Protractor Test Group')
        }
        // Now that we have a sane results we know the group was removed and now callback:
        done();
      }
    }

    // Count the cards before deletion
    var nCards0 = element.all(by.css('.cardholder'))
      .count()
      .then(function(value){
        updateCounts(value, null);
      });

    // Get the last card on the page and make sure it's the test group
    var lastCard = element.all(by.css('.cardholder')).last();
    var lastCardTitle = lastCard.element(by.tagName('h3'));
    console.log('lastCardTitle', lastCardTitle.getText());

    if(lastCardTitle.getText() !== 'Protractor Test Group'){
      throw('destroyTestGroup expected the last group to be the Protractor Test Group')
    }

    // Delete the test group
    browser.actions().
      mouseMove(lastCard).
      perform(); 

    // Click the overflow menu button then the delete item
    lastCard.element(by.css('.overflowMenuIcon')).click();
    if(lastCard.element(by.css('.overflowMenu')).isDisplayed()
      !== true){ throw('Failed to click the overflow icon while deleting the test group')}

    var deleteLink = lastCard.element(by.css('.overflowMenu a:last-child'));
    if(deleteLink.getText().toLowerCase()
      !== 'delete'){ throw('Failed to find the delete link while deleting the test group')}

    // All good!
    deleteLink.click();

    // We have to tell protractor how to handle the browser's popup alert box:
    var confirmationDialog = browser.switchTo().alert();
    confirmationDialog.accept();

    // Count the cards again post-deletion:
    var nCards1 = element.all(by.css('.cardholder'))
      .count()
      .then(function(value){
        console.log('Resolving count1');
        updateCounts(null, value);
      });

    // Once both promises resolve, the updateCounts function will callback done()
  };
  */
