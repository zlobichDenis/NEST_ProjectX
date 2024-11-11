import { Module } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { CartRepository } from "./cart.repository";
import { CartService } from "./cart.service";
import { ProfileModule } from "../profile/profile.module";
import { CartItemRepository } from "./repositories/cart-item.repository";

@Module({
    imports: [
        ProfileModule,
    ],
    controllers: [
        CartController,
    ],
    providers: [
        CartRepository,
        CartItemRepository,
        CartService,
    ],
    exports: [],
})
export class CartModule {}
