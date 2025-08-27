import { PORT } from "./config/env.js";

import app from "./app.js";

app.listen(PORT || 3000);
