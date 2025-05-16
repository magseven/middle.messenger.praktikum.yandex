//import {Chat} from '../../components/chat/chat'
import Page from '../../components/pages/page'
import { blockData } from '../../models/page_data';
import {Block, BlockProps} from '../block'
import Route from './route'
import {BlockEntry} from '../types'
//import pageData from '../utils/form_funcs'

export enum stdRoutes {
    Index = '/',
    Login = '/login',
    Profile = '/profile',
    SignUp = '/signup',
    Chat = '/messenger',
    Error404 = '/404',
    Error500 = '/500',
    // EditProfile = '/settings/edit',
    // PasswordProfile = '/settings/password'
}

export class Router {
    private static __instance: Router;
    routes: Route[] = [];
    private _currentRoute: Route | null = null;
    private history: History = window.history;
    private _rootQuery: string = '';

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use(pathname: string, block: new (props: BlockProps) => Block, blockprops: BlockEntry ) {
        const route = new Route(pathname, block,  blockprops, {rootQuery: this._rootQuery});

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            console.log('onpopstate');
            if (event /*&& event.state*/) {
                this._onRoute(window.location.pathname);
            }        
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        console.log('pathname', pathname);
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        console.log(route);
        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}
  

export const router = new Router(".app");

router
  .use( stdRoutes.Index, Page, blockData.index)
  .use( stdRoutes.Login, Page, blockData.login)
  .use( stdRoutes.Profile, Page, blockData.profile)
  .use( stdRoutes.SignUp, Page, blockData.signup)
  .start()

// Через секунду контент изменится сам, достаточно дёрнуть переход
// setTimeout(() => {
//   router.go("/login");
// }, 1000);

// А можно и назад
// setTimeout(() => {
//   router.back();
// }, 3000);

// // И снова вперёд
// setTimeout(() => {
//   router.forward();
// }, 5000);

  