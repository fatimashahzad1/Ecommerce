// appointmentPage.js
export class AppointmentPage {
  constructor(page) {
    this.page = page;
    this.selectPatientButton = 'button[aria-controls=radix-:r2g:]';
    this.selectDateButton = 'button[id=:r2h:-form-item]';
    this.selectTimeButton = 'button[id=:r2j:-form-item]';
    this.selectDurationButton = 'button[id=:r2l:-form-item]';
    this.selectAppointmentTypeButton = 'button[id=:r2n:-form-item]';
    this.reasonForVisitTextarea = 'textarea[name=reason]';
    this.additionalNotesTextarea = 'textarea[name=notes]';
    this.scheduleButton = 'button:has-text("Schedule Appointment")';
    this.cancelButton = 'button:has-text("Cancel")';
    this.backButton = 'button:has-text("Back")';
  }

  async selectPatient(patientName) {
    await this.page.locator(this.selectPatientButton).click();
    await this.page
      .locator('div[role="option"]')
      .filter({ hasText: /^Ayesha Malik$/ })
      .click();
  }

  async selectDate(date) {
    await this.page.click(this.selectDateButton);
    // Add date selection logic here if applicable
  }

  async selectTime(time) {
    await this.page.click(this.selectTimeButton);
    await this.page.selectOption('select[aria-hidden=true]', time);
  }

  async selectDuration(duration) {
    await this.page.click(this.selectDurationButton);
    await this.page.selectOption('select[aria-hidden=true]', duration);
  }

  async selectAppointmentType(type) {
    await this.page.click(this.selectAppointmentTypeButton);
    await this.page.selectOption('select[aria-hidden=true]', type);
  }

  async fillReasonForVisit(reason) {
    await this.page.fill(this.reasonForVisitTextarea, reason);
  }

  async fillAdditionalNotes(notes) {
    await this.page.fill(this.additionalNotesTextarea, notes);
  }

  async scheduleAppointment() {
    await this.page.click(this.scheduleButton);
  }

  async cancelAppointment() {
    await this.page.click(this.cancelButton);
  }

  async goBack() {
    await this.page.click(this.backButton);
  }
}
