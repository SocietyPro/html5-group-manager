var Elements = function () {
  this.myGroupsContainer = element(by.id('myGroupsContainer'));
};

var elements;

describe("html5 group card interface", function () {

  browser.get('/');
  elements = new Elements();
  
  it("has an myGroupsContainer", function () {
    var applicationContainer = elements.applicationContainer;
    expect(applicationContainer.isDisplayed()).toBeTruthy();
  });

  it("displays a newly created group as a new card", function(){

  });

  describe("one groupCard", function(){
    describe('structure', function(){
      it('has a .cardholder container div', function(){

      });

      it('has a visible <material-card> representing the group', function(){

      });

      it('has a hidden <material-card> representing an overflow menu', function(){

      });

      it('has delete and duplicate items in the .overflowMenu', function(){
        
      });

      it('has a hidden .cardMenuBar', function(){

      });

      it('has a .overflowMenuButton in the .cardMenuBar', function(){

      });
    });

    describe('contents', function(){
      it('has a title', function(){

      });

      it('has an icon representing member count', function(){

      });
      
      it('has a count of members', function(){

      });

      it('has the group type', function(){

      });
    });

    describe('interaction', function(){
      it('displays the .cardMenuBar on mouseover', function(){

      });

      it('shows the hidden .overflowMenu when the overflow button is clicked', function(){

      });

      it('hides the visible .overflowMenu when the overflow button is clicked again', function(){

      });

      it('brings up the group edit dialog when the rest of the card is clicked', function(){
        
      });
    });
  });
});