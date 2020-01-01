import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConversationComponentsPage, ConversationDeleteDialog, ConversationUpdatePage } from './conversation.page-object';

const expect = chai.expect;

describe('Conversation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let conversationComponentsPage: ConversationComponentsPage;
  let conversationUpdatePage: ConversationUpdatePage;
  let conversationDeleteDialog: ConversationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Conversations', async () => {
    await navBarPage.goToEntity('conversation');
    conversationComponentsPage = new ConversationComponentsPage();
    await browser.wait(ec.visibilityOf(conversationComponentsPage.title), 5000);
    expect(await conversationComponentsPage.getTitle()).to.eq('anyrequestNextApp.conversation.home.title');
  });

  it('should load create Conversation page', async () => {
    await conversationComponentsPage.clickOnCreateButton();
    conversationUpdatePage = new ConversationUpdatePage();
    expect(await conversationUpdatePage.getPageTitle()).to.eq('anyrequestNextApp.conversation.home.createOrEditLabel');
    await conversationUpdatePage.cancel();
  });

  it('should create and save Conversations', async () => {
    const nbButtonsBeforeCreate = await conversationComponentsPage.countDeleteButtons();

    await conversationComponentsPage.clickOnCreateButton();
    await promise.all([conversationUpdatePage.conversationStatusSelectLastOption()]);
    await conversationUpdatePage.save();
    expect(await conversationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await conversationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Conversation', async () => {
    const nbButtonsBeforeDelete = await conversationComponentsPage.countDeleteButtons();
    await conversationComponentsPage.clickOnLastDeleteButton();

    conversationDeleteDialog = new ConversationDeleteDialog();
    expect(await conversationDeleteDialog.getDialogTitle()).to.eq('anyrequestNextApp.conversation.delete.question');
    await conversationDeleteDialog.clickOnConfirmButton();

    expect(await conversationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
