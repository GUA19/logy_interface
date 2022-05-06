import axios from "axios";
// const url = 'http://localhost:5004/'
const url = 'https://logy.hashwave.io/api/';

class GetAPI {
    static async getAllCollectionNames(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            axios.get(url + 'list')
            .then((res) => {
                let data = res.data;
                resolve(
                    data
                );
            })
            .catch((err) => {
                reject(err);
            })
        });
    }

    static async getCollection(name: string, level: string, limit: number, start: number, end: number) :Promise<Array<any>> {
        return new Promise(
            (resolve, reject) => {
                axios.get(url + 'collections', {
                    params: {
                        name: name,
                        level: level,
                        limit: limit.toString(),
                        start: start.toString(),
                        end: end.toString(),
                    }
                })
                .then((res) => {
                    let data = res.data;
                    resolve(
                        data
                    );
                })
                .catch((err) => {
                    reject(err);
                })
            }
        );
    }

    static async getLogs(name: string, query: string, sort: string, limit: number) :Promise<Array<any>> {
        return new Promise(
            (resolve, reject) => {
                axios.get(url + 'logs', {
                    params: {
                        name: name,
                        query: query,
                        sort: sort,
                        limit: limit.toString(),
                    }
                })
                    .then((res) => {
                        let data = res.data;
                        resolve(
                            data
                        );
                    })
                    .catch((err) => {
                        reject(err);
                    })
            }
        );
    }

    // static async postTemplate(dic: any) {
    //     axios.post(url + 'template/new', {
    //         data: dic,
    //     })
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }
}

export default GetAPI;