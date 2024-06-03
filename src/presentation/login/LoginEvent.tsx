export default class LoginEvent {

    static Focused = (class extends LoginEvent{})
    static LoginPressed = (class extends LoginEvent{})
    static EmailChangeText = (class extends LoginEvent{
        text: string;
        constructor(text: string) {
            super();
            this.text = text;
        }
    })
    static PasswordChangeText = (class extends LoginEvent{
        text: string;
        constructor(text: string) {
            super();
            this.text = text;
        }
    })
}
