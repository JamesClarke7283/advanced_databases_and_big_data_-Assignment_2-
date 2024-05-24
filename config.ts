export let password = "";

export async function init_password(){
  password = Deno.env.get("MARIADB_ROOT_PASSWORD") || "";
  if (!password || password == "") {
    console.error("MARIADB_ROOT_PASSWORD environment variable is not set.");
    Deno.exit(1);
  }
}
