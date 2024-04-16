import style from '../generalStyles/ServicesComponents/Carry.module.css'
import RowTable from './RowTable'

const CarryTable = ({data}) => {

  return (
    <div className={style.carryList}>
    <h2>Servicios</h2>
    {data?.map((row)=>
    <RowTable key={row.id} data={row}/>)}
    </div>
  )
}

export default CarryTable