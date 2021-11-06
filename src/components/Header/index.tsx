import Link from 'next/link';

export function Header () {
  return (
    <header style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', minHeight:'15vh', background:'#0000ff', color:'#ffffff', padding:'0 10px'}}>
      <Link href='/'>QueroLouvar</Link>
      <nav>
        <ul style={{listStyle:'none'}}>
          <li>
            <Link href='/cities'>Cidades</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}