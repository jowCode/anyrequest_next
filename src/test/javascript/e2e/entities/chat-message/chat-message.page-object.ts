import { element, by, ElementFinder } from 'protractor';

export class ChatMessageComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-chat-message div table .btn-danger'));
  title = element.all(by.css('jhi-chat-message div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
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

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOwningUserInput(owningUser: string): Promise<void> {
    await this.owningUserInput.sendKeys(owningUser);
  }

  async getOwningUserInput(): Promise<string> {
    return await this.owningUserInput.getAttribute('value');
  }

  async setMessageInput(message: string): Promise<void> {
    await this.messageInput.sendKeys(message);
  }

  async getMessageInput(): Promise<string> {
    return await this.messageInput.getAttribute('value');
  }

  async conversationSelectLastOption(): Promise<void> {
    await this.conversationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async conversationSelectOption(option: string): Promise<void> {
    await this.conversationSelect.sendKeys(option);
  }

  getConversationSelect(): ElementFinder {
    return this.conversationSelect;
  }

  async getConversationSelectedOption(): Promise<string> {
    return await this.conversationSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ChatMessageDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-chatMessage-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-chatMessage'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
