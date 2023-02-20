const stringToUrl = (value: string): string => {
    if (!value) return ''
    return value.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
}

export default stringToUrl
