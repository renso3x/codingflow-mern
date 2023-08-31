import { port, str } from 'envalid/dist/validators'

import { cleanEnv } from 'envalid'

// Validate process env
export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port()
})