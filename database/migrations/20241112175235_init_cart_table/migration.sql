-- CreateTable
CREATE TABLE "cart" (
    "customer_id" UUID NOT NULL,
    "items" UUID[],

    CONSTRAINT "cart_pkey" PRIMARY KEY ("customer_id")
);

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
