export interface IEmsUser {
    userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    isLocked: boolean;
    isUserAdmin: boolean;
    gender: number;
    phone: string;
    eMail: string;
    creator: string;
    created: Date;
    modifier: string;
    modified: Date;
}

export class EmsUser {
    public userId: number;
    public username: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public isLocked: boolean;
    public isUserAdmin: boolean;
    public gender: number;
    public phone: string;
    public eMail: string;
    public creator: string;
    public created: Date;
    public modifier: string;
    public modified: Date;

    constructor(data?: EmsUser) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}


