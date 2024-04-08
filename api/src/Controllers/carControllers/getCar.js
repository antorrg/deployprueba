import { emptyResCar } from '../../Utils/emptyRes.js';
import {Car, User} from '../../db.js'

const getCar = async () => {
    try {
        const response = await Car.findAll({
            where:{
                deletedAt:false,
            },  include: [
                         {
                           model: User,
                           attributes: ["name" , "id"],
                           through: { attributes: [] },
                          }]
        });
        const data = response;
        if(data.length===0){return emptyResCar()};
        return data;
    } catch (error) {
        throw error;
    }
}
const getByQuery = async(patent)=>{
    try {
        const response = await Car.findOne({
            where:{
                patent:patent,
                deletedAt:false,
            }, include: [
                {
                  model: User,
                  attributes: ["name" , "id"],
                  through: { attributes: [] },
                 }]
        });
        const data = response;
        if(!data){throw new Error('Car not found')};
        return data;
    } catch (error) {
        throw error;
    }

}

const carById = async (id)=>{
    try {
        const response = await Car.findByPk(id,{
            where:{
                deletedAt:false,
            },
            include: [
                {
                  model: User,
                  attributes: ["name" , "id"],
                  through: { attributes: [] },
                 }]
        });
        const data = response;
        if(!data){throw new Error('Car not found!')}
        return data;
    } catch (error) {
        throw error;
    }
}
export {getCar, getByQuery, carById}