import style from "../generalStyles/ServicesComponents/Carry.module.css";
import RowTable from "./RowTable";

const CarryTable = ({ data }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      {/* <div className={style.carryList}> */}
      <p className="fs-4">Servicios</p>
      <div className="container ">
        {data?.map((row, index) => (
          <div key={index} className="my-2">
            <RowTable key={row.id} data={row} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarryTable;
