import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='mb-12 text-3xl font-bold'>Movies</h1>

        <header className='mb-4'>
          <div className='flex justify-end gap-4'>
            <Skeleton className='h-10 w-20' />
            <Skeleton className='h-10 w-20' />
          </div>
        </header>

        <ul
          role='list'
          className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8'
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <li key={index} className='relative'>
              <Skeleton className='aspect-square w-full rounded-lg bg-gray-100' />
              <Skeleton className='mt-2 h-4 w-3/4 rounded' />
              <Skeleton className='mt-1 h-4 w-1/2 rounded' />
              <Skeleton className='mt-1 h-4 w-1/4 rounded' />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
