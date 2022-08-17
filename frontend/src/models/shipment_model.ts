interface ShipmentModel {
    shipment_id: string,
    asal: string,
    tujuan: string,
    status: string,
    nama_driver: string | null,
    no_hp_driver: string | null,
    plat_kendaraan:string | null,
    dibuat_pada: Date | null,
    tanggal_berangkat: Date,
}

export default ShipmentModel