import { 
  CognitoIdentityProviderClient, 
  SignUpCommand, 
  SignUpCommandInput,
  InitiateAuthCommand, 
  InitiateAuthCommandInput,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandInput,
  CognitoIdentityProviderClientConfig
} from "@aws-sdk/client-cognito-identity-provider";
 import { AWS_REGION,COGNITO_APP_CLIENT_ID,COGNITO_APP_SECRET_HASH } from "../config";
 import crypto from 'node:crypto';

 type CognitoAttributes='email';

export default class CognitoService {

    private config!:CognitoIdentityProviderClientConfig;
    private congnitoIdentity!:CognitoIdentityProviderClient;

    private clientId:string = COGNITO_APP_CLIENT_ID;
    private secretHash: string = COGNITO_APP_SECRET_HASH;

    //Atributo de clase
    private static _instance: CognitoService;
    //Metodo de clase y Singleton
    public static get instance():CognitoService{
        return this._instance || (this._instance = new this());
    }
    //Constructor
    private constructor(){
        this.config={
            region:AWS_REGION
        };
        this.congnitoIdentity = new CognitoIdentityProviderClient(this.config);
    }
    //Método para la creación de usuarios utilizando correo electrónico y password
    public async signUpUser(email:string,password:string,userAttributes: {Name:CognitoAttributes,Value:string}[]){
        const params:SignUpCommandInput={
            ClientId:this.clientId,
            Password:password,
            Username:email,
            SecretHash: this.hashSecret(email),
            UserAttributes:userAttributes
        }
        try{
            const command = new SignUpCommand(params);
            return await this.congnitoIdentity.send(command);
        }catch(err){
            console.error(err);
        }
    }

    //Verificación de usuarios
    public async verifyUser(email:string,code:string){
        const params:ConfirmSignUpCommandInput ={
            ClientId: this.clientId,
            ConfirmationCode: code,
            Username: email,
            SecretHash: this.hashSecret(email)
        }
        try{
            const command = new ConfirmSignUpCommand(params);
            return await this.congnitoIdentity.send(command);
            
        }catch(err){
            console.error(err);
        }
        
    }

    //Autenticación
    public async signInUser(email:string,password:string){
        const params:InitiateAuthCommandInput={
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: this.clientId,
            AuthParameters:{
                USERNAME:email,
                PASSWORD:password,
                SECRET_HASH:this.hashSecret(email)
            }            
        }
        try{
            const command = new InitiateAuthCommand(params);
            const response = await this.congnitoIdentity.send(command);;
            return response.AuthenticationResult;
            
        }catch(err){
            console.error(err);
        }
        
    } 
  

    private hashSecret(username:string):string{
        return crypto
            .createHmac('SHA256',this.secretHash)
            .update(username+this.clientId)
            .digest('base64')
    }
  
}