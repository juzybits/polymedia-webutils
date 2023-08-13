export default function makeCssUrl(url: string): string {
    return 'url('
        + encodeURI(url)
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
        + ')';
}