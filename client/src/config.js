export const imageUrl = process.env.REACT_APP_IMAGE_URL ||
    process.env.NODE_ENV === 'production'
    ? 'https://shinyday.herokuapp.com'
    : 'http://localhost:5000';
export const baseUrl = process.env.REACT_APP_IMAGE_URLL || `${imageUrl}/api`;
export const bucketUrl = process.env.BUCKET_URL;

export const toLowerNoSpecial = (string) => {
    return string.toLowerCase().replace(/[\s|\W]/gm, "")
}
