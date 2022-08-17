-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shipment_id" TEXT NOT NULL,
    "tujuan" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Belum Berangkat',
    "nama_driver" TEXT,
    "no_hp_driver" INTEGER,
    "plat_kendaraan" TEXT,
    "tanggal_berangkat" DATETIME,
    "dibuat_pada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Shipment" ("dibuat_pada", "id", "nama_driver", "no_hp_driver", "plat_kendaraan", "shipment_id", "status", "tanggal_berangkat", "tujuan") SELECT "dibuat_pada", "id", "nama_driver", "no_hp_driver", "plat_kendaraan", "shipment_id", "status", "tanggal_berangkat", "tujuan" FROM "Shipment";
DROP TABLE "Shipment";
ALTER TABLE "new_Shipment" RENAME TO "Shipment";
CREATE UNIQUE INDEX "Shipment_shipment_id_key" ON "Shipment"("shipment_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
