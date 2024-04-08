import { DataTypes } from "sequelize";


export default (sequelize)=>{
    sequelize.define('Car',{
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    patent:{type: DataTypes.STRING, allowNull: true},
    mark: { type: DataTypes.STRING, allowNull: false },
    model: {type:DataTypes.STRING, allowNull: false},
    year: {type: DataTypes.STRING, allowNull: true},
    motorNum: { type: DataTypes.STRING, allowNull: true},
    chassisNum:{type:DataTypes.STRING, allowNull: true},
    observations:{type:DataTypes.TEXT, allowNull: true},
    picture: { type: DataTypes.STRING, allowNull: false},
    enable: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    deletedAt:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    },
    {timestamps: true},
    )

}