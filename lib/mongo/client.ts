import 'server-only'

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string
const options = {}

declare const globalThis: {
  _mongoClientPromise: Promise<MongoClient>
} & typeof global

class Singleton {
  private static _instance: Singleton
  private client: MongoClient
  private clientPromise: Promise<MongoClient>
  private constructor() {
    this.client = new MongoClient(uri, options)
    this.clientPromise = this.client.connect()
    if (process.env.NODE_ENV === 'development') {
      globalThis._mongoClientPromise = this.clientPromise
    }
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton()
    }
    return this._instance.clientPromise
  }
}
const clientPromise = Singleton.instance

export default clientPromise
