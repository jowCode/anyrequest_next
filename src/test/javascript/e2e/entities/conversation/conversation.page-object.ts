import { element, by, ElementFinder } from 'protractor';

export class ConversationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-conversation div table .btn-danger'));
  title = element.all(by.css('jhi-conversation div h2#page-heading span')).first();

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

export class ConversationUpdatePage {
  pageTitle = element(by.id('jhi-conversation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  conversationStatusSelect = element(by.id('field_conversationStatus'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setConversationStatusSelect(conversationStatus: string): Promise<void> {
    await this.conversationStatusSelect.sendKeys(conversationStatus);
  }

  async getConversationStatusSelect(): Promise<string> {
    return await this.conversationStatusSelect.element(by.css('option:checked')).getText();
  }

  async conversationStatusSelectLastOption(): Promise<void> {
    await this.conversationStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

export class ConversationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-conversation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-conversation'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
