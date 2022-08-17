import { Moment } from "moment"

interface ShipmentModel {
    
    readonly shipment_id: string | null
    tujuan: string
    status: string
    asal: string
    nama_driver: string | null
    no_hp_driver: string | null,
    plat_kendaraan: string | null
    tanggal_berangkat: Date,
    dibuat_pada: Date | null,
}



export default ShipmentModel