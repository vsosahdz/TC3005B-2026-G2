import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import { UsuarioModel } from "../modelsNOSQL/Usuario";
import { InitiateAuthCommandOutput } from "@aws-sdk/client-cognito-identity-provider";


class UsuarioController extends AbstractController{
    
    //Singleton
    //Atributo de clase
    private static _instance:UsuarioController;
    //Método de clase
    public static get instance():UsuarioController{
        return this._instance || (this._instance = new this('usuario'));
    }

    protected initRoutes(): void {
        this.router.post('/signup', this.signup.bind(this));
        this.router.post('/verify',this.verify.bind(this));
        this.router.post('/signin',this.signin.bind(this));
        this.router.get('/test',this.authMiddleware.verifyToken,this.test.bind(this));       
    }


    private async test(req:Request,res:Response){
        res.status(200).send("Esto es una prueba");
    }

    private async signup(req:Request,res:Response){
        const {email,password,} = req.body;
        console.log(req.body);
        try{
            //Create a new user in Cognito
            const user = await this.cognitoService.signUpUser(email,password,[
                {
                    Name: 'email',
                    Value: email
                }
            ])
            if (user) {    
                console.log(user.UserSub);
                
            }
            //Guard el usuario en DB relacional (MySQL)
            
            console.log("Usuario de cognito creado",user);
            res.status(201).send({message:"User signedUp"})
        }catch(error:any){
            res.status(500).send({code:error.code,message:error.message}).end()
        }
    }

    private async verify(req:Request,res:Response){
        const{email,code} =req.body;
        try{
            await this.cognitoService.verifyUser(email,code);
            console.log("Usuario de cognito verificado",email);
            return res.status(200).send({message:"verified user"}).end();

        }catch(error:any){
            res.status(500).send({code:error.code,message:error.message}).end()
        }
    }

    private async signin(req:Request,res:Response){
        const {email,password} = req.body;
        try{
            const login =  await this.cognitoService.signInUser(email,password);
            console.log(login)
            res.status(200).send({...login});
        }catch(error:any){
            res.status(500).send({code:error.code,message:error.message}).end()
        }
    }

    


}

export default UsuarioController;