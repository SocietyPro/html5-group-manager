var Elements = function () {
  this.myGroupsContainer = element(by.id('myGroupsContainer'));
};

var elements;

describe("html5 group card interface", function () {

  browser.get('/');
  elements = new Elements();
  
  it("has an myGroupsContainer", function () {
    var myGroupsContainer = elements.myGroupsContainer;
    expect(myGroupsContainer.isDisplayed()).toBeTruthy();
  });

  xit("displays a newly created group as a new card", function(){

  });

  describe("one groupCard", function(){
    describe('structure', function(){
      xit('has a .cardholder container div', function(){

      });

      xit('has a visible <material-card> representing the group', function(){

      });

      xit('has a hidden <material-card> representing an overflow menu', function(){

      });

      xit('has delete and duplicate items in the .overflowMenu', function(){
        
      });

      xit('has a hidden .cardMenuBar', function(){

      });

      xit('has a .overflowMenuButton in the .cardMenuBar', function(){

      });
    });

    describe('contents', function(){
      xit('has a title', function(){

      });

      xit('has an icon representing member count', function(){

      });
      
      xit('has a count of members', function(){

      });

      xit('has the group type', function(){

      });
    });

    describe('interaction', function(){
      xit('displays the .cardMenuBar on mouseover', function(){

      });

      xit('shows the hidden .overflowMenu when the overflow button is clicked', function(){

      });

      xit('hides the visible .overflowMenu when the overflow button is clicked again', function(){

      });

      xit('brings up the group edit dialog when the rest of the card is clicked', function(){
        element(by.css('.cardholder:last-child')).click();
        expect(
          element(by.tagName('material-dialog'))
          .isPresent()
        ).toBe(true);
      });
    });
  });
});