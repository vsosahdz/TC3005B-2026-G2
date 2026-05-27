import AWS, {SecretsManager} from 'aws-sdk';
import crypto from 'node:crypto';
import { AWS_REGION,
         COGNITO_APP_CLIENT_ID,
         COGNITO_APP_SECRET_HASH,
         COGNITO_USER_POOL_ID } from '../config';

class CognitoService{
    //Conectar la aplicacion con cognito
    private config: AWS.CognitoIdentityServiceProvider.ClientConfiguration;
    private congnitoIdentity: AWS.CognitoIdentityServiceProvider;

    //Datos del cliente de aplicación
    private clientId= COGNITO_APP_CLIENT_ID;
    private secretHash = COGNITO_APP_SECRET_HASH;

    private constructor(){
        this.config={
            region:AWS_REGION
        };
        this.congnitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
    }

}
