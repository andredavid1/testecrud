/* eslint-disable @next/next/link-passhref */
import axios from "axios"
import Link from 'next/link';
import useSWR from 'swr'

type ICities = {
  _id: string;
  name: string;
  uf: string;
  createdAt: Date;
  updatedAt: Date;
}

const fetcher = (url:string) =>
  axios.get(url)
    .then((res) => res.data.data)

const Cities = () => {
  const { data: cities, error } = useSWR(`/api/cities`, fetcher)

  if (error) return <p>Failed to load</p>
  if (!cities) return <p>Loading...</p>

  return (
    <div style={{minHeight:'80vh', padding:'10px 20px'}}>
      <h1>Página de Cidades</h1>

      <ul style={{listStyle:'none', marginTop:'30px'}}>
        {cities.map((city: ICities) => (
          <li key={city._id} style={{cursor:'pointer'}}>
              {city.name}
              {' '}-{' '}
              {city.uf}
              {' '}-{' '}
              <Link href="/cities/[id]" as={`/cities/${city._id}`}>Detalhes</Link>
              {' '}-{' '}
              <Link href="/cities/[id]/edit" as={`/cities/${city._id}/edit`}>Editar</Link>
              {' '}-{' '}
              <Link href="/cities/[id]/delete" as={`/cities/${city._id}/delete`}>Deletar</Link>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Cities;
