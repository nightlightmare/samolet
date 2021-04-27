import { observable, makeObservable, action, runInAction } from "mobx";
import { ILibraryInfo } from "types";

export class RegionsStore {
    constructor() {
        makeObservable(this);
    }

    @observable data: ILibraryInfo[] = [];
    @observable loading: boolean = false;

    @action getData = async () => {
        this.loading = true;
        try {
            await fetch(
                "/opendata/7705851331-stat_library/data-2016-11-10T00-00-00-structure-2016-09-12T00-00-00.json",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    runInAction(() => {
                        this.data = data;

                        this.loading = false;
                    });
                });
        } catch (error) {
            this.loading = false;
            console.log(error);
        }
    };
}

export default RegionsStore;
