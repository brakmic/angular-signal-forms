import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logon } from './logon';

describe('Logon', () => {
  let component: Logon;
  let fixture: ComponentFixture<Logon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Logon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sollte erstellt werden', () => {
    expect(component).toBeTruthy();
  });

  it('sollte das Formular erfolgreich absenden', () => {
    component.onSubmit();

    expect(component.loginSuccess()).toBe(true);
  });

  it('should start with empty form', () => {
    expect(component.accountData().username).toBe('');
    expect(component.accountData().password).toBe('');
  });

  it('should show errors when required fields are empty', () => {
    // Form should not be valid at start
    expect(component.logonForm().valid()).toBe(false);

    // Check errors for both fields
    const usernameErrors = component.logonForm.username().errors();
    const passwordErrors = component.logonForm.password().errors();

    expect(usernameErrors.length).toBeGreaterThan(0);
    expect(passwordErrors.length).toBeGreaterThan(0);

    // Check for required errors
    expect(usernameErrors.some(error => error.kind === 'required')).toBe(true);
    expect(passwordErrors.some(error => error.kind === 'required')).toBe(true);
  });

  it('should be valid when both fields have content', () => {
    // Fill in the fields
    component.accountData.set({
      username: 'testuser',
      password: 'testpass'
    });

    expect(component.logonForm().valid()).toBe(true);
  });

  it('should show success modal after submit', () => {
    // Modal hidden at first
    expect(component.loginSuccess()).toBe(false);

    // Submit the form
    component.onSubmit();

    // Now modal should show
    expect(component.loginSuccess()).toBe(true);
  });

  it('should clear form and hide modal on close', () => {
    // Setup: fill form and show modal
    component.accountData.set({
      username: 'testuser',
      password: 'testpass'
    });
    component.loginSuccess.set(true);

    // Check current state
    expect(component.loginSuccess()).toBe(true);
    expect(component.accountData().username).toBe('testuser');
    expect(component.accountData().password).toBe('testpass');

    // Close the modal
    component.closeModal();

    // Form should be empty and modal hidden
    expect(component.loginSuccess()).toBe(false);
    expect(component.accountData().username).toBe('');
    expect(component.accountData().password).toBe('');
  });

  it('should work with event parameter', () => {
    const mockEvent = { preventDefault: jest.fn() } as unknown as Event;

    component.onSubmit(mockEvent);

    expect(component.loginSuccess()).toBe(true);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should work without event parameter', () => {
    // Should not crash when no event given
    expect(() => component.onSubmit()).not.toThrow();
    expect(component.loginSuccess()).toBe(true);
  });
});
