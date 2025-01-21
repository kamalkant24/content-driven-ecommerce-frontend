module.exports = {
    // ... other config options ...
    plugins: [
        new webpack.ProvidePlugin({
            global: 'window',
        }),
    ],
};