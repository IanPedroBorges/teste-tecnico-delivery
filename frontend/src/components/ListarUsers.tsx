import { deleteUser } from "../requests/userRequest";
import { UserReturn } from "../types/context/loginContext";
import { Trash2 } from "lucide-react";

interface Props {
  date: UserReturn;
  role: "ADMIN" | "USER" | undefined;
  onDeleteUser: (id: string) => void;
}

export default function ListarUsers({ date, role, onDeleteUser }: Props) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o usuário "${date.name}"?`
    );
    if (!confirmDelete) return;

    try {
      if (!role) {
        alert("Erro ao deletar usuário. Tente novamente.");
        return;
      }
      await deleteUser(date.id, role);
      alert("Usuário deletado com sucesso.");
      onDeleteUser(date.id);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert("Erro ao deletar usuário. Tente novamente.");
    }
  };

  return (
    <li className="py-3 px-4 flex items-center hover:bg-gray-50 transition-all gap-4">
      <div className="text-sm text-gray-500 w-1/3 truncate">{date.name}</div>
      <div className="text-sm text-gray-500 w-1/3 truncate">{date.email}</div>
      <div className="text-sm text-gray-500 w-1/3 text-right">{date.role}</div>

      <button
        className="ml-auto text-red-500 hover:text-red-700 transition cursor-pointer"
        onClick={handleDelete}
        title="Excluir usuário"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}
