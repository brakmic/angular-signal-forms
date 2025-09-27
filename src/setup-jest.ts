import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { COMPILER_OPTIONS, NgModule, ErrorHandler } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';

console.log('Jest setup loaded');

// initialize the Angular testing environment for zoneless
class TestModule {}
NgModule({
  providers: [
    provideZonelessChangeDetection(),
    {
      provide: ErrorHandler,
      useValue: {
        handleError: (e: unknown) => {
          throw e;
        },
      },
    },
  ],
})(TestModule);

getTestBed().initTestEnvironment(
  [BrowserTestingModule, TestModule],
  platformBrowserTesting([
    {
      provide: COMPILER_OPTIONS,
      useValue: {},
      multi: true,
    },
  ])
);
