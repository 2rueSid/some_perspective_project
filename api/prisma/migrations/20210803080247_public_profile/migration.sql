-- AlterTable
ALTER TABLE "Tags" ADD COLUMN     "userPublicProfileId" INTEGER;

-- CreateTable
CREATE TABLE "user_public_profile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "facebook_link" TEXT,
    "instagram_lik" TEXT,
    "twitter_link" TEXT,
    "youtube_link" TEXT,
    "video_link" TEXT,
    "about_me" TEXT NOT NULL,
    "public_email" TEXT,
    "years" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_public_profile" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD FOREIGN KEY ("userPublicProfileId") REFERENCES "user_public_profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
