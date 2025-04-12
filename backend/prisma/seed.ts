import { PrismaClient, Role, DeliveryStop, DeliveryStatus } from '@prisma/client';
import bcrypt from '../src/utils/bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Senhas criptografadas
  const password1 = bcrypt.createHash('user123');
  const password2 = bcrypt.createHash('user1234');
  const password3 = bcrypt.createHash('admin123');

  // Usuários
  const user1 = await prisma.user.create({
    data: { name: 'Usuário Comum 1', email: 'user1@email.com', password: password1, role: Role.USER },
  });

  const user2 = await prisma.user.create({
    data: { name: 'Usuário Comum 2', email: 'user2@email.com', password: password2, role: Role.USER },
  });

  const admin = await prisma.user.create({
    data: { name: 'Admin', email: 'admin@email.com', password: password3, role: Role.ADMIN },
  });

  // Entregadores
  const deliveryMan1 = await prisma.deliveryPerson.create({
    data: { name: 'Entregador Livre', vehicle: 'Moto', isBusy: false },
  });

  const deliveryMan2 = await prisma.deliveryPerson.create({
    data: { name: 'Entregador com 1 entrega', vehicle: 'Carro', isBusy: true },
  });

  const deliveryMan3 = await prisma.deliveryPerson.create({
    data: { name: 'Entregador com 2 entregas', vehicle: 'Bicicleta', isBusy: true },
  });

  // Entregas
  await prisma.delivery.createMany({
    data: [
      {
        startPoint: '-23.561684,-46.655981',
        checkpoint1: '-23.587416,-46.657634',
        checkpoint2: '-23.535991,-46.633925',
        endPoint: '-23.626076,-46.656265',
        currentStop: DeliveryStop.START,
        status: DeliveryStatus.PENDING,
        userId: user1.id,
        deliveryPersonId: deliveryMan2.id,
      },
      {
        startPoint: '-23.562573,-46.655365',
        checkpoint1: '-23.567564,-46.648350',
        checkpoint2: '-23.589871,-46.658398',
        endPoint: '-23.600000,-46.655000',
        currentStop: DeliveryStop.CHECKPOINT1,
        status: DeliveryStatus.IN_PROGRESS,
        userId: user2.id,
        deliveryPersonId: deliveryMan3.id,
      },
      {
        startPoint: '-23.533773,-46.625290',
        checkpoint1: '-23.542161,-46.635718',
        checkpoint2: '-23.548943,-46.638818',
        endPoint: '-23.550520,-46.633308',
        currentStop: DeliveryStop.CHECKPOINT2,
        status: DeliveryStatus.IN_PROGRESS,
        userId: admin.id,
        deliveryPersonId: deliveryMan3.id,
      },
      {
        startPoint: '-23.646820,-46.703076',
        checkpoint1: '-23.634486,-46.704601',
        checkpoint2: '-23.627048,-46.698401',
        endPoint: '-23.625847,-46.693093',
        currentStop: DeliveryStop.END,
        status: DeliveryStatus.COMPLETED,
        userId: user1.id,
        deliveryPersonId: deliveryMan2.id,
      },
      {
        startPoint: '-23.544045,-46.629259',
        checkpoint1: '-23.551586,-46.658275',
        checkpoint2: '-23.564786,-46.652375',
        endPoint: '-23.570257,-46.641453', 
        currentStop: DeliveryStop.START,
        status: DeliveryStatus.PENDING,
        userId: user2.id,
        deliveryPersonId: deliveryMan2.id,
      },
    ],
  });

  console.log('🌱 Seed concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());