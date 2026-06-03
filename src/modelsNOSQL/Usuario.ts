import { modelOptions,prop,getModelForClass } from "@typegoose/typegoose";

enum Roles{
    ADMIN = 'admin',
    QA = 'qa',
    CLIENT = 'client'
}

@modelOptions({
    schemaOptions:{
        collection:'clientes',
        timestamps:false // agregar dos atributos createdAt y updatedAt
    }
})

export class Usuario{
    @prop({required:true,trim:true,default:""})
    public awsCognitoId!:string;
    
    @prop({required:true,trim:true,default:""})
    public nombre!:String;

    @prop({required:true,trim:true,default:""})
    public email!:String;

    @prop({required:true,trim:true,enum:Roles,default:"client"})
    public role!:Roles;
}
export const UsuarioModel = getModelForClass(Usuario);