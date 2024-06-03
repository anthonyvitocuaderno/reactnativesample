import AsyncStorage from "@react-native-async-storage/async-storage";
import UserLocalSource from "./UserLocalSource";

export default class UserLocalSourceImpl implements UserLocalSource {
    private static tokenKey = 'UserLocalSourceImpl.token'
    async setSession(token?: string | undefined): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                if (token === undefined) {
                    await AsyncStorage.removeItem(UserLocalSourceImpl.tokenKey);
                } else {
                    await AsyncStorage.setItem(UserLocalSourceImpl.tokenKey, token);
                }
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    }
    async getSession(): Promise<string | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const token = await AsyncStorage.getItem(UserLocalSourceImpl.tokenKey);
                resolve(token)
            } catch (e) {
                reject(e)
            }
        })
    }
}