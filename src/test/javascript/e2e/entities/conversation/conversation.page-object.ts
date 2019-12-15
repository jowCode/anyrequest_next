import { element, by, ElementFinder } from 'protractor';

export class ConversationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-conversation div table .btn-danger'));
  title = element.all(by.css('jhi-conversation div h2#page-heading span')).first();

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

export class ConversationUpdatePage {
  pageTitle = element(by.id('jhi-conversation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  conversationStatusSelect = element(by.id('field_conversationStatus'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setConversationStatusSelect(conversationStatus) {
    await this.conversationStatusSelect.sendKeys(conversationStatus);
  }

  async getConversationStatusSelect() {
    return await this.conversationStatusSelect.element(by.css('option:checked')).getText();
  }

  async conversationStatusSelectLastOption() {
    await this.conversationStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

export class ConversationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-conversation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-conversation'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
