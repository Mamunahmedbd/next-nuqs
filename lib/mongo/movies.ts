import 'server-only'

import { Collection, Db, Document, MongoClient, ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongo/client'
import { PipelineStage } from '@/lib/types'

let client: MongoClient
let db: Db
let movies: Collection<Document>

async function init() {
  if (db) return
  try {
    client = await clientPromise
    db = client.db()
    movies = db.collection('movies')
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to connect to Database'
    )
  }
}

//////////////
/// Movies ///
//////////////

export async function getMovie(
  id: string
): Promise<{ movie?: Document; error?: Error | unknown }> {
  try {
    if (!movies) await init()

    const result = await movies.findOne({ _id: new ObjectId(id) })

    return { movie: JSON.parse(JSON.stringify(result)) }
  } catch (error) {
    return { error }
  }
}

export async function getMovies({
  query,
  page = 1,
  limit = 10
}: {
  query?: string
  page?: number
  limit?: number
}): Promise<{ movies?: Document[]; error?: Error | unknown }> {
  try {
    if (!movies) await init()

    const skip = (page - 1) * limit

    const pipeline: PipelineStage[] = [{ $skip: skip }, { $limit: limit }]

    if (query) {
      pipeline.unshift({
        $search: {
          index: 'search',
          text: {
            query,
            fuzzy: {
              maxEdits: 1,
              prefixLength: 3,
              maxExpansions: 50
            },
            path: {
              wildcard: '*'
            }
          }
        }
      })
    }

    const result = await movies.aggregate(pipeline).toArray()

    await new Promise(resolve => setTimeout(resolve, 750))

    return { movies: JSON.parse(JSON.stringify(result)) }
  } catch (error) {
    return { error }
  }
}
