import { DeliveryPersonReturn } from "../types/DeliveryPersonReturn";

interface Props {
  date: DeliveryPersonReturn;
  onDeleteDeliveryPerson: (id: string) => void;
}

export default function ListarEntregadores({ date, onDeleteDeliveryPerson }: Props) {
  const handleDelete = () => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o entregador "${date.name}"?`);
    if (confirmDelete) {
      onDeleteDeliveryPerson(date.id);
    }
  };

  return (
    <li className="py-3 px-4 flex justify-between items-center hover:bg-gray-50 transition-all">
      <div className="text-sm text-gray-700 w-1/3 truncate">{date.name}</div>
      <div className="text-sm text-gray-700 w-1/3 truncate">{date.vehicle}</div>
      <div className="text-sm text-gray-700 w-1/3 text-right">
        {date.isBusy ? "Entregando" : "Livre"}
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 ml-4"
        title="Excluir entregador"
      >
        Deletar
      </button>
    </li>
  );
}
