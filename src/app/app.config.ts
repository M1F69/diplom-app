import { ApplicationConfig } from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";

import { routes } from './app.routes';

//@ts-ignore
import deMessages from "devextreme/localization/messages/ru.json";
import { locale, loadMessages } from "devextreme/localization";

loadMessages(deMessages);
locale(navigator.language);
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient()
  ]
};
