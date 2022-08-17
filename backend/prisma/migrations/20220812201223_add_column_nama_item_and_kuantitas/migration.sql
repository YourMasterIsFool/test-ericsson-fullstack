/*
  Warnings:

  - Added the required column `nama_item` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shipment_id" TEXT,
    "nama_item" TEXT NOT NULL,
    "kuantitas" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Item_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "Shipment" ("shipment_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("id", "shipment_id") SELECT "id", "shipment_id" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Shipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shipment_id" TEXT,
    "asal" TEXT,
    "tujuan" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Belum Berangkat',
    "nama_driver" TEXT,
    "no_hp_driver" INTEGER,
    "plat_kendaraan" TEXT,
    "tanggal_berangkat" DATETIME,
    "dibuat_pada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Shipment" ("asal", "dibuat_pada", "id", "nama_driver", "no_hp_driver", "plat_kendaraan", "shipment_id", "status", "tanggal_berangkat", "tujuan") SELECT "asal", "dibuat_pada", "id", "nama_driver", "no_hp_driver", "plat_kendaraan", "shipment_id", "status", "tanggal_berangkat", "tujuan" FROM "Shipment";
DROP TABLE "Shipment";
ALTER TABLE "new_Shipment" RENAME TO "Shipment";
CREATE UNIQUE INDEX "Shipment_shipment_id_key" ON "Shipment"("shipment_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
