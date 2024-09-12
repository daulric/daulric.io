import AuthFormClient from "./AuthenticationForm"
import { decrypt } from "@/components/tools/encryption"
import axios from "axios";

export default async function AuthServer({ setAuthed }) {
    try {
        const { data } = await axios.get(`${process.env.NEXT_URL}/beta/auth`)
        const secret = decrypt(data, "passcode");
        return <AuthFormClient setAuthed={setAuthed} secret={secret} />;
    } catch (error) {
        console.error('Error in AuthServer:', error);
        return <div>Authentication error. Please try again later.</div>;
    }
}