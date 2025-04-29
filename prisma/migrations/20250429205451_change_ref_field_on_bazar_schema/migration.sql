-- DropForeignKey
ALTER TABLE "bazars" DROP CONSTRAINT "bazars_purchased_by_fkey";

-- AddForeignKey
ALTER TABLE "bazars" ADD CONSTRAINT "bazars_purchased_by_fkey" FOREIGN KEY ("purchased_by") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
