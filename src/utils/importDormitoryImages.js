export function importAllImages() {
    const images = import.meta.glob('/src/assets/images/dormitory/*.{png,jpeg,jpg,svg}');
    return images;
}
