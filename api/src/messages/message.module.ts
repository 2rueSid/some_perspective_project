import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { MessagesResolver } from './message.resolver';
import { MessagesService } from './messages.service';

@Module({
  imports: [PrismaModule],
  providers: [
    MessagesService,
    MessagesResolver,
    {
      provide: 'SUBSCRIBERS_SERVICE',
      useFactory: () => {
        const user = process.env.RABBITMQ_USER;
        const password = process.env.RABBITMQ_PASSWORD;
        const host = process.env.RABBITMQ_HOST;
        const queueName = process.env.RABBITMQ_QUEUE_NAME;

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: queueName,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
    },
  ],
  exports: [MessagesService, MessagesResolver],
})
export class Messages {}
