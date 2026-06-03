import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Catalog } from './pages/catalog/catalog';
import { Login } from './pages/login/login';
import { About } from './pages/about/about';
import { Cart } from './pages/cart/cart';
import { DropDetail } from './pages/drop-detail/drop-detail';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'drops', component: Catalog },
    { path: 'drop/:id', component: DropDetail },
    { path: 'login', component: Login },
    { path: 'about', component: About },
    { path: 'cart', component: Cart },
    { path: 'profile', component: Profile },
    { path: '**', redirectTo: '' }
];