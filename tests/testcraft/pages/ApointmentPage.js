// appointmentsPage.js
import { expect } from '@playwright/test';

export class AppointmentsPage {
  constructor(page) {
    this.page = page;
    this.titleSelector = 'h3.tracking-tight';
    this.dateButtonSelector = 'button[aria-haspopup="dialog"]';
    this.searchInputSelector = 'input[type="search"]';
    this.completeButtonSelector = 'button:has-text("Complete")';
    this.filterButtonSelector = 'button[role="tab"]';
    this.appointmentCardsSelector = '.glass.border.rounded-xl';
    this.previousMonthButton = 'button[name="previous-month"]';
    this.nextMonthButton = 'button[name="next-month"]';
    this.dayButton = (day) => `button[name="day"]:has-text("${day}")`;
    this.monthDisplay = '#react-day-picker-1';
  }

  async navigate() {
    await this.page.goto('https://mh-doctor-portal.bitsol.dev/appointments');
  }

  async verifyTitle(expectedTitle) {
    const title = await this.page.locator(this.titleSelector).innerText();
    expect(title).toBe(expectedTitle);
  }

  async verifyAppointmentDate(expectedDate) {
    const date = await this.page.locator(this.dateButtonSelector).innerText();
    console.log(date);
    expect(date).toContain(expectedDate);
    await this.page.click(this.dateButtonSelector);
  }

  async typeInSearchInput(query) {
    await this.page.fill(this.searchInputSelector, query);
  }

  async clickCompleteButton() {
    await this.page.click(this.completeButtonSelector);
  }

  async clickFilterButton(filter) {
    await this.page.click(`text=${filter}`);
  }

  async verifyAppointmentCardDetails(expectedDetails) {
    const cards = await this.page.locator(this.appointmentCardsSelector);
    for (const detail of expectedDetails) {
      const card = cards.locator(`text=${detail.name}`);
      await expect(card).toBeVisible();
      await expect(card.locator('.font-medium')).toContainText(detail.reason);
      await expect(card.locator('.flex.items-center')).toContainText(
        detail.status
      );
    }
  }

  async countAppointmentCards() {
    return await this.page.locator(this.appointmentCardsSelector).count();
  }

  async clearSearchInput() {
    await this.page.fill(this.searchInputSelector, '');
  }

  async getSearchInputValue() {
    return await this.page.inputValue(this.searchInputSelector);
  }

  async clickPreviousMonth() {
    await this.page.click(this.previousMonthButton);
  }

  async clickNextMonth() {
    await this.page.click(this.nextMonthButton);
  }

  async selectDay(day) {
    await this.page.click(this.dayButton(day));
  }

  async getDisplayedMonth() {
    return await this.page.textContent(this.monthDisplay);
  }
}
