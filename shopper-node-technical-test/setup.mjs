import { existsSync, mkdirSync } from "fs"
import { join } from "path";

if (!existsSync("database")) {
    mkdirSync("database");
}
if (!existsSync(join("database", "images"))) {
    mkdirSync(join("database", "images"));
}