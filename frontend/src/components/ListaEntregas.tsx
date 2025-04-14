import { useContext } from "react";
import { deleteDelivery, updateCurrentStop } from "../requests/deliveryRequest";
import { deliveryTypeReturn } from "../types/deliveryType";
import { Trash2, ArrowRight, Eye } from "lucide-react";
import { userContext } from "../context/UserContext/UserContext";
import { useNavigate } from "react-router-dom";

interface Props {
    date: deliveryTypeReturn;
    onUpdateList: () => void;
  }
  

export default function ListarEntregas({ date, onUpdateList }: Props) {
  const isBusy = date.status === "IN_PROGRESS";
  const { User } = useContext(userContext);
  const navigate = useNavigate();

  const traduzirParadaAtual = (stop: string): string => {
    switch (stop) {
      case "START":
        return "Início";
      case "CHECKPOINT1":
        return "Primeira parada";
      case "CHECKPOINT2":
        return "Segunda parada";
      case "END":
        return "Destino final";
      default:
        return "Desconhecido";
    }
  };

  const handleDelete = async () => {
    try {
      if (User?.role !== "ADMIN") {
        alert("Você não tem permissão para deletar entregas");
        return;
      }
      await deleteDelivery(date.id, User?.role);
      alert("Entrega deletada com sucesso");
      onUpdateList(); // 🔥 Atualiza a lista no componente pai
    } catch (error) {
      console.error("Erro ao deletar entrega", error);
      alert("Erro ao deletar entrega");
    }
  };
  
  const handleAdvanceCheckpoint = async () => {
    try {
      if (User?.role !== "ADMIN") {
        alert("Você não tem permissão para avançar o checkpoint");
        return;
      }
      await updateCurrentStop(
        date.id,
        date.currentStop === "CHECKPOINT1" ? "CHECKPOINT2" : "END",
        User?.role
      );
      alert("Checkpoint avançado");
      onUpdateList(); // 🔥 Atualiza a lista no componente pai
    } catch (error) {
      console.error("Erro ao avançar checkpoint", error);
      alert("Erro ao avançar checkpoint");
    }
  };
  
  const handleVisualize = () => {
    // Navega para a página de visualização, onde você pode exibir o mapa com Leaflet
    navigate(`/visualize/delivery/${date.id}`);
  };

  return (
    <li className="py-3 px-4 flex flex-col hover:bg-gray-50 transition-all border-b">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4 mb-4">
        <div className="text-sm text-gray-700 w-full md:w-1/4 truncate">
          <strong>Usuário:</strong> {date.user.name}
        </div>
        <div className="text-sm text-gray-700 w-full md:w-1/4 truncate">
          <strong>Entregador:</strong> {date.deliveryPerson.name}
        </div>
        <div className="text-sm text-gray-700 w-full md:w-1/4 text-right md:text-left">
          <strong>Status:</strong> {isBusy ? "Está entregando" : "Está livre"}
        </div>
        <div className="text-sm text-gray-700 w-full md:w-1/4 text-right">
          <strong>Parada atual:</strong> {traduzirParadaAtual(date.currentStop)}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-2">
        <button
          onClick={handleDelete}
          className="p-2 text-red-600 hover:text-red-800 transition"
          title="Deletar"
        >
          <Trash2 size={20} />
        </button>
        <button
          onClick={handleAdvanceCheckpoint}
          className="p-2 text-green-600 hover:text-green-800 transition"
          title="Avançar Checkpoint"
        >
          <ArrowRight size={20} />
        </button>
        <button
          onClick={handleVisualize}
          className="p-2 text-blue-600 hover:text-blue-800 transition"
          title="Visualizar"
        >
          <Eye size={20} />
        </button>
      </div>
    </li>
  );
}
