import {EncryptJWT, jwtDecrypt} from 'jose'
import UserType from '../Types/User.type'

export default class TokenUtil {

    private JWT_KEY: string = 'xFC6DYSQ6aGCRfeDgEfzNbm3Wb6Uya2Fovcy9IJ8KPmODv4chH'
    private key: Uint8Array = new Uint8Array(Buffer.from(this.JWT_KEY)).slice(0, 32)

    public async generate(data: Omit<UserType, 'password'>): Promise<string> {

        return await new EncryptJWT({data})
            .setProtectedHeader({alg: 'A256GCMKW', enc: 'A256CBC-HS512'})
            .setIssuedAt()
            .setIssuer('schoolTestPlatformBySzymon')
            .setAudience(`${data.userId}`)
            .encrypt(this.key)

    }

    public async decrypt(token: string): Promise<Omit<UserType, 'password'>> {

        return (await jwtDecrypt(token, this.key, {
            issuer: 'schoolTestPlatformBySzymon'
        })).payload.data as UserType

    }

}