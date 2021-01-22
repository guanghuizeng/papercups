module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
                require("postcss-preset-env"),
                require('postcss-custom-properties')({ // for css vars
                    preserve: false, // completely reduce all css vars
                    importFrom: [
                        'src/fullcalendar-vars.css'
                    ]
                }),
                require('postcss-calc'),
            ],
        },
    },
}
