import { Request,Response } from "express";
import AbstractController from "./AbstractController";

export default class ProyectoController extends AbstractController{
    //Singleton
    //Atributos de clase
    private static _instance:ProyectoController;
    //Métodos de clase
    public static get instance():ProyectoController{
        return this._instance || 
        (this._instance = new this("Proyecto"));
    }
    //Metodo de instancia
    protected initRoutes(): void {
        this.router.get('/listarProyectos',
            this.getListarProyectos.bind(this));
        this.router.post('crearProyecto',
            this.postCrearProyecto.bind(this));    
    }

    private async getListarProyectos(req:Request,res:Response):Promise<void>{
        console.log("Acceso a la ruta /listarProyectos");
        res.status(200).json({mensaje:'Ruta consumida'});
    }
    private async postCrearProyecto(req:Request,res:Response):Promise<void>{
        console.log("Acceso a la ruta /crearProyecto");
        res.status(200).json({mensaje:'Ruta consumida'});
    }

}