import { element, by, ElementFinder } from 'protractor';

export class UserRequestComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-request div table .btn-danger'));
  title = element.all(by.css('jhi-user-request div h2#page-heading span')).first();

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

export class UserRequestUpdatePage {
  pageTitle = element(by.id('jhi-user-request-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  requestingUserInput = element(by.id('field_requestingUser'));
  titleInput = element(by.id('field_title'));
  descriptionInput = element(by.id('field_description'));
  urgencySelect = element(by.id('field_urgency'));
  validToInput = element(by.id('field_validTo'));
  contributorCountInput = element(by.id('field_contributorCount'));
  hasContributedInput = element(by.id('field_hasContributed'));
  isBlockedInput = element(by.id('field_isBlocked'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setRequestingUserInput(requestingUser) {
    await this.requestingUserInput.sendKeys(requestingUser);
  }

  async getRequestingUserInput() {
    return await this.requestingUserInput.getAttribute('value');
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return await this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setUrgencySelect(urgency) {
    await this.urgencySelect.sendKeys(urgency);
  }

  async getUrgencySelect() {
    return await this.urgencySelect.element(by.css('option:checked')).getText();
  }

  async urgencySelectLastOption() {
    await this.urgencySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setValidToInput(validTo) {
    await this.validToInput.sendKeys(validTo);
  }

  async getValidToInput() {
    return await this.validToInput.getAttribute('value');
  }

  async setContributorCountInput(contributorCount) {
    await this.contributorCountInput.sendKeys(contributorCount);
  }

  async getContributorCountInput() {
    return await this.contributorCountInput.getAttribute('value');
  }

  getHasContributedInput() {
    return this.hasContributedInput;
  }
  getIsBlockedInput() {
    return this.isBlockedInput;
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

export class UserRequestDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userRequest-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userRequest'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
