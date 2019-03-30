interface IUserRight {
    rightName: string;
    ins: number;
    upd: number;
    del: number;
}

export class UserRight implements IUserRight {
    rightName: string;
    ins: number;
    upd: number;
    del: number;
    constructor(data?: UserRight) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
