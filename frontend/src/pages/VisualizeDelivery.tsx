import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { getDeliveryById } from "../requests/deliveryRequest";
import { io } from "socket.io-client";

type DeliveryData = {
  id: number;
  startPoint: string;
  checkpoint1: string;
  checkpoint2: string;
  endPoint: string;
  currentStop: string;
  status: string;
  user: { name: string };
  deliveryPerson: { name: string };
};

export default function VisualizeDelivery() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState<DeliveryData | null>(null);

  const fetchDelivery = useCallback(async () => {
    if (id) {
      try {
        const data = await getDeliveryById(id);
        setDelivery(data);
      } catch (error) {
        console.error("Erro ao buscar entrega:", error);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchDelivery();

    const socket = io("http://localhost:3001");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on("delivery-updated", (data: any) => {
      if (data && data.id === Number(id)) {
        console.log("Atualizando entrega, evento recebido:", data);
        fetchDelivery();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [id, fetchDelivery]);

  if (!delivery) {
    return <p>Carregando...</p>;
  }

  const points: { label: string; coords: [number, number] }[] = [
    { label: "Partida", coords: delivery.startPoint.split(",").map(Number) as [number, number] },
    { label: "Checkpoint 1", coords: delivery.checkpoint1.split(",").map(Number) as [number, number] },
    { label: "Checkpoint 2", coords: delivery.checkpoint2.split(",").map(Number) as [number, number] },
    { label: "Destino", coords: delivery.endPoint.split(",").map(Number) as [number, number] },
  ];

  let currentCheckpoint = 0;
  switch (delivery.currentStop) {
    case "START":
      currentCheckpoint = 0;
      break;
    case "CHECKPOINT1":
      currentCheckpoint = 1;
      break;
    case "CHECKPOINT2":
      currentCheckpoint = 2;
      break;
    case "END":
      currentCheckpoint = 3;
      break;
    default:
      currentCheckpoint = 0;
  }

  const baseIcon: Icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const currentIcon: Icon = L.icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
  });

  const center: [number, number] = points[0].coords;

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Visualizar Entrega</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Voltar
        </button>
      </div>
      <MapContainer center={center} zoom={13} style={{ height: "80vh", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((point, index) => (
          <Marker
            key={index}
            position={point.coords}
            icon={index === currentCheckpoint ? currentIcon : baseIcon}
          >
            <Popup>
              <strong>{point.label}</strong>
              <br />
              Coordenadas: {point.coords.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
