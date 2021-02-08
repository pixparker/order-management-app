import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

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
        this.socket = io("http://localhost:8001");
        this.initialized = true;
    }
}