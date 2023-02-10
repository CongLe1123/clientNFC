export default function modified(data) {
    let res = [];
    for (const img of data) {
        let image = img.substring(1, img.length-1);
        const number = img.match(/\d+/)[0];
        image = image.replace(number, '') + '/' + number + '.png';
        res.push(image);
    }

    return res;
}