import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContributionComponentsPage, ContributionDeleteDialog, ContributionUpdatePage } from './contribution.page-object';

const expect = chai.expect;

describe('Contribution e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contributionComponentsPage: ContributionComponentsPage;
  let contributionUpdatePage: ContributionUpdatePage;
  let contributionDeleteDialog: ContributionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Contributions', async () => {
    await navBarPage.goToEntity('contribution');
    contributionComponentsPage = new ContributionComponentsPage();
    await browser.wait(ec.visibilityOf(contributionComponentsPage.title), 5000);
    expect(await contributionComponentsPage.getTitle()).to.eq('anyrequestNextApp.contribution.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(contributionComponentsPage.entities), ec.visibilityOf(contributionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Contribution page', async () => {
    await contributionComponentsPage.clickOnCreateButton();
    contributionUpdatePage = new ContributionUpdatePage();
    expect(await contributionUpdatePage.getPageTitle()).to.eq('anyrequestNextApp.contribution.home.createOrEditLabel');
    await contributionUpdatePage.cancel();
  });

  it('should create and save Contributions', async () => {
    const nbButtonsBeforeCreate = await contributionComponentsPage.countDeleteButtons();

    await contributionComponentsPage.clickOnCreateButton();

    await promise.all([
      contributionUpdatePage.setContributingUserInput('contributingUser'),
      contributionUpdatePage.setContributionMessageInput('contributionMessage'),
      contributionUpdatePage.contributionStatusSelectLastOption(),
      contributionUpdatePage.conversationSelectLastOption(),
      contributionUpdatePage.userRequestSelectLastOption()
    ]);

    expect(await contributionUpdatePage.getContributingUserInput()).to.eq(
      'contributingUser',
      'Expected ContributingUser value to be equals to contributingUser'
    );
    expect(await contributionUpdatePage.getContributionMessageInput()).to.eq(
      'contributionMessage',
      'Expected ContributionMessage value to be equals to contributionMessage'
    );

    await contributionUpdatePage.save();
    expect(await contributionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await contributionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Contribution', async () => {
    const nbButtonsBeforeDelete = await contributionComponentsPage.countDeleteButtons();
    await contributionComponentsPage.clickOnLastDeleteButton();

    contributionDeleteDialog = new ContributionDeleteDialog();
    expect(await contributionDeleteDialog.getDialogTitle()).to.eq('anyrequestNextApp.contribution.delete.question');
    await contributionDeleteDialog.clickOnConfirmButton();

    expect(await contributionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
