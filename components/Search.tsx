'use client'
import React, { useState, useCallback, ChangeEvent, useEffect } from 'react'
import dynamic from 'next/dynamic'

type Title = string
type Url = string
type SearchResult = [Title, Url][]

export default function SearchComponent({ cityCode }: { cityCode: string }) {
  const Search = dynamic({
    loader: async () => {
      const wasm = await import(`../wasm/${cityCode}/fulltext_search_core`)

      return () => {
        const [term, setTerm] = useState('')
        const [results, setResults] = useState<SearchResult>([])

        const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
          setTerm(e.target.value)
        }, [])

        useEffect(() => {
          const pending = wasm.search(term, 5)
          setResults(pending)
        }, [term])

        return (
          <div>
            <input
              value={term}
              onChange={onChange}
              placeholder='🔭 search...'
            />
            <div className='flex flex-col'>
              {results.map(([title, url]) => (
                <div>
                  <a key={url} href={url}>
                    {title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )
      }
    },
  })

  return <Search />
}
