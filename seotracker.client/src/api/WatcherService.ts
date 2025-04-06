import { WatcherClient } from "./client";

export class WatcherService extends WatcherClient {
    constructor() {
      super("https://localhost:7255")
    }
  }