/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/CreateDeliveryForm.tsx
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDelivery } from "../requests/deliveryRequest";
import { getAllUsers } from "../requests/userRequest";
import { userContext } from "../context/UserContext/UserContext";
import { getAllDeliveryPersons } from "../requests/deliveryPersonRequest";

export default function CreateDelivery() {
  const navigate = useNavigate();
  const { User } = useContext(userContext);
  const [userId, setUserId] = useState("");
  const [deliveryPersonId, setDeliveryPersonId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [checkpoint1, setCheckpoint1] = useState("");
  const [checkpoint2, setCheckpoint2] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [users, setUsers] = useState([]);
  const [deliveryPeople, setDeliveryPeople] = useState([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId || !deliveryPersonId) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      if (User?.role !== "ADMIN") {
        setErrorMessage("Apenas administradores podem criar entregas.");
        return;
      }
      await createDelivery(
        {
          userId: parseInt(userId),
          deliveryPersonId: parseInt(deliveryPersonId),
          startPoint,
          checkpoint1,
          checkpoint2,
          endPoint,
          currentStop: 'START',
          status: "PENDING",
        },
        User?.role
      );

      setSuccessMessage("Entrega criada com sucesso!");
      setErrorMessage("");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao criar entrega:", error);
      setErrorMessage("Erro ao criar entrega. Tente novamente.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (User?.role !== "ADMIN") {
          setErrorMessage("Apenas administradores podem criar entregas.");
          return;
        }
        const usersData = await getAllUsers(User?.role);
        const deliveryPeopleData = await getAllDeliveryPersons();
        setUsers(usersData);
        setDeliveryPeople(deliveryPeopleData);
      } catch (err: unknown) {
        console.log(err);
        setErrorMessage("Erro ao carregar usuários ou entregadores.");
      }
    };

    fetchData();
  }, []);

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="bg-stone-200 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Nova Entrega</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Usuário</label>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione um usuário</option>
            {users.map((user: any) => (
              <option key={user.id} value={user.id}>
                {user.name || `Usuário ${user.id}`}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Entregador</label>
          <select
            value={deliveryPersonId}
            onChange={(e) => setDeliveryPersonId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione um entregador</option>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {deliveryPeople.map((d: any) => (
              <option key={d.id} value={d.id}>
                {d.name || `Entregador ${d.id}`}
              </option>
            ))}
          </select>
        </div>
        {[
          {
            id: "startPoint",
            label: "Ponto de Partida",
            value: startPoint,
            setter: setStartPoint,
          },
          {
            id: "checkpoint1",
            label: "Checkpoint 1",
            value: checkpoint1,
            setter: setCheckpoint1,
          },
          {
            id: "checkpoint2",
            label: "Checkpoint 2",
            value: checkpoint2,
            setter: setCheckpoint2,
          },
          {
            id: "endPoint",
            label: "Destino Final",
            value: endPoint,
            setter: setEndPoint,
          },
        ].map(({ id, label, value, setter }) => (
          <div key={id} className="mb-4">
            <label htmlFor={id} className="block text-gray-700 mb-2">
              {label}
            </label>
            <input
              id={id}
              type="text"
              value={value}
              onChange={(e) => setter(e.target.value)}
              placeholder={`Digite ${label.toLowerCase()}`}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Criar Entrega
          </button>
        </div>
      </form>
    </div>
  );
}
