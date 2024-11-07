/*
  Warnings:

  - A unique constraint covering the columns `[transactionId,contactId]` on the table `Split` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Split_transactionId_contactId_key" ON "Split"("transactionId", "contactId");
