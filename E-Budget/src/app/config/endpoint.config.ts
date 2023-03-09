import { environment } from "src/environments/environment";

export class Endpoint { 
    public static readonly BASE_URL = environment.javaEndPoint;

    public static readonly LOGIN = "iw_candidate_login";

    public static readonly SEND_OTP = "/sendOtp";

}

