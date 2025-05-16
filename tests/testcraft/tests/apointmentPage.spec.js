// appointments.spec.js
import { test, expect } from '@playwright/test';
import { AppointmentsPage } from '../pages/ApointmentPage';

test.describe('Appointments Page Tests', () => {
  let appointmentsPage;

  test.beforeEach(async ({ page }) => {
    appointmentsPage = new AppointmentsPage(page);
    await appointmentsPage.navigate();
  });

  test('Verify that the user can view the title "Appointments List" on the page.', async () => {
    await appointmentsPage.verifyTitle('Appointments List');
  });

  test('Ensure that the date displayed on the button corresponds to the expected appointment date (e.g., May 15th, 2025).', async () => {
    await appointmentsPage.verifyAppointmentDate('May 15th, 2025');
    const month = await appointmentsPage.getDisplayedMonth();
    expect(month).toBe('May 2025');

    await appointmentsPage.clickPreviousMonth();
    const month1 = await appointmentsPage.getDisplayedMonth();
    expect(month1).toBe('April 2025');

    await appointmentsPage.clickNextMonth();
    const month2 = await appointmentsPage.getDisplayedMonth();
    expect(month2).toBe('May 2025');

    //select a day
    await appointmentsPage.selectDay('13');
    const selectedDay = await appointmentsPage.page.$eval(
      appointmentsPage.dayButton('13'),
      (el) => el.getAttribute('aria-selected')
    );
    expect(selectedDay).toBe('true');
  });

  //   test('Check that the search input allows users to type and suggests appointments or patients.', async () => {
  //     await appointmentsPage.typeInSearchInput('Ayesha');
  //     const value = await appointmentsPage.getSearchInputValue();
  //     expect(value).toBe('Ayesha');
  //   });

  //   test('Confirm that clicking the "Complete" button successfully marks an appointment as completed.', async () => {
  //     await appointmentsPage.clickCompleteButton();
  //     // Add assertion to verify completion status
  //   });

  //   test('Validate that the filter buttons correctly display the relevant appointments when clicked.', async () => {
  //     await appointmentsPage.clickFilterButton('Upcoming');
  //     const count = await appointmentsPage.countAppointmentCards();
  //     expect(count).toBeGreaterThan(0); // Assuming there are upcoming appointments
  //   });

  //   test('Ensure that the appointment cards display the correct patient name, status, and reason for the appointment.', async () => {
  //     const expectedDetails = [
  //       {
  //         name: 'Ayesha Malik',
  //         status: 'In Progress',
  //         reason: 'Routine checkup for hypertension',
  //       },
  //       {
  //         name: 'Faisal Ahmed',
  //         status: 'Upcoming',
  //         reason: 'Chest pain, suspected angina',
  //       },
  //     ];
  //     await appointmentsPage.verifyAppointmentCardDetails(expectedDetails);
  //   });

  //   test('Verify that no appointments are displayed when there are no scheduled appointments.', async () => {
  //     await appointmentsPage.clickFilterButton('Cancelled');
  //     const count = await appointmentsPage.countAppointmentCards();
  //     expect(count).toBe(0);
  //   });

  //   test('Check that the search input does not return results for nonexistent appointments or patients.', async () => {
  //     await appointmentsPage.typeInSearchInput('Nonexistent Patient');
  //     const count = await appointmentsPage.countAppointmentCards();
  //     expect(count).toBe(0);
  //   });

  //   test('Ensure that clicking the "Complete" button for an already completed appointment does not change its status again.', async () => {
  //     await appointmentsPage.clickCompleteButton(); // First click to complete
  //     await appointmentsPage.clickCompleteButton(); // Second click should not change status
  //     // Add assertion to verify status remains completed
  //   });

  //   test('Validate that clicking filter buttons does not display appointments outside the selected category.', async () => {
  //     await appointmentsPage.clickFilterButton('Completed');
  //     const count = await appointmentsPage.countAppointmentCards();
  //     // Assuming there are no upcoming appointments
  //     expect(count).toBe(0);
  //   });

  //   test('Confirm that the user is unable to submit an empty search query and that an appropriate error message is displayed.', async () => {
  //     await appointmentsPage.clearSearchInput();
  //     // Add assertion to verify error message
  //   });

  //   test('Test the behavior when a user enters a long string of characters into the search input and ensure that the system handles it gracefully without crashing.', async () => {
  //     await appointmentsPage.typeInSearchInput('A'.repeat(100));
  //     // Add assertion to verify system does not crash
  //   });

  //   test('Simulate a scenario where multiple appointments are scheduled at the same time and verify that the appointments are displayed correctly without overlap.', async () => {
  //     // Add logic to simulate multiple appointments and verify display
  //   });

  //   test('Check how the system behaves if the user tries to interact with the appointment cards while the page is loading.', async () => {
  //     // Add logic to simulate interaction during loading
  //   });

  //   test('Validate the user experience when switching between light and dark mode and ensure that all elements remain accessible and visually clear.', async () => {
  //     // Add logic to switch modes and verify elements
  //   });

  //   test('Test the responsiveness of the appointments list on different screen sizes to ensure it adapts correctly without losing functionality.', async () => {
  //     // Add logic to test responsiveness
  //   });
});
