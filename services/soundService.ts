export const playSound = (filename: string): Promise<void> => {
    return new Promise<void>((resolve) => {
        const src = `/sounds/${filename}`;
        const audio = new Audio(src);
        audio.addEventListener("ended", () => resolve());
        audio.play();
    });
};
