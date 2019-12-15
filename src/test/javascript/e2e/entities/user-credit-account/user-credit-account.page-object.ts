import { element, by, ElementFinder } from 'protractor';

export class UserCreditAccountComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-credit-account div table .btn-danger'));
  title = element.all(by.css('jhi-user-credit-account div h2#page-heading span')).first();

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

export class UserCreditAccountUpdatePage {
  pageTitle = element(by.id('jhi-user-credit-account-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  receivedCreditsInput = element(by.id('field_receivedCredits'));
  usedCreditsInput = element(by.id('field_usedCredits'));
  totalCreditsInput = element(by.id('field_totalCredits'));
  userSelect = element(by.id('field_user'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setReceivedCreditsInput(receivedCredits) {
    await this.receivedCreditsInput.sendKeys(receivedCredits);
  }

  async getReceivedCreditsInput() {
    return await this.receivedCreditsInput.getAttribute('value');
  }

  async setUsedCreditsInput(usedCredits) {
    await this.usedCreditsInput.sendKeys(usedCredits);
  }

  async getUsedCreditsInput() {
    return await this.usedCreditsInput.getAttribute('value');
  }

  async setTotalCreditsInput(totalCredits) {
    await this.totalCreditsInput.sendKeys(totalCredits);
  }

  async getTotalCreditsInput() {
    return await this.totalCreditsInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class UserCreditAccountDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userCreditAccount-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userCreditAccount'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
