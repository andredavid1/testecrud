import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import { stringify } from 'querystring'

const PetPage = ({ data }: any) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const city = data.data;
  const handleDelete = async () => {
    const cityID = router.query.id

    try {
      await axios.delete(`/api/cities/${cityID}`);
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the city.')
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

export async function getServerSideProps({ params }: any) {
  const res = await axios.get(`http://localhost:3000/api/cities/${params.id}`);
  const data = res.data;

  return { props: { data } }
}

export default PetPage
