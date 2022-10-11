const waitToNavigate = duration =>
  new Promise(resolve => setTimeout(() => resolve(), duration));

describe('Example E2E Testing', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have home screen', async () => {
    await expect(element(by.id('home-screen'))).toBeVisible();
  });

  it('should press change theme between dark and light', async () => {
    await element(by.id('burger-menu')).tap();
    await element(by.id('theme-menu')).tap();

    waitToNavigate(1000);

    await element(by.id('theme-menu')).tap();

    await element(by.id('language-menu')).swipe('up');
  });
});
