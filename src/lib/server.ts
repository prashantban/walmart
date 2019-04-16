import { app } from "./app";
import logger from "./util/logger";

const server = app.listen(app.get("port"), () => {
    logger.info({"module": "Server", "details" : `App is running at http://localhost:${app.get("port")}} in ${app.get("env")}} mode`});
});

export default server;
