export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export type HeaderDictionary = { [key: string]: string };

export interface NetworkRequest {
    baseURL: string;
    url: string;
    method: HttpMethod;
    headers?: HeaderDictionary;
    responseType?: ResponseType
}

import axios, { AxiosResponse, ResponseType } from 'axios';
import { CliUtil } from './cli.util';

export class NetworkUtil {
    static async fetch(
        request: NetworkRequest): Promise<any> {

        return new Promise<any>(function (resolve, reject) {
            axios(request).then((response: AxiosResponse) => {
                const buffers: Buffer[] = [];
                response.data.on('data', (received: Buffer) => {
                    buffers.push(received);
                });

                response.data.on('end', () => {
                    try {
                        const json = JSON.parse(Buffer.concat(buffers).toString());
                        resolve(json);
                    } catch (err) {
                        reject(err);
                    }
                });
            }).catch(err => {
                reject(err);
            })
        });
    }
}