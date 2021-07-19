import { IAsyncData } from './models';

export const APP_ROUTES = {
    USERS: {
        PATH: '/users',
        POSTS: {
            PATH: '/users/:id/posts'
        }
    },
    POSTS: {
        PATH: '/posts'
    },
    DASHBOARD: {
        PATH: '/'
    }
}

export const INITIAL_ASYNC_DATA: IAsyncData<any> = {
    data: null,
    error: undefined,
    loading: undefined
}
