import { element, by, ElementFinder } from 'protractor';

export class ChatMessageComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-chat-message div table .btn-danger'));
  title = element.all(by.css('jhi-chat-message div h2#page-heading span')).first();

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ChatMessageUpdatePage {
  pageTitle = element(by.id('jhi-chat-message-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  owningUserInput = element(by.id('field_owningUser'));
  messageInput = element(by.id('field_message'));
  conversationSelect = element(by.id('field_conversation'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOwningUserInput(owningUser) {
    await this.owningUserInput.sendKeys(owningUser);
  }

  async getOwningUserInput() {
    return await this.owningUserInput.getAttribute('value');
  }

  async setMessageInput(message) {
    await this.messageInput.sendKeys(message);
  }

  async getMessageInput() {
    return await this.messageInput.getAttribute('value');
  }

  async conversationSelectLastOption() {
    await this.conversationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async conversationSelectOption(option) {
    await this.conversationSelect.sendKeys(option);
  }

  getConversationSelect(): ElementFinder {
    return this.conversationSelect;
  }

  async getConversationSelectedOption() {
    return await this.conversationSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ChatMessageDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-chatMessage-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-chatMessage'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
