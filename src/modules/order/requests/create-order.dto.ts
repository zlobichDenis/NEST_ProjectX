import { payment_method as PaymentMethod } from "@prisma/client";
import { CreateOrderBody } from "../validation/create-order.schema";
import { CreateAddressDto } from "../../address/requests/create-address.dto";

export class CreateOrderDto
{
    public customerId: string;
    public cartItemIds: string[];
    public paymentMethod: PaymentMethod;
    public shippingAddress?: CreateAddressDto;
    public customerAddressId?: string;

    public constructor(
        {
            paymentMethod,
            shippingAddress,
            items,
            existingAddressId,
        }: CreateOrderBody,
        customerId: string,
    )
    {
        console.log({ existingAddressId, shippingAddress })
        this.cartItemIds = items;
        this.customerId = customerId;
        this.customerAddressId = existingAddressId;
        this.shippingAddress = shippingAddress ? new CreateAddressDto(shippingAddress) : undefined;
        this.paymentMethod = paymentMethod;
    }
}
