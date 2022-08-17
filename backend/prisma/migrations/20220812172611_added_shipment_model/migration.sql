-- CreateTable
CREATE TABLE "Shipment" (
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
