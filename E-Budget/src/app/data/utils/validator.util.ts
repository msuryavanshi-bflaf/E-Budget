export class ValidationUtil {
    public static emailValidation(email: string) {
        if (email != "" && email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")) {
            return true;
        }
        return false;
    }

    public static passwordValidation(password: string) {
        if (password != "" && password.length >= 8) {
            return true;
        }
        return false;
    }

    public static confirmPasswordValidation(confirmPassword: string) {
        if (confirmPassword != "" && confirmPassword.length >= 8) {
            return true;
        }
        return false;
    }
}
