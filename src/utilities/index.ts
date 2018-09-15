const clear = (): void => {
    process.stdout.write('\x1B[2J\x1B[0f');
};

export { clear };
export { get } from './http';
export { makeJoke } from './makeJoke';
