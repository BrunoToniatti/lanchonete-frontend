import { Routes } from '@angular/router';
import { Intro } from './pages/intro/intro';
import { InitialPage } from './pages/initial-page/initial-page';
import { Menu } from './pages/menu/menu';
import { Retirada } from './pages/retirada/retirada';
import { Finish } from './pages/finish/finish';
import { Options } from './pages/options/options';
import { Histoy } from './pages/histoy/histoy';

export const routes: Routes = [
  {
    path: '',
    component: Intro
  },
  {
    path: 'initial',
    component: InitialPage
  },
  {
    path: 'menu',
    component: Menu
  },
  {
    path: 'retirada',
    component: Retirada
  },
  {
    path: 'finalizar',
    component: Finish
  },
  {
    path: 'opcoes',
    component: Options
  },
  {
    path: 'historico',
    component: Histoy
  }
];
