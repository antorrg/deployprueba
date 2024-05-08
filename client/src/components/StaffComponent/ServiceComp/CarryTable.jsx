import style from "../generalStyles/ServicesComponents/Carry.module.css";
import RowTable from "./RowTable";

const CarryTable = ({ data }) => {
  return (
    <div className="border rounded d-flex flex-column align-items-center">
      {/* <div className={style.carryList}> */}
      <p className="fs-4">Servicios</p>
      <div className="mx-auto w-75">
        {data?.map((row) => (
          <div className="mx-auto my-2">
            <RowTable key={row.id} data={row} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarryTable;
