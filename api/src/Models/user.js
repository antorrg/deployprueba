import { DataTypes } from "sequelize";


export default (sequelize)=>{
    sequelize.define('User',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        email: { type: DataTypes.STRING, allowNull: false },
        password: {type:DataTypes.STRING, allowNull: false},
        nickname:{type: DataTypes.STRING, allowNull: true},
        name: { type: DataTypes.STRING, allowNull: true},
        typeId:{type:DataTypes.STRING, allowNull: true},
        numberId:{type:DataTypes.STRING, allowNull: true},
        picture: { type: DataTypes.STRING, allowNull: false},
        role:{type: DataTypes.SMALLINT, allowNull: false,defaultValue: 1,
          validate: {
            isIn: [[0, 1, 2, 3]], // Por ejemplo, 0: admin, 1: user, 2: moderator
          },
      },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        enable: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        deletedAt:{
          type: DataTypes.BOOLEAN,
          defaultValue:false
      },
      created: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {timestamps: true},
    )

}