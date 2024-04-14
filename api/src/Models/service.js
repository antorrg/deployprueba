import { DataTypes } from "sequelize";


export default (sequelize)=>{
    sequelize.define('Service',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        type:{type: DataTypes.STRING, allowNull: true},
        detail: { type: DataTypes.TEXT, allowNull: false },
        date_in: {type: DataTypes.DATEONLY, allowNull: false},
        date_out: { type: DataTypes.DATEONLY, allowNull: true},
        observations:{type:DataTypes.TEXT, allowNull: true},
        picture: { type: DataTypes.STRING, allowNull: true},
        enable: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        canceled: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        fullfilled: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        deletedAt:{
          type: DataTypes.BOOLEAN,
          defaultValue:false
      },
    },
    {timestamps: true},
    )

}