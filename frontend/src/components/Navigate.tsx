interface NavigateProps {
    role: 'ADMIN' | 'USER' | undefined;
    onNavUser: () => void;
    onNavEntregador: () => void;
    onNavEntrega: () => void;
  }
  
  export default function Navigate({ role, onNavUser, onNavEntregador, onNavEntrega }: NavigateProps) {
    return (
      <>
        {role === "ADMIN" && (
          <>
            <button onClick={onNavUser} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
              Usuários
            </button>
            <button onClick={onNavEntregador} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Entregadores
            </button>
            <button onClick={onNavEntrega} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Entregas
            </button>
          </>
        )}
      </>
    );
  }
  