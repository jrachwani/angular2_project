import { Angular2ReusableComponentPage } from './app.po';

describe('angular2-reusable-component App', () => {
  let page: Angular2ReusableComponentPage;

  beforeEach(() => {
    page = new Angular2ReusableComponentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
