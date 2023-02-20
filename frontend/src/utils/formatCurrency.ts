const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

const format = (number?: number): string => {
    if (number) {
        const result = formatter.format(number)
        return result
    } else {
        return ''
    }
}

export default format
