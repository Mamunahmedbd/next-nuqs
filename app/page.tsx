import { z } from 'zod'
import { getMovies } from '@/lib/mongo/movies'

import Movies from '@/components/movies'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const querySchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10)
})

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const query = querySchema.parse(searchParams)
  const { movies } = await getMovies(query)

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='mb-12 text-3xl font-bold'>Movies</h1>

        <Movies movies={movies} />
      </div>
    </section>
  )
}
