-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('COMPRA', 'VENDA');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ativos" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "ativos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operacoes" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "ativo_id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" DECIMAL(10,2) NOT NULL,
    "corretagem" DECIMAL(10,2) NOT NULL,
    "tipo_operacao" "OperationType" NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "operacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cotacoes" (
    "id" TEXT NOT NULL,
    "ativo_id" TEXT NOT NULL,
    "preco_unitario" DECIMAL(10,2) NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cotacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ativos_codigo_key" ON "ativos"("codigo");

-- CreateIndex
CREATE INDEX "operacoes_usuario_id_ativo_id_data_hora_idx" ON "operacoes"("usuario_id", "ativo_id", "data_hora" DESC);

-- CreateIndex
CREATE INDEX "cotacoes_ativo_id_data_hora_idx" ON "cotacoes"("ativo_id", "data_hora" DESC);

-- AddForeignKey
ALTER TABLE "operacoes" ADD CONSTRAINT "operacoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operacoes" ADD CONSTRAINT "operacoes_ativo_id_fkey" FOREIGN KEY ("ativo_id") REFERENCES "ativos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cotacoes" ADD CONSTRAINT "cotacoes_ativo_id_fkey" FOREIGN KEY ("ativo_id") REFERENCES "ativos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
