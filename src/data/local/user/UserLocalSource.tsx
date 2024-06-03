export default interface UserLocalSource {
    setSession(token?: string): Promise<void>;
    getSession(): Promise<string | null>
}