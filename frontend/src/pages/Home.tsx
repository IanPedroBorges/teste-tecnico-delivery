import { useContext, useState } from "react";
import Header from "../components/Header";
import Navigate from "../components/Navigate";
import { userContext } from "../context/UserContext/UserContext";
import { UserReturn } from "../types/context/loginContext";
import { getAllUsers } from "../requests/userRequest";
import ListarUsers from "../components/ListarUsers";
import {
  getAllDeliveryPersons,
  deleteDeliveryPerson,
} from "../requests/deliveryPersonRequest";
import { DeliveryPersonReturn } from "../types/DeliveryPersonReturn";
import ListarEntregadores from "../components/ListarEntregadores";
import { deliveryTypeReturn } from "../types/deliveryType";
import { getAllDeliveries } from "../requests/deliveryRequest";
import ListarEntregas from "../components/ListaEntregas";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { User } = useContext(userContext);
  const [usuarios, setUsuarios] = useState<UserReturn[]>([]);
  const [entregadores, setEntregadores] = useState<DeliveryPersonReturn[]>([]);
  const [entregas, setEntregas] = useState<deliveryTypeReturn[]>([]);
  const [listType, setListType] = useState<
    "USER" | "Workers" | "Delivery" | ""
  >("");

  const handleNavUser = async () => {
    if (User?.role !== "ADMIN") {
      console.log("não é admin");
      return;
    }
    const data = await getAllUsers(User?.role);
    setUsuarios(data);
    setListType("USER");
  };

  const handleNavEntregador = async () => {
    if (User?.role !== "ADMIN") {
      console.log("não é admin");
      return;
    }
    const data = await getAllDeliveryPersons();
    setEntregadores(data);
    setListType("Workers");
  };

  const handleNavEntrega = async () => {
    if (User?.role !== "ADMIN") {
      console.log("não é admin");
      return;
    }
    const data = await getAllDeliveries();
    setEntregas(data);
    setListType("Delivery");
  };

  const handleRemoveUser = (id: string) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.filter((user) => user.id !== id)
    );
  };

  const handleRemoveDeliveryPerson = async (id: string) => {
    if (!User) {
      alert("Usuário não autenticado.");
      return;
    }
    try {
      await deleteDeliveryPerson(id, User);
      setEntregadores((prevEntregadores) =>
        prevEntregadores.filter((entregador) => entregador.id !== id)
      );
      alert("Entregador deletado com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar entregador:", error);
      alert("Erro ao deletar entregador. Tente novamente.");
    }
  };

  const fetchEntregas = async () => {
    if (User?.role !== "ADMIN") return;
    const data = await getAllDeliveries();
    setEntregas(data);
  };
  

  const handleCreateDeliveryPerson = () => {
    navigate("/register/delivery-person");
  };

  const handleCreateDelivery = () => {
    navigate("/register/delivery");
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-8">
        <Header name={User?.name} />
        <div className="flex justify-center gap-4 flex-wrap mt-6">
          <Navigate
            role={User?.role}
            onNavUser={handleNavUser}
            onNavEntregador={handleNavEntregador}
            onNavEntrega={handleNavEntrega}
          />
        </div>
      </div>

      <section className="bg-white shadow-md rounded-lg p-6 w-[90%] mx-auto mt-6">
        {listType === "USER" && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Usuários
            </h2>
            <ul className="divide-y divide-gray-200">
              {usuarios.map((usuario) => (
                <ListarUsers
                  key={usuario.id}
                  date={usuario}
                  role={User?.role}
                  onDeleteUser={handleRemoveUser}
                />
              ))}
            </ul>
          </>
        )}
        {listType === "Workers" && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Entregadores
            </h2>
            <ul className="divide-y divide-gray-200">
              {entregadores.map((entregador) => (
                <ListarEntregadores
                  key={entregador.id}
                  date={entregador}
                  onDeleteDeliveryPerson={handleRemoveDeliveryPerson} // Passando a função de remoção
                />
              ))}
            </ul>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleCreateDeliveryPerson}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition"
              >
                Criar Entregador
              </button>
            </div>
          </>
        )}
        {listType === "Delivery" && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Entregas
            </h2>
            <ul className="divide-y divide-gray-200">
              {entregas.map((entrega) => (
               <ListarEntregas
               key={entrega.id}
               date={entrega}
               onUpdateList={fetchEntregas}
             />
             
              ))}
            </ul>
            <div className="flex justify-center mt-4">
        <button
          onClick={handleCreateDelivery}
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition"
        >
          Nova Entrega
        </button>
      </div>
          </>
        )}
      </section>
    </>
  );
}
