function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        toggle("hidescroll")

    document
        .querySelector("#model")
        .classList
        .toggle("addscroll")
}

function checkfields(event) {

    const valuestocheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]

    const isempty = valuestocheck.find(function(value) {

        const checkifisstring = typeof event.target[value].value === "string"
        const checkifisempty = !event.target[value].value.trim()

        if(checkifisstring && checkifisempty ){
            return true
        }
    })

    if(isempty) {
        event.preventDefault()
        alert("por favor preencha todos os campos")
    }
}
