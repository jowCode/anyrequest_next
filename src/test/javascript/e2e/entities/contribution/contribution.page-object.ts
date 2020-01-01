import { element, by, ElementFinder } from 'protractor';

export class ContributionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-contribution div table .btn-danger'));
  title = element.all(by.css('jhi-contribution div h2#page-heading span')).first();

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

export class ContributionUpdatePage {
  pageTitle = element(by.id('jhi-contribution-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  contributingUserInput = element(by.id('field_contributingUser'));
  contributionMessageInput = element(by.id('field_contributionMessage'));
  contributionStatusSelect = element(by.id('field_contributionStatus'));
  conversationSelect = element(by.id('field_conversation'));
  userRequestSelect = element(by.id('field_userRequest'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setContributingUserInput(contributingUser) {
    await this.contributingUserInput.sendKeys(contributingUser);
  }

  async getContributingUserInput() {
    return await this.contributingUserInput.getAttribute('value');
  }

  async setContributionMessageInput(contributionMessage) {
    await this.contributionMessageInput.sendKeys(contributionMessage);
  }

  async getContributionMessageInput() {
    return await this.contributionMessageInput.getAttribute('value');
  }

  async setContributionStatusSelect(contributionStatus) {
    await this.contributionStatusSelect.sendKeys(contributionStatus);
  }

  async getContributionStatusSelect() {
    return await this.contributionStatusSelect.element(by.css('option:checked')).getText();
  }

  async contributionStatusSelectLastOption() {
    await this.contributionStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

  async userRequestSelectLastOption() {
    await this.userRequestSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userRequestSelectOption(option) {
    await this.userRequestSelect.sendKeys(option);
  }

  getUserRequestSelect(): ElementFinder {
    return this.userRequestSelect;
  }

  async getUserRequestSelectedOption() {
    return await this.userRequestSelect.element(by.css('option:checked')).getText();
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

export class ContributionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-contribution-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-contribution'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
