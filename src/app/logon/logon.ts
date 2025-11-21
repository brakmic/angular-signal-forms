import { Component, signal } from '@angular/core';
import { Field, form, required, schema, submit } from '@angular/forms/signals';

type AccountSchema = {
  username: string;
  password: string;
}

const accountSchema = schema<AccountSchema>((a) => {
  required(a.username, { message: 'Username is required' });
  required(a.password, { message: 'Password is required' });
});

@Component({
  selector: 'app-logon',
  standalone: true,
  imports: [Field],
  templateUrl: './logon.html',
  styleUrl: './logon.css'
})
export class Logon {

  public readonly accountData = signal<AccountSchema>({
    username: '',
    password: ''
  });

  public readonly logonForm = form(this.accountData, accountSchema);

  public readonly loginSuccess = signal(false);

  onSubmit(event?: Event) {
    submit(this.logonForm, async (form) => {
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(form().value())
      });
    });
    event?.preventDefault();
    // any login is considered successful
    this.loginSuccess.set(true);
  }

  closeModal() {
    this.loginSuccess.set(false);
    // Reset both the signal data and form state
    this.accountData.set({
      username: '',
      password: ''
    });
    // Reset form state to clear validation errors
    this.logonForm().reset();
  }
}
