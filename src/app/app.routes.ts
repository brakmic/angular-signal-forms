import { Routes } from '@angular/router';
import { Logon } from './logon/logon';

export const routes: Routes = [
  { path: '', component: Logon },
  { path: 'logon', component: Logon }
];
