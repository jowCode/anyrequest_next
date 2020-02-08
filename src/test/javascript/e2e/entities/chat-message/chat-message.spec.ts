import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ChatMessageComponentsPage, ChatMessageDeleteDialog, ChatMessageUpdatePage } from './chat-message.page-object';

const expect = chai.expect;

describe('ChatMessage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let chatMessageComponentsPage: ChatMessageComponentsPage;
  let chatMessageUpdatePage: ChatMessageUpdatePage;
  let chatMessageDeleteDialog: ChatMessageDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ChatMessages', async () => {
    await navBarPage.goToEntity('chat-message');
    chatMessageComponentsPage = new ChatMessageComponentsPage();
    await browser.wait(ec.visibilityOf(chatMessageComponentsPage.title), 5000);
    expect(await chatMessageComponentsPage.getTitle()).to.eq('anyrequestNextApp.chatMessage.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(chatMessageComponentsPage.entities), ec.visibilityOf(chatMessageComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ChatMessage page', async () => {
    await chatMessageComponentsPage.clickOnCreateButton();
    chatMessageUpdatePage = new ChatMessageUpdatePage();
    expect(await chatMessageUpdatePage.getPageTitle()).to.eq('anyrequestNextApp.chatMessage.home.createOrEditLabel');
    await chatMessageUpdatePage.cancel();
  });

  it('should create and save ChatMessages', async () => {
    const nbButtonsBeforeCreate = await chatMessageComponentsPage.countDeleteButtons();

    await chatMessageComponentsPage.clickOnCreateButton();

    await promise.all([
      chatMessageUpdatePage.setOwningUserInput('owningUser'),
      chatMessageUpdatePage.setMessageInput('message'),
      chatMessageUpdatePage.conversationSelectLastOption()
    ]);

    expect(await chatMessageUpdatePage.getOwningUserInput()).to.eq('owningUser', 'Expected OwningUser value to be equals to owningUser');
    expect(await chatMessageUpdatePage.getMessageInput()).to.eq('message', 'Expected Message value to be equals to message');

    await chatMessageUpdatePage.save();
    expect(await chatMessageUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await chatMessageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ChatMessage', async () => {
    const nbButtonsBeforeDelete = await chatMessageComponentsPage.countDeleteButtons();
    await chatMessageComponentsPage.clickOnLastDeleteButton();

    chatMessageDeleteDialog = new ChatMessageDeleteDialog();
    expect(await chatMessageDeleteDialog.getDialogTitle()).to.eq('anyrequestNextApp.chatMessage.delete.question');
    await chatMessageDeleteDialog.clickOnConfirmButton();

    expect(await chatMessageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
