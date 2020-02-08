import { element, by, ElementFinder } from 'protractor';

export class UserRequestComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-request div table .btn-danger'));
  title = element.all(by.css('jhi-user-request div h2#page-heading span')).first();
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

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setRequestingUserInput(requestingUser: string): Promise<void> {
    await this.requestingUserInput.sendKeys(requestingUser);
  }

  async getRequestingUserInput(): Promise<string> {
    return await this.requestingUserInput.getAttribute('value');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setUrgencySelect(urgency: string): Promise<void> {
    await this.urgencySelect.sendKeys(urgency);
  }

  async getUrgencySelect(): Promise<string> {
    return await this.urgencySelect.element(by.css('option:checked')).getText();
  }

  async urgencySelectLastOption(): Promise<void> {
    await this.urgencySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setValidToInput(validTo: string): Promise<void> {
    await this.validToInput.sendKeys(validTo);
  }

  async getValidToInput(): Promise<string> {
    return await this.validToInput.getAttribute('value');
  }

  async setContributorCountInput(contributorCount: string): Promise<void> {
    await this.contributorCountInput.sendKeys(contributorCount);
  }

  async getContributorCountInput(): Promise<string> {
    return await this.contributorCountInput.getAttribute('value');
  }

  getHasContributedInput(): ElementFinder {
    return this.hasContributedInput;
  }

  getIsBlockedInput(): ElementFinder {
    return this.isBlockedInput;
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

export class UserRequestDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userRequest-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userRequest'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
