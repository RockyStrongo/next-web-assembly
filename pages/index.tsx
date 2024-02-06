import Search from '../components/Search'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()

  const cityCode = searchParams.get('cityCode') ?? '13001'

  return (
    <>
      <p>Citycode: {cityCode}</p>
      <Search cityCode={cityCode} />
    </>
  )
}
