export default function(cnt) {
    let res = []
    for (let i = 1; i <= cnt; i++) {
        res.push({id: i, text: `text-${i}`})
    }
    return res
}
