import { useContext, useState } from "react";
import { createDeliveryPerson } from "../requests/deliveryPersonRequest";
import { userContext } from "../context/UserContext/UserContext";
import { useNavigate } from "react-router-dom";

export default function CreateDeliveryPerson() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { User } = useContext(userContext);

  const handleCreateDeliveryPerson = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      if (User?.role !== "ADMIN") {
        setErrorMessage("Apenas administradores podem criar entregadores.");
        return;
      }
      await createDeliveryPerson(name, vehicle, false, User?.role);
      setSuccessMessage("Entregador criado com sucesso!");
      setName("");
      setVehicle("");
    } catch (error: unknown) {
      console.error("Error creating delivery person:", error);
      setErrorMessage("Erro ao criar entregador. Tente novamente.");
    }
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="bg-stone-200 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleCreateDeliveryPerson}
        className="bg-white px-16 py-12 rounded-2xl shadow-xl text-center w-100 relative"
      >
        <h1 className="text-6xl mb-10">Criar Entregador</h1>

        <fieldset className="text-left mb-4">
          <input
            type="text"
            id="name"
            placeholder="Nome do entregador"
            className="w-full block bg-black rounded p-2 text-white"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </fieldset>

        <fieldset className="text-left mb-4">
          <input
            type="text"
            id="vehicle"
            placeholder="Veículo do entregador"
            className="w-full block bg-black rounded p-2 text-white"
            onChange={(e) => setVehicle(e.target.value)}
            value={vehicle}
          />
        </fieldset>

        <div>
          <button
            className="bg-green-400 p-3 w-full mt-4 mb-2 rounded-lg font-bold shadow cursor-pointer hover:bg-green-500 transition hover:text-white"
            type="submit"
          >
            Criar Entregador
          </button>
          {errorMessage && (
            <small className="text-red-400 font-normal">{errorMessage}</small>
          )}
          {successMessage && (
            <small className="text-green-400 font-normal">
              {successMessage}
            </small>
          )}
        </div>

        <button
          type="button"
          onClick={handleBack}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition"
        >
          Voltar
        </button>
      </form>
    </div>
  );
}
