import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url:string) =>
  axios.get(url)
    .then((res) => res.data.data)

const CityPage = ({ data }: any) => {
  const router = useRouter() 
  const { id } = router.query
  const { data: city, error } = useSWR(id ? `/api/cities/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!city) return <p>Loading...</p>
  
  const handleDelete = async () => {
    const cityID = router.query.id

    try {
      await axios.delete(`/api/cities/${cityID}`);
      router.push('/')
    } catch (error) {
      console.error('Failed to delete the city.')
    }
  }

  return (
    <div style={{minHeight:'80vh', padding:'10px 20px'}}>
      <p className="pet-name">{city.name} - {city.uf}</p>
      <Link href="/cities/[id]/edit" as={`/cities/${city._id}/edit`}>Editar</Link>
      {' '}-{' '}
      <Link href="/cities/[id]/delete" as={`/cities/${city._id}/delete`}>Deletar</Link>
      {' '}-{' '}
      <Link href="/cities" as={`/cities`}>Voltar</Link>
    </div>
  )
}

export default CityPage
