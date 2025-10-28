-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "github_id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "avatar_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."report_histories" (
    "report_history_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "report_title" TEXT NOT NULL,
    "repository_overview" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "repository_url" TEXT NOT NULL,

    CONSTRAINT "report_histories_pkey" PRIMARY KEY ("report_history_id")
);

-- CreateTable
CREATE TABLE "public"."repositories" (
    "repository_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "repository_name" TEXT NOT NULL,
    "repository_owner" TEXT NOT NULL,
    "repository_url" TEXT NOT NULL,
    "visibility" TEXT NOT NULL,
    "connected_status" TEXT NOT NULL DEFAULT 'connected',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "repositories_pkey" PRIMARY KEY ("repository_id")
);

-- CreateTable
CREATE TABLE "public"."reports" (
    "report_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "report_title" VARCHAR(30) NOT NULL,
    "report_summary" TEXT NOT NULL,
    "report_conclusion" TEXT NOT NULL,
    "owner" VARCHAR(50) NOT NULL,
    "repository_name" VARCHAR(100) NOT NULL,
    "repository_url" VARCHAR(255) NOT NULL,
    "branch" VARCHAR(80) NOT NULL,
    "commits" JSONB NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("report_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_github_id_key" ON "public"."users"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "public"."users"("user_email");

-- AddForeignKey
ALTER TABLE "public"."report_histories" ADD CONSTRAINT "fk_report_histories_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."repositories" ADD CONSTRAINT "fk_repositories_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."reports" ADD CONSTRAINT "fk_report_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;
