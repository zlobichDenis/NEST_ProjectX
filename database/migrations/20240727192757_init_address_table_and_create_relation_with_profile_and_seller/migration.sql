-- CreateTable
CREATE TABLE "seller_address" (
    "seller_id" UUID NOT NULL,
    "address_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seller_address_pkey" PRIMARY KEY ("seller_id","address_id")
);

-- CreateTable
CREATE TABLE "profile_address" (
    "profile_id" UUID NOT NULL,
    "address_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_address_pkey" PRIMARY KEY ("profile_id","address_id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" UUID NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "post_index" VARCHAR(255) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "house_number" INTEGER NOT NULL,
    "apartment" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "address_id_key" ON "address"("id");

-- AddForeignKey
ALTER TABLE "seller_address" ADD CONSTRAINT "seller_address_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller_address" ADD CONSTRAINT "seller_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_address" ADD CONSTRAINT "profile_address_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_address" ADD CONSTRAINT "profile_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
