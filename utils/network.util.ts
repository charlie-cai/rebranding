export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export enum ResponseType {
    Arraybuffer = 'arraybuffer',
    Document = 'document',
    Json = 'json',
    Text = 'text',
    Stream = 'stream'
}

export interface NetworkRequest {
    baseURL: string,
    url: string,
    method: HttpMethod,
    headers?: any,
    responseType?: ResponseType
}

import axios from 'axios';

export class NetworkUtil {
    static fetch(request: NetworkRequest) {
        return axios(request);
    }
}