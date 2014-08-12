var Elements = function () {
  //this.applicationContainer = element(by.id('applicationContainer'));
  this.toolTitle = element(by.id('toolTitle'));
};

var elements;

describe("html5 application shell", function () {
/*
  it('loads the page and waits for polymer-ready', function(done){
    browser.get('index.html');
    document.
  })
*/
  it("sets up the tests", function () {
    /*browser.get('/').then(function () {
      console.log('sleeping');
      browser.driver.sleep(5000).then(function () {
        console.log('awake');
        elements = new Elements();
        expect(elements.toolTitle.isDisplayed()).toBeTruthy();
        expect(elements.toolTitle.getText()).toEqual('SocietyPro Groups and Governanance');
      });
    });*/
    /*browser.wait(function () {
      document.
    });*/
    var localReady;

    browser.get('/');
    browser.wait(function () {
      console.log('waiting for polymer');
      browser.executeScript(function () {
        return soProTestsReady == true;
      });
    });

    browser.get('/').then(function () {
      browser.wait(function(){
        console.log('waiting for polymer');
        localReady = browser.executeScript(function () {
          return soProTestsReady == true;
        });
        return localReady;
      }).then(function () {
        console.log('done waiting');
        console.log(localReady);
        elements = new Elements();
        expect(elements.toolTitle.isDisplayed()).toBeTruthy();
        expect(elements.toolTitle.getText()).toEqual('SocietyPro Groups and Governanance');
      });
    });
  });

});