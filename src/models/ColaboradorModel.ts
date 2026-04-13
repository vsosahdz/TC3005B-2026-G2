import {Model} from "sequelize";

interface ColaboradorAtributos{
    idColaborador:number,
    nombreColaborador:string,
    rolColaborador:string
    emailColaborador:string
}

export enum ColaboradorRoles{
    ADMIN = 'ADMIN',
    SUPERVISOR = 'SUPERVISOR',
    DESARROLLADOR = 'DESARROLLADOR',
    QA = 'QA'
}

module.exports = (sequelize :any, DataTypes:any)=>{
    class ColaboradorModel extends Model<ColaboradorAtributos>
    implements ColaboradorAtributos{
        idColaborador!: number;
        nombreColaborador!: string;
        rolColaborador!: string;
        emailColaborador!: string;
        static associate(models:any){
            //TODO
            ColaboradorModel.belongsToMany(models.Proyecto,{
                through:'ColaboradorProyecto'
            })
        }
    }
    ColaboradorModel.init({
        idColaborador:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
            unique:true
        },
        nombreColaborador:DataTypes.STRING,
        rolColaborador:{
            type:DataTypes.ENUM,
            values:Object.values(ColaboradorRoles),
            allowNull:false
        },
        emailColaborador:{
            type:DataTypes.STRING,
            allowNull:false
        }
        
    },{
        sequelize,
        modelName:'Colaborador'
    });
    return ColaboradorModel; 
}