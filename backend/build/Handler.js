"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class Handler {
    constructor(app) {
        this.app = app;
        const table = [];
        (0, fs_1.readdirSync)(`${__dirname}/Routes`).filter(fileName => !fileName.startsWith('--')).forEach((category) => {
            if (category.endsWith('.js')) {
                const route = new (require(`${__dirname}/Routes/${category}`).default);
                if (this.setupRoute(route))
                    table.push({
                        route: route.route,
                        methods: route.methods.map(method => method.method).join(', '),
                        filePath: `/${category}`
                    });
            }
            else {
                (0, fs_1.readdirSync)(`${__dirname}/Routes/${category}`).filter(fileName => !fileName.startsWith('--') && fileName.endsWith('.js')).forEach((file) => {
                    const route = new (require(`${__dirname}/Routes/${category}/${file}`).default);
                    if (this.setupRoute(route))
                        table.push({
                            route: route.route,
                            methods: route.methods.map(method => method.method).join(', '),
                            filePath: `/${category}/${file}`
                        });
                });
            }
        });
        console.table(table);
    }
    setupRoute(routes) {
        try {
            routes.methods.forEach(route => {
                this.app[route.method](routes.route, async (req, res, next) => {
                    if (route.mustLogged && !req.session.user)
                        return res.status(401).json({ message: 'Unauthorized.' });
                    const output = await route.run(req, res, next);
                    if (output.success) {
                        res.send(output.success);
                    }
                    else if (output.error) {
                        res.status(output.error.code).send(output.error);
                    }
                    else if (output.render) {
                        res.render(output.render.file, Object.assign(Object.assign({}, output.render.data), { oauthUser: req.session.oauthUser, user: req.session.user }));
                    }
                    else if (output.redirect) {
                        res.redirect(output.redirect);
                    }
                });
            });
            return true;
        }
        catch (e) {
            console.log(`Error while setting up route ${routes.route}.\n${e}`);
            return false;
        }
    }
}
exports.default = Handler;
