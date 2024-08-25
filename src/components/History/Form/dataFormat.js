module.exports = {
    id: "dbcbwekbcbwek",
    form_title: "Testing Form",
    questions: [
        {
            title: "What Is Life",
            type: "short"
        },

        {
            title: "Do You Play Games",
            type: "checkbox",
            options: [
                "yes", "no", "maybe", "never",
            ],
            
            selectOne: false // if true then you can only check one option or if false then you can check many options,
        },


    ]
}