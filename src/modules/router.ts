//import {Chat} from '../../components/chat/chat'
import Page from '../components/pages/page'
import Profile from '../components/pages/profile'
import Chat from '../components/pages/chat'
import SignUp from '../components/pages/signup'
import { blockData } from '../models/page_data';
import {Block, BlockProps} from './block'
import Route from './route'
import {BlockEntry, stdEvents} from './types'
import { EventBus } from './event_bus';

export enum stdRoutes {
    Index = '/',
    Login = '/login',
    Profile = '/settings',
    SignUp = '/sign-up',
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
            //console.log('onpopstate');
            if (event /*&& event.state*/) {
                this._onRoute(window.location.pathname);
            }        
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
        window.eventBus.emit( stdEvents.popstate);
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
window.eventBus = new EventBus();
//window.onload = () => { console.log('onload');window.eventBus.emit( stdEvents.pageLoad);}

router
  .use( stdRoutes.Index, Page, blockData.index)
  .use( stdRoutes.Login, Page, blockData.login)
  .use( stdRoutes.Profile, Profile, blockData.profile)
  .use( stdRoutes.SignUp, SignUp, blockData.signup)
  .use( stdRoutes.Chat, Chat, blockData.chats)
  .use( stdRoutes.Error404, Page, blockData.page_404)
  .use( stdRoutes.Error500, Page, blockData.page_500)
  .start()
