// appointment.spec.js
import { test, expect } from '@playwright/test';
import { AppointmentPage } from '../pages/NewAppointmentPage';

test.describe('Appointment Scheduling', () => {
  let appointmentPage;

  test.beforeEach(async ({ page }) => {
    appointmentPage = new AppointmentPage(page);
    await page.goto('https://mh-doctor-portal.bitsol.dev/appointments/new');
  });

  test('should schedule an appointment successfully', async () => {
    await appointmentPage.selectPatient('Ayesha Malik');
    await appointmentPage.selectDate('2023-10-01'); // Example date
    await appointmentPage.selectTime('09:00 AM');
    await appointmentPage.selectDuration('30 minutes');
    await appointmentPage.selectAppointmentType('In-clinic');
    await appointmentPage.fillReasonForVisit('Routine check-up');
    await appointmentPage.fillAdditionalNotes('No additional notes');
    await appointmentPage.scheduleAppointment();

    // Add assertion to verify appointment scheduled
    await expect(page).toHaveURL(/.*appointments\/confirmation/);
  });

  test('should show error when no patient is selected', async () => {
    await appointmentPage.selectDate('2023-10-01');
    await appointmentPage.selectTime('09:00 AM');
    await appointmentPage.selectDuration('30 minutes');
    await appointmentPage.selectAppointmentType('In-clinic');
    await appointmentPage.fillReasonForVisit('Routine check-up');
    await appointmentPage.fillAdditionalNotes('No additional notes');
    await appointmentPage.scheduleAppointment();

    // Add assertion to verify error message
    await expect(page.locator('text=Please select a patient')).toBeVisible();
  });

  test('should cancel the appointment scheduling', async () => {
    await appointmentPage.cancelAppointment();

    // Add assertion to verify that the user is navigated away
    await expect(page).toHaveURL(/.*appointments/);
  });

  test('should navigate back to previous page', async () => {
    await appointmentPage.goBack();

    // Add assertion to verify that the user is navigated back
    await expect(page).toHaveURL(/.*appointments/);
  });
});
