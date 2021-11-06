/* eslint-disable @next/next/link-passhref */
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link';

const fetcher = (url:string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const DeleteCity = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: city, error } = useSWR(id ? `/api/cities/${id}` : null, fetcher)

  const [name, setName] = useState<string>("");
  const [uf, setUf] = useState<string>("");

  useEffect(() => {
    if(city) {
      setName(city.name)
      setUf(city.uf)
    }
  }, [city]);

  if (error) return <p>Failed to load</p>
  if (!city) return <p>Loading...</p>

  const handleDelete = async () => {
    const cityID = router.query.id

    try {
      await axios.delete(`/api/cities/${cityID}`)
      router.push('/cities')
    } catch (error) {
      console.log('Failed to delete the city.')
    }
  }

  return (
    <div style={{minHeight:'80vh', padding:'10px 20px'}}>
      <span>Deseja realmente excluir a cidade {name} - {uf}?</span>
      <button type="button" onClick={handleDelete}>Confirmar</button>
      <Link href="/cities"><button type="button">Cancelar</button></Link>
    </div>
  )
}

export default DeleteCity
