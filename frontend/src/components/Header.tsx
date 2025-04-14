export default function Header({name} : {name: string | undefined}) {


  return (
    <header className="bg-green-600 text-white text-center py-6 rounded-md shadow-md mb-8">
          <h1 className="text-3xl font-bold">Bem vindo {name}</h1>
        </header>
  )
}
