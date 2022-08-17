import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../helper/client";
import config from "../helper/config";
import ShipmentModel from "../models/shipment_model";
import Modal from "../components/Modal";
import moment from "moment";
import { data } from "autoprefixer";
import { Icon } from "@iconify/react";

const ShipmentIndex = () => {
  const navigate = useNavigate();

  const [listShipment, setListShipment] = React.useState<ShipmentModel[]>([]);
  const [listStatus, setListStatus] = React.useState<String[]>([
    "Belum Berangkat",
    "Sudah Berangkat",
  ]);

  const [showError, setShowError] = React.useState<String | null>();

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Number>(0);

  const [form, setForm] = React.useState<ShipmentModel | null>(null);

  const onHandlerChange = (e: any) => {
    const id = e.target.id;
    const value = e.target.value;

    setForm({
      ...form,
      [id]: e.target.value,
    });

    console.log(id + " " + e.target.value);
  };

  function validateForm(forms: any) {
    if (forms == undefined) return false;

    for (let key in forms) {
      if (forms[key] == "" || forms[key] == null) {
        return false;
      }
    }

    return true;
  }

  async function createShipmentButton() {
    try {
      const isFormValid = validateForm(form);
      if (isFormValid) {
        let response = await client.post("/shipments/add", form);
        if (response.status == 200) {
          var shipmentCreated: ShipmentModel = response.data;
          setListShipment([...listShipment, shipmentCreated]);

          setForm(null);
          setShowModal(false);
        }
      } else {
        setShowError("Please check your input please");
      }
    } catch (e: any) {
      console.log(e.toString());
    }
  }

  async function getListSipment() {
    try {
      let response = await client.get("/shipments");

      if (response.status == 200) {
        let responseData: ShipmentModel[] = response.data;

        setListShipment(responseData);
      }
    } catch (e: any) {
      console.log(e.toString());
    }
  }

  function parsingDate(date: Date) {
    let dateVal = moment(date);
    if (dateVal.isValid()) {
      return dateVal.toDate();
    }

    return "";
  }

  useEffect(() => {
    getListSipment();
  }, []);

  return (
    <div>
      <div className="flex z-2 items-center justify-center">
        <div className="px-24 py-24">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowModal(true);
                setShowError(null);
              }}
              className="bg-indigo-700  hover:bg-opacity-80 transition-all duration-300 px-4 py-2 rounded-md text-white capitalize font-semibold"
            >
              adds shipment
            </button>
          </div>
          <Modal show={showModal} onCloseHandler={() => setShowModal(false)}>
            <Modal.Header>Create New Shipment</Modal.Header>
            <Modal.Body>
              {showError ? (
                <div className="input-error w-full rounded-md p-4 bg-red-500 mb-2 text-white">
                  <div className="flex items-center">
                    <Icon
                      icon="ant-design:exclamation-circle-filled"
                      className="text-white text-2xl"
                    />
                    <span className="ml-2">Please check your input</span>
                  </div>
                </div>
              ) : null}
              <div className="form-group">
                <label htmlFor="">Asal</label>
                <input
                  type="text"
                  onChange={onHandlerChange}
                  className="form-input"
                  id="asal"
                  value={form?.asal}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Tujuan</label>
                <input
                  type="text"
                  onChange={onHandlerChange}
                  className="form-input"
                  id="tujuan"
                  value={form?.tujuan}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Status</label>
                <div className="mt-2 form-radio-wrapper flex">
                  {listStatus.map((item, index) => {
                    return (
                      <div className="flex items-center">
                        <input
                          id="status"
                          onChange={onHandlerChange}
                          type="radio"
                          className="accent-indigo-600 form-radio"
                          name="status"
                          value={item}
                          checked={form?.status == item}
                        />

                        <span
                          className={`font-semibold text-sm ${
                            form?.status == item
                              ? "text-indigo-600"
                              : "text-gray-500"
                          }`}
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="">Nama Driver</label>
                <input
                  type="text"
                  className="form-input"
                  name=""
                  id="nama_driver"
                  onChange={onHandlerChange}
                  value={form?.nama_driver}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">No Hp</label>
                <input
                  type="text"
                  className="form-input"
                  name=""
                  id="no_hp_driver"
                  onChange={onHandlerChange}
                  value={form?.no_hp_driver}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Tanggal Berangkat</label>
                <input
                  type="date"
                  className="form-input"
                  name=""
                  id="tanggal_berangkat"
                  onChange={onHandlerChange}
                  value={form?.tanggal_berangkat}
                />
              </div>
            </Modal.Body>

            <Modal.Footer>
              <div className="mt-4 flex w-full justify-end">
                <button
                  onClick={createShipmentButton}
                  className="bg-indigo-600 hover:bg-indigo-500 text-sm rounded-md py-3 px-6 transition-all duration-300 text-white font-sembiold"
                >
                  Add Shipment
                </button>
              </div>
            </Modal.Footer>
          </Modal>
          <div className="w-full mt-8 overflow-x-scroll">
            <table className="custom-table">
              <thead>
                <tr>
                  <td>Shipment id</td>
                  <td>asal</td>
                  <td>tujuan</td>
                  <td>status</td>
                  <td>nama driver</td>
                  <td>no hp driver</td>
                  <td>tanggal berangkat</td>
                  <td>dibuat pada</td>
                </tr>
              </thead>

              <tbody>
                {listShipment.map((item) => (
                  <tr>
                    <td>{item.shipment_id}</td>
                    <td>{item.asal}</td>
                    <td>{item.tujuan}</td>
                    <td>{item.status}</td>
                    <td>{item.nama_driver}</td>
                    <td>{item.no_hp_driver}</td>
                    <td>
                      {item.tanggal_berangkat
                        ? moment(item.tanggal_berangkat)
                            .format("DD, ddd MMMM yyyy | HH:mm")
                            .toString()
                        : ""}
                    </td>
                    <td>
                      {item.dibuat_pada
                        ? moment(item.dibuat_pada)
                            .format("DD, ddd MMMM yyyy | HH:mm")
                            .toString()
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentIndex;
