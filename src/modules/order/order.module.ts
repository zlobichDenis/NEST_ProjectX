import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderRepository } from "./order.repository";
import { OrderController } from "./order.controller";
import { ProfileModule } from "../profile/profile.module";

@Module({
    providers: [
        OrderService,
        OrderRepository,
    ],
    controllers: [
        OrderController,
    ],
    imports: [
        ProfileModule,
    ],
    exports: [],
})
export class OrderModule {}
