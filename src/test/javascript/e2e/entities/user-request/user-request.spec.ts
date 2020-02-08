import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserRequestComponentsPage, UserRequestDeleteDialog, UserRequestUpdatePage } from './user-request.page-object';

const expect = chai.expect;

describe('UserRequest e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userRequestComponentsPage: UserRequestComponentsPage;
  let userRequestUpdatePage: UserRequestUpdatePage;
  let userRequestDeleteDialog: UserRequestDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserRequests', async () => {
    await navBarPage.goToEntity('user-request');
    userRequestComponentsPage = new UserRequestComponentsPage();
    await browser.wait(ec.visibilityOf(userRequestComponentsPage.title), 5000);
    expect(await userRequestComponentsPage.getTitle()).to.eq('anyrequestNextApp.userRequest.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(userRequestComponentsPage.entities), ec.visibilityOf(userRequestComponentsPage.noResult)),
      1000
    );
  });

  it('should load create UserRequest page', async () => {
    await userRequestComponentsPage.clickOnCreateButton();
    userRequestUpdatePage = new UserRequestUpdatePage();
    expect(await userRequestUpdatePage.getPageTitle()).to.eq('anyrequestNextApp.userRequest.home.createOrEditLabel');
    await userRequestUpdatePage.cancel();
  });

  it('should create and save UserRequests', async () => {
    const nbButtonsBeforeCreate = await userRequestComponentsPage.countDeleteButtons();

    await userRequestComponentsPage.clickOnCreateButton();

    await promise.all([
      userRequestUpdatePage.setRequestingUserInput('requestingUser'),
      userRequestUpdatePage.setTitleInput('title'),
      userRequestUpdatePage.setDescriptionInput('description'),
      userRequestUpdatePage.urgencySelectLastOption(),
      userRequestUpdatePage.setValidToInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      userRequestUpdatePage.setContributorCountInput('5')
    ]);

    expect(await userRequestUpdatePage.getRequestingUserInput()).to.eq(
      'requestingUser',
      'Expected RequestingUser value to be equals to requestingUser'
    );
    expect(await userRequestUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await userRequestUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await userRequestUpdatePage.getValidToInput()).to.contain(
      '2001-01-01T02:30',
      'Expected validTo value to be equals to 2000-12-31'
    );
    expect(await userRequestUpdatePage.getContributorCountInput()).to.eq('5', 'Expected contributorCount value to be equals to 5');
    const selectedHasContributed = userRequestUpdatePage.getHasContributedInput();
    if (await selectedHasContributed.isSelected()) {
      await userRequestUpdatePage.getHasContributedInput().click();
      expect(await userRequestUpdatePage.getHasContributedInput().isSelected(), 'Expected hasContributed not to be selected').to.be.false;
    } else {
      await userRequestUpdatePage.getHasContributedInput().click();
      expect(await userRequestUpdatePage.getHasContributedInput().isSelected(), 'Expected hasContributed to be selected').to.be.true;
    }
    const selectedIsBlocked = userRequestUpdatePage.getIsBlockedInput();
    if (await selectedIsBlocked.isSelected()) {
      await userRequestUpdatePage.getIsBlockedInput().click();
      expect(await userRequestUpdatePage.getIsBlockedInput().isSelected(), 'Expected isBlocked not to be selected').to.be.false;
    } else {
      await userRequestUpdatePage.getIsBlockedInput().click();
      expect(await userRequestUpdatePage.getIsBlockedInput().isSelected(), 'Expected isBlocked to be selected').to.be.true;
    }

    await userRequestUpdatePage.save();
    expect(await userRequestUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last UserRequest', async () => {
    const nbButtonsBeforeDelete = await userRequestComponentsPage.countDeleteButtons();
    await userRequestComponentsPage.clickOnLastDeleteButton();

    userRequestDeleteDialog = new UserRequestDeleteDialog();
    expect(await userRequestDeleteDialog.getDialogTitle()).to.eq('anyrequestNextApp.userRequest.delete.question');
    await userRequestDeleteDialog.clickOnConfirmButton();

    expect(await userRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
