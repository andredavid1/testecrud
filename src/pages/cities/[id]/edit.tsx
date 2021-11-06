/* eslint-disable @next/next/link-passhref */
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (url:string) =>
  axios.get(url)
    .then((res) => res.data.data)

const EditCity = () => {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    const data = {
      uf,
      name
    }

    console.log('pagina edit', data);

    try {
      const res = await axios.put(`/api/cities/${id}`, data)

      if(!res.data.success){
        throw new Error("falhou")
      }

      router.push('/cities')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{minHeight:'80vh', padding:'10px 20px'}}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={event => setName(event.target.value)} />
        <input type="text" value={uf} onChange={event => setUf(event.target.value)} />
        <button type="submit">
          Atualizar
        </button>
        <Link href="/cities" as={`/cities`}><button type="button">Cancelar</button></Link>
      </form>
    </div>
  )
}

export default EditCity
