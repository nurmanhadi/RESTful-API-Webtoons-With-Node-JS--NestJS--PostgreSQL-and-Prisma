-- CreateTable
CREATE TABLE "users" (
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("email")
);
