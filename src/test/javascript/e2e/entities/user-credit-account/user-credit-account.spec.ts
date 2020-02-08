import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  UserCreditAccountComponentsPage,
  UserCreditAccountDeleteDialog,
  UserCreditAccountUpdatePage
} from './user-credit-account.page-object';

const expect = chai.expect;

describe('UserCreditAccount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userCreditAccountComponentsPage: UserCreditAccountComponentsPage;
  let userCreditAccountUpdatePage: UserCreditAccountUpdatePage;
  let userCreditAccountDeleteDialog: UserCreditAccountDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserCreditAccounts', async () => {
    await navBarPage.goToEntity('user-credit-account');
    userCreditAccountComponentsPage = new UserCreditAccountComponentsPage();
    await browser.wait(ec.visibilityOf(userCreditAccountComponentsPage.title), 5000);
    expect(await userCreditAccountComponentsPage.getTitle()).to.eq('anyrequestNextApp.userCreditAccount.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(userCreditAccountComponentsPage.entities), ec.visibilityOf(userCreditAccountComponentsPage.noResult)),
      1000
    );
  });

  it('should load create UserCreditAccount page', async () => {
    await userCreditAccountComponentsPage.clickOnCreateButton();
    userCreditAccountUpdatePage = new UserCreditAccountUpdatePage();
    expect(await userCreditAccountUpdatePage.getPageTitle()).to.eq('anyrequestNextApp.userCreditAccount.home.createOrEditLabel');
    await userCreditAccountUpdatePage.cancel();
  });

  it('should create and save UserCreditAccounts', async () => {
    const nbButtonsBeforeCreate = await userCreditAccountComponentsPage.countDeleteButtons();

    await userCreditAccountComponentsPage.clickOnCreateButton();

    await promise.all([
      userCreditAccountUpdatePage.setReceivedCreditsInput('5'),
      userCreditAccountUpdatePage.setUsedCreditsInput('5'),
      userCreditAccountUpdatePage.setTotalCreditsInput('5'),
      userCreditAccountUpdatePage.userSelectLastOption()
    ]);

    expect(await userCreditAccountUpdatePage.getReceivedCreditsInput()).to.eq('5', 'Expected receivedCredits value to be equals to 5');
    expect(await userCreditAccountUpdatePage.getUsedCreditsInput()).to.eq('5', 'Expected usedCredits value to be equals to 5');
    expect(await userCreditAccountUpdatePage.getTotalCreditsInput()).to.eq('5', 'Expected totalCredits value to be equals to 5');

    await userCreditAccountUpdatePage.save();
    expect(await userCreditAccountUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userCreditAccountComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last UserCreditAccount', async () => {
    const nbButtonsBeforeDelete = await userCreditAccountComponentsPage.countDeleteButtons();
    await userCreditAccountComponentsPage.clickOnLastDeleteButton();

    userCreditAccountDeleteDialog = new UserCreditAccountDeleteDialog();
    expect(await userCreditAccountDeleteDialog.getDialogTitle()).to.eq('anyrequestNextApp.userCreditAccount.delete.question');
    await userCreditAccountDeleteDialog.clickOnConfirmButton();

    expect(await userCreditAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
