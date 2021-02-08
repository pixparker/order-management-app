import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import {environment} from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    private socket: any;
    private initialized: boolean;

    constructor(
    ) {
        this.setupSocketConnection();
     }

    registerListener(channelName: string, fn: any) {
        this.socket.on(channelName, fn);
    }

    setupSocketConnection() {
        if (this.initialized) return;
        
        this.socket = io(environment.socket);
        this.initialized = true;
    }
}