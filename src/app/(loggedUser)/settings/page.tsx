import Settings from "@/app/_AppComponents/Dashboard/Settings/Settings";
import { loggedUser } from "@/app/_AppComponents/Guard/loggedUser";
import { redirect } from "next/navigation";

export default async function SettingsPage() {

    // const isLoggedUser = await loggedUser();
    // if (!isLoggedUser) {
    //     redirect("/");
    // }

    return (
        <Settings />
    );
}

