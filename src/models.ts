interface IUserCompany {
    name: string;
    catchPhrase: string;
}

export interface IUser {
    id: number;
    email: string;
    name: string;
    username: string;
    phone: string;
    company: IUserCompany;
}

export interface IAsyncData<T> {
    error?: string;
    data?: T;
    loading?: boolean;
}

export interface IPost {
    id: number;
    title: string;
    body: string;
}
