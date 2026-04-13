import {Model} from 'sequelize';

interface ProyectoAtributos{
    idProyecto:number,
    nombreProyecto:string,
    descripcionProyecto:string
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class ProyectoModel extends Model<ProyectoAtributos> 
    implements ProyectoAtributos{
        idProyecto!: number;
        nombreProyecto!: string;
        descripcionProyecto!: string;
        static associate(models:any){
            //TO DO
            ProyectoModel.belongsToMany(models.Colaborador,{
                through:'ColaboradorProyecto'
            })
        }
    }
    ProyectoModel.init({
        idProyecto:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
            unique:true
        },
        nombreProyecto:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        descripcionProyecto:DataTypes.STRING
                
    },{
        sequelize,
        modelName:'Proyecto'
    });
    return ProyectoModel
}

