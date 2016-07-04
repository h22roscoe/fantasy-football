import { FantasyFootballPage } from './app.po';

describe('fantasy-football App', function() {
  let page: FantasyFootballPage;

  beforeEach(() => {
    page = new FantasyFootballPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
