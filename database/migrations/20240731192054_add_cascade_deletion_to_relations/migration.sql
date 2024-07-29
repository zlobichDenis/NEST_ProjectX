-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_file_id_fkey";

-- DropForeignKey
ALTER TABLE "product_photo" DROP CONSTRAINT "product_photo_photo_id_fkey";

-- DropForeignKey
ALTER TABLE "product_photo" DROP CONSTRAINT "product_photo_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_tag" DROP CONSTRAINT "product_tag_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_tag" DROP CONSTRAINT "product_tag_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "product_videos" DROP CONSTRAINT "product_videos_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_videos" DROP CONSTRAINT "product_videos_video_id_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_photo_id_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "profile_address" DROP CONSTRAINT "profile_address_address_id_fkey";

-- DropForeignKey
ALTER TABLE "profile_address" DROP CONSTRAINT "profile_address_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "region_product" DROP CONSTRAINT "region_product_product_id_fkey";

-- DropForeignKey
ALTER TABLE "region_product" DROP CONSTRAINT "region_product_region_id_fkey";

-- DropForeignKey
ALTER TABLE "seller" DROP CONSTRAINT "seller_logo_id_fkey";

-- DropForeignKey
ALTER TABLE "seller" DROP CONSTRAINT "seller_user_id_fkey";

-- DropForeignKey
ALTER TABLE "seller_address" DROP CONSTRAINT "seller_address_address_id_fkey";

-- DropForeignKey
ALTER TABLE "seller_address" DROP CONSTRAINT "seller_address_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "seller_product" DROP CONSTRAINT "seller_product_product_id_fkey";

-- DropForeignKey
ALTER TABLE "seller_product" DROP CONSTRAINT "seller_product_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "video" DROP CONSTRAINT "video_file_id_fkey";

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_logo_id_fkey" FOREIGN KEY ("logo_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller_address" ADD CONSTRAINT "seller_address_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller_address" ADD CONSTRAINT "seller_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_address" ADD CONSTRAINT "profile_address_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_address" ADD CONSTRAINT "profile_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_videos" ADD CONSTRAINT "product_videos_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_videos" ADD CONSTRAINT "product_videos_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_photo" ADD CONSTRAINT "product_photo_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_photo" ADD CONSTRAINT "product_photo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "region_product" ADD CONSTRAINT "region_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "region_product" ADD CONSTRAINT "region_product_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tag" ADD CONSTRAINT "product_tag_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tag" ADD CONSTRAINT "product_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller_product" ADD CONSTRAINT "seller_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller_product" ADD CONSTRAINT "seller_product_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video" ADD CONSTRAINT "video_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "public_file"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "public_file"("id") ON DELETE CASCADE ON UPDATE CASCADE;
