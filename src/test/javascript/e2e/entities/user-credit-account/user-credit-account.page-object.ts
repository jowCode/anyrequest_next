import { element, by, ElementFinder } from 'protractor';

export class UserCreditAccountComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-credit-account div table .btn-danger'));
  title = element.all(by.css('jhi-user-credit-account div h2#page-heading span')).first();
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

export class UserCreditAccountUpdatePage {
  pageTitle = element(by.id('jhi-user-credit-account-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  receivedCreditsInput = element(by.id('field_receivedCredits'));
  usedCreditsInput = element(by.id('field_usedCredits'));
  totalCreditsInput = element(by.id('field_totalCredits'));

  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setReceivedCreditsInput(receivedCredits: string): Promise<void> {
    await this.receivedCreditsInput.sendKeys(receivedCredits);
  }

  async getReceivedCreditsInput(): Promise<string> {
    return await this.receivedCreditsInput.getAttribute('value');
  }

  async setUsedCreditsInput(usedCredits: string): Promise<void> {
    await this.usedCreditsInput.sendKeys(usedCredits);
  }

  async getUsedCreditsInput(): Promise<string> {
    return await this.usedCreditsInput.getAttribute('value');
  }

  async setTotalCreditsInput(totalCredits: string): Promise<void> {
    await this.totalCreditsInput.sendKeys(totalCredits);
  }

  async getTotalCreditsInput(): Promise<string> {
    return await this.totalCreditsInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class UserCreditAccountDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userCreditAccount-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userCreditAccount'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
