import {Router} from 'express';
import AuthMiddleware from '../middlewares/authorization';
import CognitoService from '../services/cognitoService';


export default abstract class AbstractController {
    //Atributos de instancia
    private _router: Router;
    private _prefix:string;

    protected authMiddleware = AuthMiddleware.instance;
    protected cognitoService = CognitoService.instance;

    //Getters
    public get router(): Router {
        return this._router;
    }
    public get prefix(): string {
        return this._prefix;
    }
    //Constructor
    protected constructor(_prefix:string){
        this._prefix = _prefix;
        this._router = Router();
        this.initRoutes();
    }
    //Métodos de instancia
    protected abstract initRoutes(): void;
}