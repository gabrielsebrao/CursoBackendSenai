function filtrarPares(numeros) {
    numerosPares = []
    for(numero of numeros) {
        if(numero % 2 == 0) {
            numerosPares.push(numero)
        }
    }
    return numerosPares
}

console.log(filtrarPares([1, 2, 3, 4, 5]))