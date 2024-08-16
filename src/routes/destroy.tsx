import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";
import { Params } from "./root";

export async function action({ params } : { params: Params } 
) {
  await deleteContact(params.contactId);
  return redirect("/");
}