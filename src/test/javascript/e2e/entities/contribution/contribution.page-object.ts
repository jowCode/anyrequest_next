import { element, by, ElementFinder } from 'protractor';

export class ContributionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-contribution div table .btn-danger'));
  title = element.all(by.css('jhi-contribution div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

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

export class ContributionUpdatePage {
  pageTitle = element(by.id('jhi-contribution-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  contributingUserInput = element(by.id('field_contributingUser'));
  contributionMessageInput = element(by.id('field_contributionMessage'));
  contributionStatusSelect = element(by.id('field_contributionStatus'));

  conversationSelect = element(by.id('field_conversation'));
  userRequestSelect = element(by.id('field_userRequest'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setContributingUserInput(contributingUser: string): Promise<void> {
    await this.contributingUserInput.sendKeys(contributingUser);
  }

  async getContributingUserInput(): Promise<string> {
    return await this.contributingUserInput.getAttribute('value');
  }

  async setContributionMessageInput(contributionMessage: string): Promise<void> {
    await this.contributionMessageInput.sendKeys(contributionMessage);
  }

  async getContributionMessageInput(): Promise<string> {
    return await this.contributionMessageInput.getAttribute('value');
  }

  async setContributionStatusSelect(contributionStatus: string): Promise<void> {
    await this.contributionStatusSelect.sendKeys(contributionStatus);
  }

  async getContributionStatusSelect(): Promise<string> {
    return await this.contributionStatusSelect.element(by.css('option:checked')).getText();
  }

  async contributionStatusSelectLastOption(): Promise<void> {
    await this.contributionStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

  async userRequestSelectLastOption(): Promise<void> {
    await this.userRequestSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userRequestSelectOption(option: string): Promise<void> {
    await this.userRequestSelect.sendKeys(option);
  }

  getUserRequestSelect(): ElementFinder {
    return this.userRequestSelect;
  }

  async getUserRequestSelectedOption(): Promise<string> {
    return await this.userRequestSelect.element(by.css('option:checked')).getText();
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

export class ContributionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-contribution-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-contribution'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
