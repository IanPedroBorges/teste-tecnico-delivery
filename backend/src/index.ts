import App from './app';

const PORT = process.env.APP_PORT || 3001;
const appInstance = new App();
appInstance.start(PORT);

export const io = appInstance.io;
