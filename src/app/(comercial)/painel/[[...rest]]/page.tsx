import { redirect } from "next/navigation";

/** O painel mudou para /admin. */
export default function OldPanel() {
  redirect("/admin/propostas/nova");
}
